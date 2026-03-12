import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ImageBackground,
    Dimensions,
    Platform,
    Alert,
    Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import Video from "react-native-video";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const { width, height } = Dimensions.get("window");

type NavProp = NativeStackNavigationProp<RootStackParamList, "Record">;

export default function Record() {
    const navigation = useNavigation<NavProp>();
    const [mode, setMode] = useState<"Portrait" | "Video" | "Night">("Video");
    const [videoUri, setVideoUri] = useState<string>("");
    const [videoType, setVideoType] = useState<string>("");
    const [videoFileName, setVideoFileName] = useState<string>("");
    const [pickerOpen, setPickerOpen] = useState(false);

    const handleOpenCamera = async () => {
        setPickerOpen(false);

        const result = await launchCamera({
            mediaType: "video",
            videoQuality: "high",
            durationLimit: 60,
            saveToPhotos: false,
        });

        if (result.didCancel) return;

        if (result.errorCode) {
            Alert.alert("Error", result.errorMessage || "Could not open camera");
            return;
        }

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        setVideoUri(asset.uri);
        setVideoType(asset.type || "");
        setVideoFileName(asset.fileName || "recorded-video.mp4");
    };

    const handleOpenGallery = async () => {
        setPickerOpen(false);

        const result = await launchImageLibrary({
            mediaType: "video",
            selectionLimit: 1,
        });

        if (result.didCancel) return;

        if (result.errorCode) {
            Alert.alert("Error", result.errorMessage || "Could not open gallery");
            return;
        }

        const asset = result.assets?.[0];
        if (!asset?.uri) return;

        setVideoUri(asset.uri);
        setVideoType(asset.type || "");
        setVideoFileName(asset.fileName || "selected-video.mp4");
    };

    const handleNext = () => {
        if (!videoUri) {
            Alert.alert("Select Video", "Please record or choose a video first");
            return;
        }

        navigation.navigate("RecordUploadPreview", {
            videoUri,
            fileName: videoFileName,
            type: videoType,
        });
    };

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={styles.sheet}>
                    <View style={styles.topStrip}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.topBtn}>
                            <Icon name="x" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Record</Text>

                        <Pressable onPress={handleNext} style={styles.topBtnRight}>
                            <Icon name="arrow-right" size={20} color="#fff" />
                        </Pressable>
                    </View>

                    <View style={styles.cameraBox}>
                        {videoUri ? (
                            <Video
                                source={{ uri: videoUri }}
                                style={styles.preview}
                                resizeMode="cover"
                                paused={false}
                                repeat={true}
                                muted={false}
                                controls={false}
                            />
                        ) : (
                            <>
                                <Image source={Images.ShareBgImg} style={styles.preview} resizeMode="cover" />
                                <View style={styles.previewDark} />
                            </>
                        )}
                    </View>

                    <View style={styles.bottomWrap}>
                        <View style={styles.modeRow}>
                            <Pressable onPress={() => setMode("Portrait")} style={styles.modeBtn}>
                                <Text style={[styles.modeText, mode === "Portrait" && styles.modeTextActive]}>
                                    Portrait
                                </Text>
                            </Pressable>

                            <Pressable onPress={() => setMode("Video")} style={styles.modeBtn}>
                                <Text style={[styles.modeText, mode === "Video" && styles.modeTextActive]}>
                                    Video
                                </Text>
                            </Pressable>

                            <Pressable onPress={() => setMode("Night")} style={styles.modeBtn}>
                                <Text style={[styles.modeText, mode === "Night" && styles.modeTextActive]}>
                                    Night
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.controlsRow}>
                            <Pressable style={styles.leftIconBtn} onPress={handleOpenGallery}>
                                {videoUri ? (
                                    <Video
                                        source={{ uri: videoUri }}
                                        style={styles.thumb}
                                        resizeMode="cover"
                                        paused={true}
                                    />
                                ) : (
                                    <Image source={Images.RecordBgImg} style={styles.thumb} resizeMode="cover" />
                                )}
                            </Pressable>

                            <Pressable style={styles.captureOuter} onPress={() => setPickerOpen(true)}>
                                <View style={styles.captureInner} />
                            </Pressable>

                            <Pressable
                                style={styles.rightIconBtn}
                                onPress={() => {
                                    setVideoUri("");
                                    setVideoType("");
                                    setVideoFileName("");
                                }}
                            >
                                <Icon name="refresh-cw" size={18} color="#ff1e1e" />
                            </Pressable>
                        </View>

                        <View style={{ height: Platform.OS === "ios" ? 16 : 12 }} />
                    </View>
                </View>

                <Modal
                    visible={pickerOpen}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setPickerOpen(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Choose Video</Text>

                            <Pressable style={styles.modalBtn} onPress={handleOpenCamera}>
                                <Text style={styles.modalBtnText}>Record with Camera</Text>
                            </Pressable>

                            <Pressable style={styles.modalBtn} onPress={handleOpenGallery}>
                                <Text style={styles.modalBtnText}>Choose from Gallery</Text>
                            </Pressable>

                            <Pressable style={[styles.modalBtn, styles.cancelModalBtn]} onPress={() => setPickerOpen(false)}>
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },
    screenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.55)",
    },
    sheet: {
        flex: 1,
        marginHorizontal: 28,
        marginTop: 50,
        marginBottom: 28,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        overflow: "hidden",
        backgroundColor: "#000",
    },
    topStrip: {
        height: 64,
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#000",
    },
    topBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    topBtnRight: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,30,30,0.18)",
        borderWidth: 1,
        borderColor: "#ff1e1e",
    },
    topTitle: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    cameraBox: {
        flex: 1,
        marginHorizontal: 14,
        marginTop: 10,
        marginBottom: 8,
        overflow: "hidden",
        backgroundColor: "#111",
    },
    preview: {
        width: "100%",
        height: "100%",
    },
    previewDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.12)",
    },
    bottomWrap: {
        paddingHorizontal: 18,
        paddingBottom: 10,
        paddingTop: 6,
    },
    modeRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    modeBtn: { paddingVertical: 8, paddingHorizontal: 10 },
    modeText: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Regular" },
    modeTextActive: { color: "#ff1e1e", fontFamily: "Montserrat-Bold" },
    controlsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    thumb: { width: "100%", height: "100%" },
    captureOuter: {
        width: 54,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
    },
    captureInner: {
        width: 54,
        height: 54,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.85)",
        backgroundColor: "#ff1e1e",
    },
    rightIconBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    modalCard: {
        width: "100%",
        borderRadius: 20,
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "#ff1e1e",
        padding: 18,
    },
    modalTitle: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        marginBottom: 16,
    },
    modalBtn: {
        height: 48,
        borderRadius: 12,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    cancelModalBtn: {
        backgroundColor: "#2a2a2a",
    },
    modalBtnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Montserrat-Bold",
    },
});