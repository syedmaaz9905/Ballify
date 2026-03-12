import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Dimensions,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import AppHeader from "../../components/AppHeader";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import { useUpload } from "../../hooks/useUpload";
import * as RNFS from "@dr.pogodin/react-native-fs";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;
const { width } = Dimensions.get("window");

const PART_SIZE = 5 * 1024 * 1024;

type NavProp = NativeStackNavigationProp<RootStackParamList, "RecordUploading">;
type ScreenRouteProp = RouteProp<RootStackParamList, "RecordUploading">;

export default function RecordUploading() {
    const navigation = useNavigation<NavProp>();
    const route = useRoute<ScreenRouteProp>();
    const { videoUri, fileName, type } = route.params;

    const {
        handleInitiateMultipartUpload,
        handleGetMultipartPresignedUrl,
        handleCompleteMultipartUpload,
        handleAbortMultipartUpload,
    } = useUpload();

    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [isUploading, setIsUploading] = useState(true);

    const uploadIdRef = useRef<string | null>(null);
    const keyRef = useRef<string | null>(null);
    const isCancelledRef = useRef(false);

    const progressText = useMemo(() => `${progress}%`, [progress]);

    useEffect(() => {
        const uploadVideo = async () => {
            try {
                setIsUploading(true);
                setProgress(2);

                const resolvedFileName =
                    fileName || `video-${Date.now()}.mp4`;
                const resolvedType = type || "video/mp4";

                const initiateRes = await handleInitiateMultipartUpload({
                    fileName: resolvedFileName,
                    contentType: resolvedType,
                    folderPath: "videos",
                });

                const uploadId = initiateRes?.uploadId;
                const key = initiateRes?.key;

                if (!uploadId || !key) {
                    throw new Error("Failed to initiate upload");
                }

                uploadIdRef.current = uploadId;
                keyRef.current = key;
                setProgress(8);

                const normalizedPath = videoUri.startsWith("file://")
                    ? videoUri.replace("file://", "")
                    : videoUri;

                const fileStat = await RNFS.stat(normalizedPath);
                const totalSize = Number(fileStat.size);

                if (!totalSize) {
                    throw new Error("Invalid video file size");
                }

                const totalParts = Math.ceil(totalSize / PART_SIZE);
                const completedParts: { partNumber: number; etag: string }[] = [];
                let uploadedBytes = 0;

                for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
                    if (isCancelledRef.current) {
                        throw new Error("UPLOAD_CANCELLED");
                    }

                    const start = (partNumber - 1) * PART_SIZE;
                    const chunkSize = Math.min(PART_SIZE, totalSize - start);

                    const presignedRes = await handleGetMultipartPresignedUrl({
                        key,
                        uploadId,
                        partNumber,
                    });

                    const presignedUrl = presignedRes?.url;

                    if (!presignedUrl) {
                        throw new Error(`Missing presigned URL for part ${partNumber}`);
                    }

                    const base64Chunk = await RNFS.read(normalizedPath, chunkSize, start, "base64");

                    const uploadRes = await fetch(presignedUrl, {
                        method: "PUT",
                        headers: {
                            "Content-Type": resolvedType,
                            "Content-Transfer-Encoding": "base64",
                        },
                        body: base64Chunk,
                    });

                    if (!uploadRes.ok) {
                        throw new Error(`Failed to upload part ${partNumber}`);
                    }

                    const etag =
                        uploadRes.headers.get("ETag") ||
                        uploadRes.headers.get("etag") ||
                        "";

                    if (!etag) {
                        throw new Error(`Missing ETag for part ${partNumber}`);
                    }

                    completedParts.push({
                        partNumber,
                        etag: etag.replace(/"/g, ""),
                    });

                    uploadedBytes += chunkSize;
                    const percent = Math.min(95, Math.round((uploadedBytes / totalSize) * 100));
                    setProgress(percent);
                }

                if (isCancelledRef.current) {
                    throw new Error("UPLOAD_CANCELLED");
                }

                await handleCompleteMultipartUpload({
                    key,
                    uploadId,
                    parts: completedParts,
                });

                setProgress(100);
                setIsFinished(true);
            } catch (error: any) {
                if (
                    uploadIdRef.current &&
                    keyRef.current
                ) {
                    try {
                        await handleAbortMultipartUpload({
                            key: keyRef.current,
                            uploadId: uploadIdRef.current,
                        });
                    } catch { }
                }

                if (error?.message !== "UPLOAD_CANCELLED") {
                    console.log("UPLOAD ERROR:", error);
                    Alert.alert(
                        "Error",
                        error?.response?.data?.message ||
                        error?.message ||
                        "Upload failed"
                    );
                    navigation.goBack();
                } else {
                    navigation.goBack();
                }
            } finally {
                setIsUploading(false);
            }
        };

        uploadVideo();
    }, [
        videoUri,
        fileName,
        type,
        handleInitiateMultipartUpload,
        handleGetMultipartPresignedUrl,
        handleCompleteMultipartUpload,
        handleAbortMultipartUpload,
        navigation,
    ]);

    const handleCancel = async () => {
        isCancelledRef.current = true;

        if (uploadIdRef.current && keyRef.current) {
            try {
                await handleAbortMultipartUpload({
                    key: keyRef.current,
                    uploadId: uploadIdRef.current,
                });
            } catch { }
        }

        navigation.goBack();
    };

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <AppHeader />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={handleCancel} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Uploading</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.center}>
                        <Text style={styles.processing}>Processing... {progressText}</Text>

                        <Text style={styles.note}>
                            Our AI is preparing and uploading your video.
                        </Text>

                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                        </View>

                        <Text style={styles.smallLabel}>
                            {isFinished ? "Upload Complete" : "Uploading Video"}
                        </Text>

                        <Pressable style={styles.cancelBtn} onPress={handleCancel}>
                            <Icon name="x" size={22} color="#000" />
                        </Pressable>

                        <Pressable
                            style={[styles.nextBtn, { opacity: progress === 100 ? 1 : 0.5 }]}
                            disabled={progress !== 100 || isUploading}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.nextText}>NEXT</Text>
                        </Pressable>
                    </View>
                </View>

                <BottomTabs active={null} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },
    screenOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    sheet: {
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.55)",
        padding: 12,
        overflow: "hidden",
    },
    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 6,
        paddingTop: 2,
        paddingBottom: 10,
    },
    backBtn: { width: 34, height: 28, alignItems: "center", justifyContent: "center" },
    topTitle: { color: "#fff", fontSize: 18, fontFamily: "Montserrat-Bold" },

    center: { flex: 1, alignItems: "center", paddingTop: 24 },
    processing: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        marginBottom: 10,
    },
    note: {
        color: "#FF0000",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        textAlign: "center",
        marginBottom: 18,
    },

    progressTrack: {
        width: "90%",
        height: 8,
        borderRadius: 99,
        backgroundColor: "#890000",
        overflow: "hidden",
        marginBottom: 10,
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#FF0000",
        borderRadius: 99,
    },

    smallLabel: {
        color: "#FF0000",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        marginBottom: 18,
    },

    cancelBtn: {
        width: 48,
        height: 48,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },

    nextBtn: {
        marginTop: "auto",
        marginBottom: 10,
        width: Math.min(210, width * 0.62),
        height: 40,
        borderRadius: 8,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    nextText: {
        color: "#000",
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
    },
});