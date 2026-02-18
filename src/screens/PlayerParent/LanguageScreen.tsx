// src/screens/PlayerParent/LanguageScreen.tsx  (REPLACE FULL FILE)

import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    TextInput,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

type Lang = {
    code: string;
    label: string;
    flag: string;
};

const LANGS: Lang[] = [
    { code: "ar", label: "Arabic", flag: "🇦🇪" },
    { code: "es", label: "Spanish", flag: "🇪🇸" },
    { code: "fr", label: "French", flag: "🇫🇷" },
    { code: "de", label: "German", flag: "🇩🇪" },
];

export default function LanguageScreen() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState<Lang>(LANGS[0]);
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return LANGS;
        return LANGS.filter((l) => l.label.toLowerCase().includes(s));
    }, [q]);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.title}>Language</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    <ScrollView
                        style={styles.scroll}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.helpText}>
                            Select your preferred language below This helps us serve you better.
                        </Text>

                        <Text style={styles.blockTitle}>You Selected</Text>

                        <View style={styles.selectedRow}>
                            <View style={styles.selectedLeft}>
                                <View style={styles.flagCircleSelected}>
                                    <Text style={styles.flag}>{selected.flag}</Text>
                                </View>
                                <Text style={styles.langText}>{selected.label}</Text>
                            </View>

                            <View style={styles.checkPill}>
                                <Icon name="check" size={14} color="#000" />
                            </View>
                        </View>

                        <Text style={[styles.blockTitle, { marginTop: 16 }]}>All Languages</Text>

                        <View style={styles.listCard}>
                            <View style={styles.searchRow}>
                                <Icon name="search" size={16} color="rgba(255,255,255,0.75)" />
                                <TextInput
                                    value={q}
                                    onChangeText={setQ}
                                    placeholder="Search"
                                    placeholderTextColor="rgba(255,255,255,0.45)"
                                    style={styles.searchInput}
                                />
                            </View>

                            <View style={styles.sep} />

                            <View style={styles.itemsWrap}>
                                {filtered.map((item, idx) => {
                                    const active = item.code === selected.code;
                                    const isLast = idx === filtered.length - 1;

                                    return (
                                        <View key={item.code}>
                                            <Pressable
                                                style={[styles.langRow, active && styles.langRowActive]}
                                                onPress={() => setSelected(item)}
                                            >
                                                <View style={styles.langLeft}>
                                                    <View style={styles.flagCircle}>
                                                        <Text style={styles.flag}>{item.flag}</Text>
                                                    </View>
                                                    <Text style={styles.langText}>{item.label}</Text>
                                                </View>

                                                {active ? (
                                                    <View style={styles.checkPill}>
                                                        <Icon name="check" size={14} color="#000" />
                                                    </View>
                                                ) : (
                                                    <View style={styles.radioOff} />
                                                )}
                                            </Pressable>

                                            {!isLast && <View style={styles.sep} />}
                                        </View>
                                    );
                                })}
                            </View>
                        </View>

                        <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
                            <Text style={styles.doneText}>Done</Text>
                        </Pressable>

                        <View style={{ height: 10 }} />
                    </ScrollView>
                </View>

                <BottomTabs active="profile" />
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

    sheet: {
        flex: 1,
        marginHorizontal: 14,
        marginTop: Platform.OS === "ios" ? 50 : 40,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "#000",
        overflow: "hidden",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    title: { color: "#fff", fontSize: 24, fontFamily: "Montserrat-Bold" },
    divider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)" },

    scroll: { flex: 1 },
    scrollContent: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 18 },

    helpText: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        lineHeight: 16,
    },

    blockTitle: {
        marginTop: 14,
        color: "#fff",
        fontSize: 13,
        fontFamily: "Montserrat-Bold",
    },

    selectedRow: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    selectedLeft: { flexDirection: "row", alignItems: "center", gap: 10 },

    flagCircleSelected: {
        width: 30,
        height: 30,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },

    flagCircle: {
        width: 30,
        height: 30,
        borderRadius: 999,
        backgroundColor: "#3E3E3A",
        alignItems: "center",
        justifyContent: "center",
    },

    flag: { fontSize: 16 },
    langText: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Regular" },

    checkDot: {
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
    },

    listCard: {
        marginTop: 10,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#FF0004",
        backgroundColor: "#3E3E3A",
        overflow: "hidden",
    },

    searchRow: {
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 14,
        backgroundColor: "#3E3E3A",
    },
    searchInput: {
        flex: 1,
        color: "#fff",
        fontSize: 14,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
    },

    // ✅ NO fixed height = no empty space
    itemsWrap: {
        backgroundColor: "#3E3E3A",
    },

    sep: { height: 1, backgroundColor: "rgba(255,255,255,0.12)" },

    langRow: {
        paddingHorizontal: 14,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#3E3E3A",
    },
    langRowActive: {
        backgroundColor: "rgba(0,0,0,0.18)",
    },
    langLeft: { flexDirection: "row", alignItems: "center", gap: 10 },

    checkPill: {
        width: 20,
        height: 20,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    radioOff: {
        width: 16,
        height: 16,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.35)",
        backgroundColor: "transparent",
    },

    doneBtn: {
        marginTop: 14,
        height: 54,
        borderRadius: 16,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    doneText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
});
