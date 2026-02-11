// src/screens/PlayerParent/Settings.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Switch,
    Platform,
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

export default function Settings() {
    const [pushEnabled, setPushEnabled] = useState(false);
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

                        <Text style={styles.title}>Setting</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    {/* Account Settings */}
                    <Text style={styles.sectionTitle}>Account Settings</Text>

                    <Row label="Edit profile" right={<Icon name="chevron-right" size={20} color="#fff" />} />
                    <Row label="Change password" right={<Icon name="chevron-right" size={20} color="#fff" />} />
                    <Row label="Add a payment method" right={<Icon name="plus" size={20} color="#fff" />} />

                    <View style={styles.row}>
                        <Text style={styles.rowText}>Push notifications</Text>
                        <Switch
                            value={pushEnabled}
                            onValueChange={setPushEnabled}
                            trackColor={{ false: "#4b4b4b", true: "#ff1e1e" }}
                            thumbColor={"#fff"}
                        />
                    </View>

                    <View style={styles.sectionDivider} />

                    {/* More */}
                    <Text style={styles.sectionTitle}>More</Text>

                    <Row
                        label="About us"
                        right={<Icon name="chevron-right" size={20} color="#fff" />}
                        onPress={() => navigation.navigate("AboutUs")}
                    />

                    <Row
                        label="Privacy policy"
                        right={<Icon name="chevron-right" size={20} color="#fff" />}
                        onPress={() => navigation.navigate("PrivacyPolicy")}
                    />
                </View>

                <BottomTabs active="settings" />
            </ImageBackground>
        </View>
    );
}

function Row({ label, right, onPress }: { label: string; right: React.ReactNode; onPress?: () => void }) {
    return (
        <Pressable style={styles.row} onPress={onPress}>
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

    sectionTitle: {
        color: "#ff1e1e",
        fontSize: 14,
        fontWeight: "800",
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingVertical: 14,
    },
    rowText: { color: "#fff", fontSize: 14, fontWeight: "600" },

    sectionDivider: {
        height: 1,
        marginTop: 8,
        backgroundColor: "rgba(255,255,255,0.18)",
    },
});
