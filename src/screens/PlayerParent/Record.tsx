// src/screens/PlayerParent/Record.tsx  (REPLACE FULL FILE)

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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function Record() {
    const navigation = useNavigation<any>();
    const [mode, setMode] = useState<"Portrait" | "Video" | "Night">("Video");

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* FULL PAGE SHEET */}
                <View style={styles.sheet}>
                    {/* TOP BLACK AREA (header strip like design) */}
                    <View style={styles.topStrip}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.topBtn}>
                            <Icon name="x" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Record</Text>

                        <View style={styles.topBtn} />
                    </View>

                    {/* CAMERA BOX AREA */}
                    <View style={styles.cameraBox}>
                        <Image source={Images.ShareBgImg} style={styles.preview} resizeMode="cover" />
                        <View style={styles.previewDark} />
                    </View>

                    {/* BOTTOM CONTROLS */}
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
                            <Pressable style={styles.leftIconBtn}>
                                <Image source={Images.RecordBgImg} style={styles.thumb} resizeMode="cover" />
                            </Pressable>

                            <Pressable style={styles.captureOuter}>
                                <View style={styles.captureInner} />
                            </Pressable>

                            <Pressable style={styles.rightIconBtn}>
                                <Icon name="refresh-cw" size={18} color="#fff" />
                            </Pressable>
                        </View>

                        <View style={{ height: Platform.OS === "ios" ? 16 : 12 }} />
                    </View>
                </View>
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

    // FULL PAGE SHEET
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

    // TOP BLACK STRIP
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
    topTitle: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },

    // CAMERA BOX (separate area like design)
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

    // BOTTOM CONTROLS
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
        backgroundColor: "rgba(0,0,0,0.12)",
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
});
