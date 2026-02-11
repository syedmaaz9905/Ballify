// src/screens/PlayerParent/Profile.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function Profile() {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    {/* Top Row */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.title}>Profile</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    {/* Rows */}
                    {/* <Row
                        label="Edit profile information"
                        right={<Icon name="chevron-right" size={20} color="#fff" />}
                    /> */}

                    <Pressable style={styles.row}>
                        <Text style={styles.rowText}>Language</Text>
                        <Text style={styles.valueText}>English</Text>
                    </Pressable>

                    <View style={styles.sectionDivider} />

                    <Text style={styles.sectionTitle}>Security</Text>

                    <Row label="Help & Support" right={<Icon name="chevron-right" size={20} color="#fff" />} />
                    <Row label="Contact us" right={<Icon name="chevron-right" size={20} color="#fff" />} />
                </View>

                <BottomTabs active="profile" />
            </ImageBackground>
        </View>
    );
}

function Row({ label, right }: { label: string; right: React.ReactNode }) {
    return (
        <Pressable style={styles.row}>
            <Text style={styles.rowText}>{label}</Text>
            {right}
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

    sheet: {
        flex: 1,
        marginHorizontal: 14,
        marginTop: Platform.OS === "ios" ? 50 : 40,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.55)",
        overflow: "hidden",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    title: { color: "#fff", fontSize: 20, fontWeight: "900" },
    divider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)" },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
    rowText: { color: "#fff", fontSize: 14, fontWeight: "600" },
    valueText: { color: "#ff1e1e", fontSize: 12, fontWeight: "800" },

    sectionDivider: {
        height: 1,
        marginTop: 8,
        backgroundColor: "rgba(255,255,255,0.18)",
    },
    sectionTitle: {
        color: "#ff1e1e",
        fontSize: 14,
        fontWeight: "800",
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 10,
    },
});
