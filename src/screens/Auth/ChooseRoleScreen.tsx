import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, ImageBackground, Alert } from "react-native";
import { useNavigation, useRoute, CommonActions, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Images } from "../../assets";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import { useAuth } from "../../hooks/useAuth";

type Role = "player" | "coach";

export default function ChooseRoleScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, "ChooseRole">>();
    const { handleSignup, loading } = useAuth();

    const [role, setRole] = useState<Role | null>(null);

    const { firstName, lastName, email, password } = route.params;

    const handleRegister = async () => {
        if (!role) {
            Alert.alert("Validation", "Please select a role.");
            return;
        }

        try {
            await handleSignup({
                email,
                password,
                firstName,
                lastName,
                language: "en",
                role,
                profilePicture: "",
                isPushNotificationEnabled: true,
            });

            Alert.alert("Success", "Account created successfully.");

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                })
            );
        } catch (error: any) {
            console.log("Signup error:", error?.response?.data || error);
            Alert.alert(
                "Signup Failed",
                error?.response?.data?.message || "Something went wrong."
            );
        }
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
                                style={{ width: 45, height: 45 }}
                                resizeMode="contain"
                            />
                        </View>

                        <View>
                            <Text style={styles.greet}>Choose Role</Text>
                            <Text style={styles.sub}>Select your account type</Text>
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
                        onPress={() => setRole("player")}
                        style={[
                            styles.roleBtn,
                            role === "player" ? styles.roleActive : styles.roleInactive,
                        ]}
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
                        onPress={() => setRole("coach")}
                        style={[
                            styles.roleBtn,
                            role === "coach" ? styles.roleActive : styles.roleInactive,
                        ]}
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

                    <Pressable
                        style={[
                            styles.registerBtn,
                            (!role || loading) && styles.disabledBtn,
                        ]}
                        onPress={handleRegister}
                        disabled={!role || loading}
                    >
                        <Text style={styles.registerText}>
                            {loading ? "Please wait..." : "Register"}
                        </Text>
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

    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },

    card: {
        flex: 1,
        marginTop: 40,
        marginBottom: 80,
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
        backgroundColor: "rgba(0,0,0,0.8)",
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
        marginTop: 14,
        borderWidth: 1.5,
    },

    roleInactive: {
        backgroundColor: "rgba(0,0,0,0.78)",
        borderColor: "rgba(255,255,255,0.18)",
    },

    roleActive: {
        backgroundColor: "rgba(0,0,0,0.78)",
        borderColor: "#E8130D",
        shadowColor: "#E8130D",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
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
    roleTitle: { color: "#fff", fontSize: 17, fontFamily: "Montserrat-Bold" },
    roleDesc: { color: "rgba(255,255,255,0.70)", fontSize: 10, fontFamily: "Montserrat-Regular", lineHeight: 14 },

    registerBtn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 28,
    },
    registerText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Montserrat-Medium",
    },
    disabledBtn: {
        opacity: 0.45,
    },

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
    prevText: { color: "#AAAAAA", fontSize: 15, fontFamily: "Montserrat-SemiBold" },
});