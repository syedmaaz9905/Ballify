// src/screens/Coach/CoachPlayers.tsx
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    TextInput,
    FlatList,
    Image,
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

type Player = {
    id: string;
    name: string;
    age: number;
};

const PLAYERS: Player[] = [
    { id: "1", name: "Jayson Tatum", age: 27 },
    { id: "2", name: "Arfennee Simons", age: 26 },
    { id: "3", name: "Jaylen Brown", age: 29 },
    { id: "4", name: "Josh Minott", age: 23 },
    { id: "5", name: "Derrick White", age: 31 },
    { id: "6", name: "Jayson Tatum", age: 27 },
    { id: "7", name: "Jayson Tatum", age: 27 },
];

export default function CoachPlayers() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>("1");

    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return PLAYERS;
        return PLAYERS.filter((p) => p.name.toLowerCase().includes(q));
    }, [query]);

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

                    <Icon
                        name="sliders"
                        size={26}
                        color="#fff"
                        style={{ transform: [{ rotate: "90deg" }] }}
                    />
                </View>

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    {/* Top row */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={18} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Player</Text>

                        <View style={{ width: 18 }} />
                    </View>

                    {/* Search */}
                    <View style={styles.searchWrap}>
                        <Icon name="search" size={16} color="#999" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                        />
                    </View>

                    {/* Team card */}
                    <View style={styles.teamCard}>
                        <View style={styles.teamHeader}>
                            <Image source={Images.logo} style={styles.teamLogo} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.teamNameBig}>BOSTON</Text>
                                <Text style={styles.teamNameBig}>CELTICS</Text>
                                <View style={styles.teamMetaRow}>
                                    <Text style={styles.teamMeta}>Profile</Text>
                                    <Text style={styles.teamMeta}>Status</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.colsHeader}>
                            <Text style={styles.colLeft}>Name</Text>
                            <Text style={styles.colRight}>Age</Text>
                        </View>

                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 8 }}
                            renderItem={({ item }) => {
                                const active = selectedId === item.id;
                                return (
                                    <Pressable
                                        style={styles.row}
                                        onPress={() => setSelectedId(active ? null : item.id)}
                                    >
                                        <Text style={styles.rowName}>{item.name}</Text>

                                        <View style={styles.ageWrap}>
                                            <Text style={styles.rowAge}>{item.age}</Text>
                                            <View style={[styles.radio, active && styles.radioActive]}>
                                                {active ? <View style={styles.radioDot} /> : null}
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            }}
                        />
                    </View>

                    {/* Bottom buttons */}
                    <View style={styles.actionsRow}>
                        <Pressable style={[styles.actionBtn, styles.actionBtnOutline]}>
                            <Text style={styles.actionText}>Show Team Status</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.actionBtn, styles.actionBtnFilled]}
                            onPress={() => navigation.navigate("SelectedPlayerProfile")}
                        >
                            <Text style={styles.actionText}>Selected Player Profile</Text>
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
    backBtn: {
        width: 34,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    topTitle: { color: "#fff", fontSize: 16, fontWeight: "900" },

    /* SEARCH */
    searchWrap: {
        height: 38,
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    searchInput: { flex: 1, color: "#111", fontSize: 14, fontWeight: "600" },

    /* TEAM CARD */
    teamCard: {
        borderRadius: 16,
        backgroundColor: "#222222",
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        padding: 12,
        flex: 1,
    },
    teamHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 10,
    },
    teamLogo: { width: 54, height: 54, borderRadius: 27 },
    teamNameBig: { color: "#fff", fontSize: 18, fontWeight: "900", lineHeight: 20 },
    teamMetaRow: { flexDirection: "row", gap: 18, marginTop: 4 },
    teamMeta: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "700" },

    colsHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        paddingHorizontal: 2,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.12)",
        marginBottom: 6,
    },
    colLeft: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "800" },
    colRight: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "800" },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.45)",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 8,
        backgroundColor: "#000",
    },
    rowName: { color: "#fff", fontSize: 12, fontWeight: "800" },
    ageWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
    rowAge: { color: "#fff", fontSize: 12, fontWeight: "800", width: 24, textAlign: "right" },

    radio: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    radioActive: { borderColor: "#ff1e1e" },
    radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "#ff1e1e" },

    /* ACTIONS */
    actionsRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    actionBtn: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    actionBtnOutline: {
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        backgroundColor: "#000",
    },
    actionBtnFilled: {
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        backgroundColor: "#000",
    },
    actionText: { color: "#fff", fontWeight: "900", fontSize: 12 },
});
