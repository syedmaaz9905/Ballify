import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    TextInput,
    Image,
    Dimensions,
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

const { width, height } = Dimensions.get("window");

const STATS = [
    { k: "GP", v: "77" },
    { k: "WIN", v: "0" },
    { k: "PTS", v: "114.8" },
    { k: "AST", v: "24.6" },
    { k: "TO", v: "11.8" },
    { k: "MIN", v: "42.6" },
    { k: "FGM", v: "42.6" },
    { k: "FGA", v: "89.8" },
    { k: "FG%", v: "47.2" },
    { k: "3PM", v: "16.1" },
    { k: "3PA", v: "42.1" },
    { k: "3P%", v: "38.2" },
];

export default function TeamStatus() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState("");

    const filteredStats = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return STATS;
        return STATS.filter((s) => s.k.toLowerCase().includes(q));
    }, [query]);

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
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    {/* top row */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Team Status</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    {/* search */}
                    <View style={styles.searchWrap}>
                        <Icon name="search" size={16} color="#777" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* team card */}
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                        <View style={styles.teamCard}>
                            {/* header */}
                            <View style={styles.teamHeader}>
                                <Image source={Images.logo} style={styles.teamLogo} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.teamNameBig}>BOSTON</Text>
                                    <Text style={[styles.teamNameBig, { marginTop: -2 }]}>CELTICS</Text>

                                    <View style={styles.teamMetaRow}>
                                        <Text style={styles.teamMeta}>Profile</Text>
                                        <Text style={styles.teamMeta}>Status</Text>
                                    </View>
                                </View>
                            </View>

                            {/* content */}
                            <View style={styles.contentRow}>
                                {/* LEFT: stats table */}
                                <View style={styles.leftPanel}>
                                    <View style={styles.leftHeaderRow}>
                                        <Text style={styles.leftHeaderActive}>OVERALL</Text>
                                        <Text style={styles.leftHeader}>2025-26</Text>
                                    </View>

                                    <View style={styles.statsList}>
                                        {filteredStats.map((s) => (
                                            <View key={s.k} style={styles.statRow}>
                                                <Text style={styles.statKey}>{s.k}</Text>
                                                <Text style={styles.statVal}>{s.v}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* RIGHT: chart + gauge */}
                                <View style={styles.rightPanel}>
                                    <View style={styles.panelCard}>
                                        <Text style={styles.panelTitle}>Overall Performance</Text>

                                        {/* dummy chart */}
                                        <View style={styles.chartBox}>
                                            <View style={styles.chartBarsRow}>
                                                {Array.from({ length: 18 }).map((_, i) => (
                                                    <View
                                                        key={i}
                                                        style={[
                                                            styles.bar,
                                                            { height: 18 + ((i * 7) % 46) },
                                                        ]}
                                                    />
                                                ))}
                                            </View>

                                            <View style={styles.chartAxisRow}>
                                                <Text style={styles.axisText}>Best</Text>
                                                <Text style={styles.axisText}>Today</Text>
                                            </View>

                                            <View style={styles.chartValuesRow}>
                                                <Text style={styles.axisVal}>112.00</Text>
                                                <Text style={styles.axisVal}>85.00</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={[styles.panelCard, { marginTop: 10 }]}>
                                        <View style={styles.gaugeWrap}>
                                            <Text style={styles.gaugeVal}>77%</Text>
                                            <View style={styles.gaugeArc} />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <Pressable style={styles.uploadBtn} onPress={() => navigation.navigate("UploadGame")}>
                                <Text style={styles.uploadText}>Upload Game</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
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

    /* search */
    searchWrap: {
        height: 40,
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    searchInput: {
        flex: 1,
        color: "#222",
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
        height: "100%",
    },

    /* team card */
    teamCard: {
        borderRadius: 16,
        backgroundColor: "#222222",
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        padding: 12,
    },
    teamHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
    teamLogo: { width: 75, height: 75, borderRadius: 27 },
    teamNameBig: { color: "#fff", fontSize: 18, fontFamily: "Montserrat-SemiBold", lineHeight: 20 },
    teamMetaRow: { flexDirection: "row", gap: 18, marginTop: 4 },
    teamMeta: { color: "#989898", fontSize: 14, fontFamily: "Montserrat-Regular" },

    contentRow: { flexDirection: "row", gap: 10 },

    /* left panel */
    leftPanel: {
        width: Math.min(150, width * 0.38),
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        backgroundColor: "#000",
        padding: 10,
    },
    leftHeaderRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    leftHeaderActive: { color: "#ff1e1e", fontSize: 10, fontFamily: "Montserrat-Bold" },
    leftHeader: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Bold" },

    statsList: { gap: 6 },
    statRow: { flexDirection: "row", justifyContent: "space-between" },
    statKey: { color: "rgba(255,255,255,0.85)", fontSize: 10, fontFamily: "Montserrat-Regular" },
    statVal: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Bold" },

    /* right panel */
    rightPanel: { flex: 1 },
    panelCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        backgroundColor: "#000",
        padding: 10,
    },
    panelTitle: { color: "#fff", fontSize: 11, fontFamily: "Montserrat-Bold", marginBottom: 8 },

    chartBox: { borderRadius: 10, overflow: "hidden" },
    chartBarsRow: {
        height: 90,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 3,
        paddingHorizontal: 2,
        paddingBottom: 4,
    },
    bar: {
        width: 6,
        borderRadius: 6,
        backgroundColor: "#ff1e1e",
        opacity: 0.9,
    },
    chartAxisRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
    axisText: { color: "rgba(255,255,255,0.55)", fontSize: 9, fontFamily: "Montserrat-Regular" },
    chartValuesRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
    axisVal: { color: "rgba(255,255,255,0.8)", fontSize: 9, fontFamily: "Montserrat-Bold" },

    gaugeWrap: { alignItems: "center", justifyContent: "center", height: 72 },
    gaugeVal: { color: "#fff", fontSize: 18, fontFamily: "Montserrat-Bold" },
    gaugeArc: {
        marginTop: 6,
        width: 120,
        height: 60,
        borderTopLeftRadius: 120,
        borderTopRightRadius: 120,
        borderWidth: 8,
        borderColor: "#ff1e1e",
        borderBottomWidth: 0,
        opacity: 0.85,
    },

    uploadBtn: {
        marginTop: 12,
        height: 42,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    uploadText: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Bold" },
});
