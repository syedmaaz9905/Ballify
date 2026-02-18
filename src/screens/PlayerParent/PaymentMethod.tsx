import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function PaymentMethod() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.title}>Payment Method</Text>
                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Payments</Text>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Stripe</Text>
                            <Text style={styles.infoText}>Stripe integration will be added later.</Text>
                        </View>

                        <Pressable style={styles.primaryBtn}>
                            <Text style={styles.primaryBtnText}>Upgrade to Premium</Text>
                        </Pressable>
                    </View>
                </View>

                <BottomTabs active="settings" />
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
    title: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    divider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)" },

    content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },

    sectionTitle: {
        color: "#FF0004",
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        paddingTop: 8,
        paddingBottom: 10,
    },

    infoBox: {
        marginTop: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.14)",
        backgroundColor: "rgba(255,255,255,0.04)",
        paddingHorizontal: 14,
        paddingVertical: 14,
    },
    infoTitle: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
    infoText: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "Montserrat-Regular", marginTop: 6 },

    primaryBtn: {
        marginTop: "auto",
        marginBottom: 18,
        height: 52,
        borderRadius: 16,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryBtnText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
});
