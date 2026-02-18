// src/screens/PlayerParent/ClipsEditor.tsx  (NEW FILE)

import React, { useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image,
    Platform,
    Dimensions,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const { height, width } = Dimensions.get("window");

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function ClipsEditor() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const thumbW = useMemo(() => Math.min(88, Math.max(70, width * 0.18)), []);
    const thumbH = useMemo(() => Math.round(thumbW * 0.78), [thumbW]);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={Images.profileIcon} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.sheetHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.sheetTitle}>Clips</Text>

                        <Pressable>
                            <Icon name="upload" size={22} color="#fff" />
                        </Pressable>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.cardContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* VIDEO PREVIEW */}
                        <View style={styles.previewWrap}>
                            <Image source={Images.ShareBgImg} style={styles.previewImg} resizeMode="cover" />

                            {/* faint logo overlay */}
                            <View style={styles.logoOverlay}>
                                <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
                            </View>
                        </View>

                        {/* PLAYER CONTROLS ROW */}
                        <View style={styles.playerRow}>
                            <View style={styles.leftCtrl}>
                                <Pressable style={styles.ctrlBtn}>
                                    <Icon name="corner-down-left" size={16} color="#cfcfcf" />
                                </Pressable>
                                <Pressable style={styles.ctrlBtn}>
                                    <Icon name="corner-down-right" size={16} color="#cfcfcf" />
                                </Pressable>
                            </View>

                            <View style={styles.centerCtrl}>
                                <Text style={styles.timeText}>00:55 / 02:20</Text>
                                <Pressable style={styles.playSmall}>
                                    <Icon name="play" size={16} color="#fff" />
                                </Pressable>
                            </View>

                            <View style={styles.rightCtrl}>
                                <Pressable style={styles.ctrlBtn}>
                                    <Icon name="maximize" size={16} color="#cfcfcf" />
                                </Pressable>
                            </View>
                        </View>

                        {/* TIMELINE */}
                        <View style={styles.timelineWrap}>
                            <Pressable style={styles.plusBtn}>
                                <Icon name="plus" size={18} color="#fff" />
                            </Pressable>

                            <View style={styles.timelineRight}>
                                <View style={styles.thumbsRow}>
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <View
                                            key={i}
                                            style={[
                                                styles.thumb,
                                                { width: thumbW, height: thumbH },
                                                i === 0 && styles.thumbFirst,
                                            ]}
                                        >
                                            {i === 0 ? (
                                                <Text style={styles.thumbText}>COVER</Text>
                                            ) : null}
                                        </View>
                                    ))}
                                </View>

                                <Pressable style={styles.addMusic}>
                                    <Text style={styles.addMusicText}>+ Add music</Text>
                                </Pressable>

                                <View style={styles.timelineTicks}>
                                    <Text style={styles.tickText}>00:00</Text>
                                    <Text style={styles.tickText}>00:02</Text>
                                    <Text style={styles.tickText}>00:04</Text>
                                    <Text style={styles.tickText}>00:06</Text>
                                </View>
                            </View>
                        </View>

                        {/* TOOLBAR */}
                        <View style={styles.toolsRow}>
                            <Tool icon="square" label="Canvas" />
                            <Tool icon="sliders" label="BG" />
                            <Tool icon="scissors" label="Clip" />
                            <Tool icon="columns" label="Split" />
                            <Tool icon="crop" label="Crop" />
                            <Tool icon="refresh-cw" label="Speed" />
                        </View>

                        {/* ACTION BUTTONS */}
                        <View style={styles.actionsRow}>
                            <Pressable style={styles.actionBtn} onPress={() => navigation.navigate("UploadShare")}>
                                <Text style={styles.actionText}>Share</Text>
                            </Pressable>
                            <Pressable style={styles.actionBtn} onPress={() => navigation.navigate("Share")}>
                                <Text style={styles.actionText}>Save</Text>
                            </Pressable>
                        </View>

                        <View style={{ height: 10 }} />
                    </ScrollView>
                </View>

                <BottomTabs active="home" />
            </ImageBackground>
        </View>
    );
}

function Tool({ icon, label }: { icon: string; label: string }) {
    return (
        <Pressable style={styles.toolItem}>
            <View style={styles.toolIcon}>
                <Icon name={icon as any} size={18} color="#cfcfcf" />
            </View>
            <Text style={styles.toolText}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },

    screenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.55)",
    },

    /* HEADER */
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },

    /* CARD */
    sheet: {
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        padding: 14,
        backgroundColor: "#000",
        overflow: "hidden",
    },

    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    sheetTitle: { color: "#fff", fontSize: 26, fontFamily: "Montserrat-Bold" },

    cardContent: { paddingBottom: 2 },

    /* preview */
    previewWrap: {
        height: 290,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: "#111",
    },
    previewImg: { width: "100%", height: "100%" },

    logoOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.10)",
    },
    logo: {
        width: "70%",
        height: "70%",
        opacity: 0.30,
    },
    logoText: {
        color: "rgba(255,0,0,0.25)",
        fontSize: 64,
        fontFamily: "Montserrat-Bold",
        letterSpacing: 2,
    },

    /* player row */
    playerRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftCtrl: { flexDirection: "row", gap: 10 },
    rightCtrl: { flexDirection: "row", gap: 10 },

    ctrlBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },

    centerCtrl: { alignItems: "center", gap: 8 },
    timeText: { color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "Montserrat-Regular" },
    playSmall: {
        width: 42,
        height: 28,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
        alignItems: "center",
        justifyContent: "center",
    },

    /* timeline */
    timelineWrap: {
        marginTop: 12,
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
    },

    plusBtn: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#2A4BFF",
        alignItems: "center",
        justifyContent: "center",
    },

    timelineRight: { flex: 1 },

    thumbsRow: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
    },

    thumb: {
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    thumbFirst: { backgroundColor: "rgba(255,255,255,0.15)" },
    thumbText: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Bold" },

    addMusic: {
        marginTop: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
        backgroundColor: "rgba(255,255,255,0.06)",
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    addMusicText: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "Montserrat-Regular" },

    timelineTicks: {
        marginTop: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 6,
    },
    tickText: { color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "Montserrat-Regular" },

    /* tools */
    toolsRow: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 4,
    },
    toolItem: { alignItems: "center", width: Math.min(70, width / 6.2) },
    toolIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)",
    },
    toolText: { marginTop: 6, color: "rgba(255,255,255,0.70)", fontSize: 10, fontFamily: "Montserrat-Regular" },

    /* actions */
    actionsRow: { marginTop: 16, flexDirection: "row", gap: 14 },
    actionBtn: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FF0000",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    actionText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
});
