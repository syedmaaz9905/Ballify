import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
    Dimensions,
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

const { width, height } = Dimensions.get("window");

export default function UploadGameOptions() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [duration, setDuration] = useState<"15" | "40">("15");
    const [quality, setQuality] = useState<"1080" | "720">("1080");
    const [title, setTitle] = useState("");

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

                    <Pressable style={styles.headerIconBtn}>
                        <Icon name="sliders" size={18} color="#fff" />
                    </Pressable>
                </View>

                {/* SHEET */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP, height: height * 0.73 }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Name</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    {/* video preview */}
                    <View style={styles.videoBox}>
                        <View style={styles.videoInner}>
                            <Pressable style={styles.playBtn}>
                                <Icon name="play" size={22} color="#555" />
                            </Pressable>
                        </View>

                        <View style={styles.videoBar}>
                            <Text style={styles.timeLeft}>0:17</Text>
                            <View style={styles.progressLine}>
                                <View style={styles.progressDot} />
                            </View>
                            <Text style={styles.timeRight}>2:23</Text>
                        </View>
                    </View>

                    {/* options */}
                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Select Duration</Text>
                        <View style={styles.optionBox}>
                            <Pill label="15 Sec" active={duration === "15"} onPress={() => setDuration("15")} compact />
                            <Pill label="40 Sec" active={duration === "40"} onPress={() => setDuration("40")} compact />
                        </View>
                    </View>

                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Select Video Size</Text>
                        <View style={styles.optionBox}>
                            <Pill label="1080px" active={quality === "1080"} onPress={() => setQuality("1080")} compact />
                            <Pill label="720px" active={quality === "720"} onPress={() => setQuality("720")} compact />
                        </View>
                    </View>

                    <View style={styles.optionRow}>
                        <Text style={styles.optionLabel}>Add Titles</Text>
                        <View style={styles.optionInputBox}>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                placeholder=""
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                style={styles.optionInput}
                            />
                        </View>
                    </View>

                    <Pressable
                        style={styles.autoBtn}
                        onPress={() => navigation.navigate("AutoHighlights")}
                    >
                        <Text style={styles.autoText}>Auto Generate Highlights</Text>
                    </Pressable>
                </View>

                <BottomTabs active={null} />
            </ImageBackground>
        </View>
    );
}

function Pill({
    label,
    active,
    onPress,
    compact,
}: {
    label: string;
    active?: boolean;
    onPress?: () => void;
    compact?: boolean;
}) {
    return (
        <Pressable onPress={onPress} style={[styles.pill, compact && styles.pillCompact]}>
            <View style={styles.dot}>
                {active ? <View style={styles.dotInner} /> : null}
            </View>

            <Text style={[styles.pillText, compact && styles.pillTextCompact]}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },
    screenOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    /* header */
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },
    headerIconBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },

    /* sheet */
    sheet: {
        marginHorizontal: 14,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.55)",
        padding: 12,
        overflow: "hidden",
        paddingHorizontal: 20,
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

    videoBox: {
        borderRadius: 8,
        backgroundColor: "#fff",
        overflow: "hidden",
        marginHorizontal: 4,
        marginBottom: 12,
    },
    videoInner: {
        height: 140,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    playBtn: {
        width: 56,
        height: 56,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.06)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.08)",
    },
    videoBar: {
        height: 34,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#fff",
    },
    timeLeft: { color: "#222", fontSize: 10, fontFamily: "Montserrat-Regular" },
    timeRight: { color: "#222", fontSize: 10, fontFamily: "Montserrat-Regular" },
    progressLine: {
        flex: 1,
        height: 3,
        borderRadius: 99,
        backgroundColor: "rgba(0,0,0,0.25)",
        justifyContent: "center",
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: 99,
        backgroundColor: "rgba(0,0,0,0.55)",
        marginLeft: "12%",
    },

    optionRow: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    optionLabel: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        width: 112, // keeps left label aligned like screenshot
    },
    optionBox: {
        flex: 1,
        height: 34,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.18)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        paddingHorizontal: 8,
    },
    optionInputBox: {
        flex: 1,
        height: 34,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.18)",
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    optionInput: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
    },

    pillCompact: {
        height: 24,
        paddingHorizontal: 8,
        borderWidth: 0,
        backgroundColor: "transparent",
        gap: 6,
    },
    pillTextCompact: { fontSize: 10 },
    label: { color: "rgba(255,255,255,0.70)", fontSize: 10, fontFamily: "Montserrat-Regular", marginBottom: 8 },

    pill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        height: 34,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    dotInner: {
        width: 6,
        height: 6,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
    },

    dotOn: { backgroundColor: "#ff1e1e" },

    pillText: { color: "#fff", fontSize: 11, fontFamily: "Montserrat-Regular" },

    inputWrap: {
        height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.25)",
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    input: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Regular", paddingVertical: 0 },

    autoBtn: {
        marginTop: "auto",
        height: 44,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF0000",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
    },
    autoText: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Bold" },
});
