// src/screens/ChooseRoleScreen.tsx  (REPLACE FULL FILE)

import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Images } from "../../assets";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

type Role = "player" | "coach";

export default function ChooseRoleScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [role, setRole] = useState<Role>("player");

    const handleSelect = (r: Role) => {
        setRole(r);
        if (r === "coach") navigation.replace("CoachHome");
        else navigation.replace("PlayerParentHome");
    };

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

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

                <View style={styles.card}>
                    <View style={styles.cardTop}>
                        <Text style={styles.cardTitle}>Choose Your Role</Text>
                        <Text style={styles.cardDesc}>
                            Each Role Has Unique Features Designed For The Best Experience
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => handleSelect("player")}
                        style={[styles.roleBtn, role === "player" && styles.roleActive]}
                    >
                        <View style={styles.roleIcon}>
                            <Image source={Images.playerRoleIcon} style={styles.roleIconImg} resizeMode="contain" />
                        </View>

                        <View style={styles.roleTextWrap}>
                            <Text style={styles.roleTitle}>Player/Parents</Text>
                            <Text style={styles.roleDesc}>
                                each role has unique features designed for the best experience
                            </Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => handleSelect("coach")}
                        style={[styles.roleBtn, role === "coach" && styles.roleActive]}
                    >
                        <View style={styles.roleIcon}>
                            <Image source={Images.coachRoleIcon} style={styles.roleIconImg} resizeMode="contain" />
                        </View>

                        <View style={styles.roleTextWrap}>
                            <Text style={styles.roleTitle}>Coach</Text>
                            <Text style={styles.roleDesc}>
                                manage your team, scout opponents, follow teams and stay updated with notification
                            </Text>
                        </View>
                    </Pressable>
                </View>

                <Pressable style={styles.prevBtn} onPress={() => navigation.goBack()}>
                    <Image
                        source={Images.prevIcon}
                        style={{ width: 26, height: 26 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.prevText}>Previous</Text>
                </Pressable>
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

    card: {
        marginTop: 60,
        marginHorizontal: 18,
        borderRadius: 30,
        padding: 18,
        backgroundColor: "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.12)",
    },
    cardTop: {
        alignSelf: "center",
        width: "100%",
        paddingVertical: 14,
        paddingHorizontal: 12,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
    },
    cardTitle: {
        color: "#fff",
        fontSize: 24,
        fontFamily: "Montserrat-Bold",
        textAlign: "center",
        alignSelf: "center",
    },
    cardDesc: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 6,
        lineHeight: 16,
    },

    roleBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 16,
        backgroundColor: "rgba(0,0,0,0.75)",
        borderWidth: 1.2,
        borderColor: "#ff1e1e",
        marginTop: 14,
    },
    roleActive: {
        backgroundColor: "rgba(0,0,0,0.85)",
        shadowColor: "#ff1e1e",
        shadowOpacity: 0.35,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 10,
    },

    roleIcon: {
        width: 47,
        height: 52,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    roleIconImg: {
        width: 47,
        height: 52,
    },

    roleTextWrap: { flex: 1 },
    roleTitle: { color: "#fff", fontSize: 17, fontFamily: "Montserrat-Bold", },
    roleDesc: { color: "rgba(255,255,255,0.70)", fontSize: 10, fontFamily: "Montserrat-Regular", lineHeight: 14 },

    prevBtn: {
        position: "absolute",
        left: 14,
        bottom: 18,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    prevText: { color: "#AAAAAA", fontSize: 15, fontFamily: "Montserrat-SemiBold", },
});
