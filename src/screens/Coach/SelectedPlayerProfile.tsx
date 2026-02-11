// src/screens/Coach/SelectedPlayerProfile.tsx
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
    FlatList,
    ScrollView,
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

const TABS = ["Scores", "Status", "Highlights", "Schedule"] as const;
type TabKey = (typeof TABS)[number];

const SCORES_LIST = Array.from({ length: 3 }).map((_, i) => ({
    id: String(i + 1),
    leftTop: i === 0 ? "83 Addicts ATL (Fall)" : i === 1 ? "67 Six Seven (Fall)" : "61 Core 4 (Fall)",
    leftBottom: i === 0 ? "52 Free Agents Elite (Fall)" : i === 1 ? "76 Addicts ATL (Fall)" : "84 Addicts ATL (Fall)",
    rightTop: i === 0 ? "Nov 21, 2025" : i === 1 ? "Nov 14, 2025" : "Nov 21, 2025",
    rightBottom: i === 0 ? "7:00 AM" : i === 1 ? "6:00 AM" : "7:00 AM",
}));

const HIGHLIGHTS = Array.from({ length: 3 }).map((_, i) => ({
    id: `h-${i + 1}`,
    title: "Vs Free Agents Elite(Fall)",
    date: "11/21/2025",
}));

const CLIPS = Array.from({ length: 3 }).map((_, i) => ({
    id: `c-${i + 1}`,
    title: "Vs Free Agents Elite(Fall)",
    date: "11/21/2025",
}));

