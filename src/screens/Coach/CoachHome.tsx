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

const TEAMS: Team[] = Array.from({ length: 4 }).map((_, i) => ({
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

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <Text style={styles.title}>Find Your Team</Text>

                    <View style={styles.searchWrap}>
                        <Image source={Images.searchIcon} style={styles.searchIcon} resizeMode="contain" />
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Search"
                            placeholderTextColor="#999"
                            style={styles.searchInput}
                            textAlignVertical="center"
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

                    <View style={styles.btnWrap}>
                        <Pressable style={styles.primaryBtn} onPress={() => navigation.navigate("CoachPlayers")}>
                            <Text style={styles.primaryBtnText}>Show Selected Team</Text>

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
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },

    /* CARD */
    sheet: {
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#FF0000",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
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
    searchInput: {
        flex: 1,
        color: "#898989",
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
        height: "100%",
    },

    searchIcon: { width: 16, height: 16 },

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
    teamLogo: { width: 32, height: 32 },
    teamName: { color: "#fff", fontFamily: "Montserrat-SemiBold", fontSize: 18 },
    teamMeta: { color: "#989898", fontSize: 12, fontFamily: "Montserrat-Regular" },

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
    btnWrap: {
        alignItems: "center",
    },
    primaryBtn: {
        height: 52,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#FF0000",
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
        width: "88%",
    },
    primaryBtnText: { color: "#fff", fontFamily: "Montserrat-Bold", fontSize: 16 },
});
