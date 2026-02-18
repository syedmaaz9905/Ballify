// src/screens/Coach/ReadyToShare.tsx  (NEW FILE)

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
    Dimensions,
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

export default function ReadyToShare() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
                    {/* Top row */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Ready To Share</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    {/* video preview */}
                    <View style={styles.videoBox}>
                        <View style={styles.videoInner}>
                            <Pressable style={styles.playBtn}>
                                <Icon name="play" size={24} color="#666" />
                            </Pressable>
                        </View>

                        <View style={styles.videoBar}>
                            <Text style={styles.timeLeft}>0.37</Text>
                            <View style={styles.progressLine}>
                                <View style={styles.progressDot} />
                            </View>
                            <Text style={styles.timeRight}>2.23</Text>
                        </View>
                    </View>

                    {/* push share row to bottom (but above Done) */}
                    <View style={{ flex: 1 }} />

                    {/* Share options */}
                    <View style={styles.shareRow}>
                        <ShareIcon img={Images.facebookIcon} sub="Facebook" />
                        <ShareIcon img={Images.instagramIcon} sub="Instagram" />
                        <ShareIcon img={Images.whatsappIcon} sub="Whatsapp" />
                        <ShareIcon img={Images.imoIcon} sub="Imo" />
                        <MoreIcon sub="More" />
                    </View>

                    {/* done */}
                    <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.doneText}>Done</Text>
                    </Pressable>
                </View>

                <BottomTabs active={null} />
            </ImageBackground>
        </View>
    );
}

function ShareIcon({ img, sub }: { img: any; sub: string }) {
    return (
        <View style={styles.shareItem}>
            <View style={styles.shareCircle}>
                <Image source={img} style={styles.shareImg} resizeMode="contain" />
            </View>
            <Text style={styles.shareSub}>{sub}</Text>
        </View>
    );
}

function MoreIcon({ sub }: { sub: string }) {
    return (
        <View style={styles.shareItem}>
            <View style={styles.moreCircle}>
                <Icon name="more-horizontal" size={22} color="#fff" />
            </View>
            <Text style={styles.shareSub}>{sub}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },
    screenOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    /* HEADER */
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

    /* SHEET */
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

    /* VIDEO PREVIEW */
    videoBox: {
        borderRadius: 8,
        backgroundColor: "#fff",
        overflow: "hidden",
        marginHorizontal: 4,
    },
    videoInner: {
        height: 150,
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

    /* SHARE ROW */
    shareRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    shareItem: { alignItems: "center", width: (width - 14 * 2 - 14 * 2 - 12) / 5 },

    shareCircle: {
        width: 40,
        height: 40,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    shareImg: { width: 40, height: 40 },
    moreCircle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#00D0FF",
        alignItems: "center",
        justifyContent: "center",
    },

    shareSub: {
        marginTop: 6,
        color: "#EAFCFF",
        fontSize: 9,
        fontFamily: "Montserrat-Regular",
    },

    /* DONE */
    doneBtn: {
        height: 56,
        borderRadius: 16,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    doneText: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
});