export default function SelectedPlayerProfile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [activeTab, setActiveTab] = useState<TabKey>("Scores");

    const scores = useMemo(() => SCORES_LIST, []);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatar}>
                            <Icon name="user" size={18} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>

                    <Icon name="sliders" size={26} color="#fff" style={{ transform: [{ rotate: "90deg" }] }} />
                </View>

                {/* SHEET */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={18} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Player Profile</Text>

                        <View style={{ width: 18 }} />
                    </View>

                    {/* PLAYER CARD */}
                    <View style={styles.playerCard}>
                        <View style={styles.playerImgWrap}>
                            <Image source={Images.logo} style={styles.playerImg} />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={styles.playerName}>Jayson{`\n`}Tatum</Text>
                            <Text style={styles.playerMeta}>Addicts ATL • 27</Text>

                            <Pressable style={styles.followBtn}>
                                <Text style={styles.followText}>follow</Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* TABS */}
                    <View style={styles.tabsRow}>
                        {TABS.map((t) => {
                            const on = t === activeTab;
                            return (
                                <Pressable key={t} onPress={() => setActiveTab(t)} style={styles.tabBtn}>
                                    <Text style={[styles.tabText, on && styles.tabTextActive]}>{t}</Text>
                                    {on && <View style={styles.tabUnderline} />}
                                </Pressable>
                            );
                        })}
                    </View>

                    {/* CONTENT */}
                    {activeTab === "Scores" ? (
                        <FlatList
                            data={scores}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}
                            renderItem={({ item }) => (
                                <View style={styles.matchRow}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.matchLeftTop}>{item.leftTop}</Text>
                                        <Text style={styles.matchLeftBottom}>{item.leftBottom}</Text>
                                    </View>

                                    <View style={styles.matchRight}>
                                        <Text style={styles.matchRightTop}>{item.rightTop}</Text>
                                        <Text style={styles.matchRightBottom}>{item.rightBottom}</Text>
                                    </View>
                                </View>
                            )}
                        />
                    ) : activeTab === "Status" ? (
                        <View style={styles.statusCard}>
                            <Text style={styles.statusTitle}>Season Avg</Text>

                            <View style={styles.statCols}>
                                <View style={styles.statCol}>
                                    <Text style={styles.statHead}>GP</Text>
                                    <Text style={styles.statVal}>3</Text>
                                </View>
                                <View style={styles.statCol}>
                                    <Text style={styles.statHead}>PST</Text>
                                    <Text style={styles.statVal}>14</Text>
                                </View>
                                <View style={styles.statCol}>
                                    <Text style={styles.statHead}>REB</Text>
                                    <Text style={styles.statVal}>3</Text>
                                </View>
                            </View>
                        </View>
                    ) : activeTab === "Highlights" ? (
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 12 }}>
                            <Text style={styles.sectionH}>Highlight Reels</Text>
                            <View style={styles.row3}>
                                {HIGHLIGHTS.map((x) => (
                                    <View key={x.id} style={styles.videoCard}>
                                        <View style={styles.videoThumb}>
                                            <Icon name="play" size={22} color="#fff" />
                                        </View>
                                        <Text style={styles.videoText}>{x.title}</Text>
                                        <Text style={styles.videoText}>{x.date}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.sectionDivider} />

                            <Text style={styles.sectionH}>Clips</Text>
                            <View style={styles.row3}>
                                {CLIPS.map((x) => (
                                    <View key={x.id} style={styles.videoCard}>
                                        <View style={styles.videoThumb}>
                                            <Icon name="play" size={22} color="#fff" />
                                        </View>
                                        <Text style={styles.videoText}>{x.title}</Text>
                                        <Text style={styles.videoText}>{x.date}</Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        <View style={styles.noFoundWrap}>
                            <Text style={styles.noFound}>No game found</Text>
                        </View>
                    )}
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

    /* HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "ios" ? 60 : 50,
        paddingBottom: 14,
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    avatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    greet: { color: "#fff", fontSize: 16, fontWeight: "800" },
    sub: { color: "#cfcfcf", fontSize: 12 },

    /* SHEET */
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
    topTitle: { color: "#fff", fontSize: 16, fontWeight: "900" },

    /* PLAYER CARD */
    playerCard: {
        flexDirection: "row",
        gap: 12,
        borderRadius: 14,
        backgroundColor: "#222222",
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        padding: 10,
        marginBottom: 12,
        alignItems: "center",
    },
    playerImgWrap: {
        width: 72,
        height: 72,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    playerImg: { width: 62, height: 62, resizeMode: "contain" },
    playerName: { color: "#fff", fontSize: 18, fontWeight: "900", lineHeight: 20 },
    playerMeta: { color: "#ff1e1e", fontSize: 11, fontWeight: "800", marginTop: 4 },

    followBtn: {
        height: 26,
        paddingHorizontal: 16,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.12)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 8,
    },
    followText: { color: "#fff", fontSize: 11, fontWeight: "800" },

    /* TABS */
    tabsRow: {
        flexDirection: "row",
        paddingHorizontal: 6,
        marginBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(255,255,255,0.65)",
    },
    tabBtn: { flex: 1, alignItems: "center", paddingVertical: 10, position: "relative" },
    tabText: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "800" },
    tabTextActive: { color: "#ff1e1e" },
    tabUnderline: { position: "absolute", bottom: -2, height: 2, width: "100%", backgroundColor: "#ff1e1e" },

    /* SCORES LIST */
    matchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#222222",
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 10,
    },
    matchLeftTop: { color: "#fff", fontSize: 11, fontWeight: "900" },
    matchLeftBottom: { color: "rgba(255,255,255,0.7)", fontSize: 10, marginTop: 3, fontWeight: "700" },

    matchRight: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
    },
    matchRightTop: { color: "#fff", fontSize: 10, fontWeight: "900" },
    matchRightBottom: { color: "rgba(255,255,255,0.7)", fontSize: 10, marginTop: 3, fontWeight: "800" },

    /* STATUS */
    statusCard: {
        borderRadius: 14,
        backgroundColor: "#222222",
        paddingHorizontal: 14,
        paddingVertical: 16,
    },
    statusTitle: { color: "#ff1e1e", fontWeight: "900", fontSize: 13, marginBottom: 10 },
    statCols: { flexDirection: "row", justifyContent: "space-around" },
    statCol: { alignItems: "center" },
    statHead: { color: "rgba(255,255,255,0.75)", fontWeight: "900", fontSize: 12, marginBottom: 6 },
    statVal: { color: "#fff", fontWeight: "900", fontSize: 14 },

    /* HIGHLIGHTS */
    sectionH: { color: "#ff1e1e", fontWeight: "900", fontSize: 13, marginBottom: 10, paddingHorizontal: 2 },
    row3: { flexDirection: "row", justifyContent: "space-between", gap: 10, marginBottom: 12 },
    videoCard: { flex: 1 },
    videoThumb: {
        height: 74,
        borderRadius: 10,
        backgroundColor: "#7b7b7b",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 6,
    },
    videoText: { color: "rgba(255,255,255,0.75)", fontSize: 9, fontWeight: "700" },
    sectionDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)", marginVertical: 10 },

    /* NO FOUND */
    noFoundWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
    noFound: { color: "rgba(255,255,255,0.7)", fontWeight: "900" },
});
