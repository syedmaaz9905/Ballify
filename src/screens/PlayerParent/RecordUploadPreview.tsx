import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import Video from "react-native-video";
import AppHeader from "../../components/AppHeader";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;
const { width } = Dimensions.get("window");

type NavProp = NativeStackNavigationProp<RootStackParamList, "RecordUploadPreview">;
type ScreenRouteProp = RouteProp<RootStackParamList, "RecordUploadPreview">;

export default function RecordUploadPreview() {
    const navigation = useNavigation<NavProp>();
    const route = useRoute<ScreenRouteProp>();
    const { videoUri } = route.params;

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <AppHeader />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Preview</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.center}>
                        <View style={styles.videoWrap}>
                            <Video
                                source={{ uri: videoUri }}
                                style={styles.video}
                                resizeMode="cover"
                                controls
                                paused={false}
                            />
                        </View>

                        <Text style={styles.note}>
                            Review your video, then continue to upload.
                        </Text>

                        <View style={styles.btnRow}>
                            <Pressable
                                style={[styles.actionBtn, styles.retakeBtn]}
                                onPress={() => navigation.goBack()}
                            >
                                <Text style={styles.actionText}>RETAKE</Text>
                            </Pressable>

                            <Pressable
                                style={styles.actionBtn}
                                onPress={() =>
                                    navigation.navigate("RecordUploading", {
                                        videoUri: route.params.videoUri,
                                        fileName: route.params.fileName,
                                        type: route.params.type,
                                    })
                                }
                            >
                                <Text style={[styles.actionText, { color: "#000" }]}>UPLOAD</Text>
                            </Pressable>
                        </View>
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

    center: { flex: 1, alignItems: "center", paddingTop: 12 },
    videoWrap: {
        width: "100%",
        height: "68%",
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    note: {
        color: "#FF0000",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        textAlign: "center",
        marginTop: 14,
    },
    btnRow: {
        marginTop: "auto",
        marginBottom: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    actionBtn: {
        flex: 1,
        height: 44,
        borderRadius: 10,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    retakeBtn: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ff1e1e",
    },
    actionText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat-Bold",
    },
});