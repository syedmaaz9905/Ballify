// src/screens/Coach/CoachHome.tsx
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

type Team = {
    id: string;
    name: string;
    meta: string;
    logo?: any;
};

const TEAMS: Team[] = Array.from({ length: 7 }).map((_, i) => ({
    id: String(i + 1),
    name: "Boston Celtics",
    meta: "Profile   Status   Schedule",
    logo: Images.logo,
}));

export default function CoachHome() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const data = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return TEAMS;
        return TEAMS.filter((t) => t.name.toLowerCase().includes(q));
    }, [query]);

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
                                style={{ width: 54, height: 54 }}
                                resizeMode="contain"
                            />
                        </View>

                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <Text style={styles.title}>Find Your Team</Text>

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

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 10 }}
                        renderItem={({ item }) => {
                            const active = selectedId === item.id;
                            return (
                                <Pressable
                                    style={styles.teamRow}
                                    onPress={() => setSelectedId(active ? null : item.id)}
                                >
                                    <View style={styles.teamLeft}>
                                        <Image source={item.logo} style={styles.teamLogo} />
                                        <View>
                                            <Text style={styles.teamName}>{item.name}</Text>
                                            <Text style={styles.teamMeta}>{item.meta}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.radio, active && styles.radioActive]}>
                                        {active ? <View style={styles.radioDot} /> : null}
                                    </View>
                                </Pressable>
                            );
                        }}
                    />

                    <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("CoachPlayers")}>
                        <Text style={styles.primaryBtnText}>Show Selected Team</Text>
                    </Pressable>
                </View>

                <BottomTabs active={null} />
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
    greet: { color: "#fff", fontSize: 24, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 12, fontFamily: "Montserrat-Bold" },

    /* CARD */
    sheet: {
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.55)",
        padding: 14,
        overflow: "hidden",
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 12,
    },

    /* SEARCH */
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
    searchInput: { flex: 1, color: "#111", fontSize: 14, fontFamily: "Montserrat-SemiBold", },

    /* ROWS */
    teamRow: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        backgroundColor: "#222222",
    },
    teamLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
    teamLogo: { width: 28, height: 28, borderRadius: 14 },
    teamName: { color: "#fff", fontWeight: "900", fontSize: 13 },
    teamMeta: { color: "rgba(255,255,255,0.7)", fontSize: 10, marginTop: 2 },

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
    radioDot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#ff1e1e",
    },

    /* BTN */
    primaryBtn: {
        height: 52,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    primaryBtnText: { color: "#fff", fontWeight: "900", fontSize: 14 },
});
