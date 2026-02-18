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
                        <View>
                            <Image
                                source={Images.profileIcon}
                                style={{ width: 45, height: 45 }}
                                resizeMode="contain"
                            />
                        </View>

                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                {/* SHEET */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={24} color="#fff" />
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
                        <View style={styles.statusCardNew}>
                            <View style={styles.avgRowWrap}>
                                {/* LEFT: label */}
                                <Text style={styles.statusTitleLeft}>Season Avg</Text>

                                {/* RIGHT: horizontal scroll table */}
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.avgTable}
                                >
                                    <View>
                                        {/* header row */}
                                        <View style={styles.avgRow}>
                                            <Text style={styles.avgHead}>GP</Text>
                                            <Text style={styles.avgHead}>PST</Text>
                                            <Text style={styles.avgHead}>REB</Text>
                                        </View>

                                        <View style={styles.avgDivider} />

                                        {/* value row */}
                                        <View style={styles.avgRow}>
                                            <Text style={styles.avgVal}>3</Text>
                                            <Text style={styles.avgVal}>14</Text>
                                            <Text style={styles.avgVal}>3</Text>
                                        </View>
                                    </View>
                                </ScrollView>
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
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },

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
    topTitle: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },

    /* PLAYER CARD */
    playerCard: {
        flexDirection: "row",
        gap: 12,
        borderRadius: 14,
        backgroundColor: "#222222",
        padding: 10,
        marginBottom: 12,
        alignItems: "center",
        paddingVertical: 14,
    },
    playerImgWrap: {
        width: 72,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    playerImg: { width: 62, height: 62, resizeMode: "contain" },
    playerName: { color: "#fff", fontSize: 22, fontFamily: "Montserrat-Bold", lineHeight: 22 },
    playerMeta: { color: "#FF0000", fontSize: 13, fontFamily: "Montserrat-Regular", marginTop: 4 },

    followBtn: {
        height: 28,
        paddingHorizontal: 32,
        borderRadius: 999,
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#FF0000",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 8,
    },
    followText: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Medium" },

    /* TABS */
    tabsRow: {
        flexDirection: "row",
        paddingHorizontal: 0,
        marginBottom: 12,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(255,255,255,0.65)",
    },
    tabBtn: { flex: 1, alignItems: "center", paddingVertical: 10, position: "relative" },
    tabText: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Regular" },
    tabTextActive: { color: "#FF0101" },
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
    matchLeftTop: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-SemiBold", },
    matchLeftBottom: { color: "#fff", fontSize: 11, marginTop: 1, fontFamily: "Montserrat-Regular", },

    matchRight: {
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 8,
    },
    matchRightTop: { color: "#fff", fontSize: 11, fontFamily: "Montserrat-Regular", },
    matchRightBottom: { color: "#fff", fontSize: 11, fontFamily: "Montserrat-Regular", },

    /* STATUS */
    statusCardNew: {
        borderRadius: 14,
        backgroundColor: "#222222",
        paddingHorizontal: 14,
        paddingVertical: 12,
    },

    avgRowWrap: {
        flexDirection: "row",
        alignItems: "center",
    },

    statusTitleLeft: {
        color: "#ff1e1e",
        fontSize: 13,
        fontFamily: "Montserrat-Bold",
        marginRight: 12,
    },

    avgTable: {
        paddingRight: 6,
    },

    avgRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    avgHead: {
        width: 62,
        textAlign: "center",
        color: "rgba(255,255,255,0.85)",
        fontSize: 12,
        fontFamily: "Montserrat-Bold",
    },

    avgVal: {
        width: 62,
        textAlign: "center",
        color: "#fff",
        fontSize: 13,
        fontFamily: "Montserrat-Regular",
    },

    avgDivider: {
        marginTop: 8,
        marginBottom: 8,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.45)",
    },

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
    videoText: { color: "rgba(255,255,255,0.75)", fontSize: 9, fontFamily: "Montserrat-Bold", },
    sectionDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)", marginVertical: 10 },

    /* NO FOUND */
    noFoundWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
    noFound: { color: "rgba(255,255,255,0.7)", fontWeight: "900" },
});
