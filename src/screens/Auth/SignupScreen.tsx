// src/screens/Auth/SignupScreen.tsx
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";

export default function SignupScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { width } = Dimensions.get("window");
    const logoSize = useMemo(() => Math.min(210, Math.max(130, width * 0.40)), [width]);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.overlay} />

                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <ScrollView
                        contentContainerStyle={styles.content}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <Image
                            source={Images.logo}
                            style={[styles.logo, { width: logoSize, height: logoSize }]}
                            resizeMode="contain"
                        />

                        <View style={styles.header}>
                            <Text style={styles.h1}>Create Account</Text>
                            <Text style={styles.h2}>Let’s get you started</Text>
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.label}>Full Name</Text>
                            <View style={styles.inputWrap}>
                                <Icon name="user" size={18} color="#bfbfbf" style={styles.leftIcon} />
                                <TextInput
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Enter name"
                                    placeholderTextColor="#9a9a9a"
                                    style={styles.input}
                                    autoCapitalize="words"
                                    textContentType="name"
                                />
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>Email Address</Text>
                            <View style={styles.inputWrap}>
                                <Icon name="mail" size={18} color="#bfbfbf" style={styles.leftIcon} />
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="Enter email"
                                    placeholderTextColor="#9a9a9a"
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                />
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                            <View style={styles.inputWrap}>
                                <Icon name="lock" size={18} color="#bfbfbf" style={styles.leftIcon} />
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter password"
                                    placeholderTextColor="#9a9a9a"
                                    style={styles.input}
                                    secureTextEntry={!showPass}
                                    textContentType="newPassword"
                                />
                                <Pressable onPress={() => setShowPass((v) => !v)} hitSlop={12} style={styles.eyeBtn}>
                                    <Icon name={showPass ? "eye-off" : "eye"} size={18} color="#bfbfbf" />
                                </Pressable>
                            </View>

                            <Text style={[styles.label, { marginTop: 16 }]}>Confirm Password</Text>
                            <View style={styles.inputWrap}>
                                <Icon name="lock" size={18} color="#bfbfbf" style={styles.leftIcon} />
                                <TextInput
                                    value={confirm}
                                    onChangeText={setConfirm}
                                    placeholder="Confirm password"
                                    placeholderTextColor="#9a9a9a"
                                    style={styles.input}
                                    secureTextEntry={!showConfirm}
                                    textContentType="password"
                                />
                                <Pressable
                                    onPress={() => setShowConfirm((v) => !v)}
                                    hitSlop={12}
                                    style={styles.eyeBtn}
                                >
                                    <Icon name={showConfirm ? "eye-off" : "eye"} size={18} color="#bfbfbf" />
                                </Pressable>
                            </View>

                            <Pressable style={styles.signupBtn} onPress={() => navigation.navigate("Onboarding")}>
                                <Text style={styles.signupText}>Create Account</Text>
                            </Pressable>

                            <View style={styles.loginRow}>
                                <Text style={styles.muted}>Already have an account? </Text>
                                <Pressable onPress={() => navigation.goBack()}>
                                    <Text style={styles.loginLink}>Login</Text>
                                </Pressable>
                            </View>

                            <Text style={styles.orText}>or sign up with</Text>

                            <View style={styles.socialRow}>
                                <Pressable style={styles.socialBtn} onPress={() => { }}>
                                    <Image source={Images.googleImg} style={styles.socialImg} resizeMode="contain" />
                                </Pressable>
                                <Pressable style={styles.socialBtn} onPress={() => { }}>
                                    <Image source={Images.facebookImg} style={styles.socialImg} resizeMode="contain" />
                                </Pressable>
                                <Pressable style={styles.socialBtn} onPress={() => { }}>
                                    <Image source={Images.appleImg} style={styles.socialImg} resizeMode="contain" />
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    flex: { flex: 1 },
    bg: { flex: 1 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    content: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 32,
        paddingBottom: 28,
    },

    logo: { alignSelf: "center", marginBottom: 10 },

    header: { marginTop: 6, marginBottom: 18 },
    h1: { color: "#fff", fontSize: 30, fontWeight: "800" },
    h2: { color: "#ff2d2d", marginTop: 4, fontSize: 13, fontFamily: "Montserrat-SemiBold", },

    form: { marginTop: 8 },

    label: { color: "#fff", fontSize: 13, fontFamily: "Montserrat-Bold", marginBottom: 8 },

    inputWrap: {
        height: 52,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.55)",
        backgroundColor: "rgba(0,0,0,0.22)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
    },
    leftIcon: { marginRight: 10 },
    input: { flex: 1, color: "#fff", fontSize: 14, paddingVertical: 0 },
    eyeBtn: { paddingLeft: 10 },

    signupBtn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    signupText: { color: "#fff", fontSize: 16, fontWeight: "800" },

    loginRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    muted: { color: "#cfcfcf", fontSize: 12, fontFamily: "Montserrat-SemiBold", },
    loginLink: { color: "#fff", fontSize: 12, fontWeight: "800" },

    orText: {
        textAlign: "center",
        color: "#cfcfcf",
        marginTop: 18,
        fontSize: 12,
        fontFamily: "Montserrat-SemiBold",
    },

    socialRow: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 24,
        marginTop: 20,
    },
    socialBtn: {
        width: 46,
        height: 46,
        borderRadius: 28,
        backgroundColor: "rgba(255,255,255,0.92)",
        alignItems: "center",
        justifyContent: "center",
    },
    socialImg: { width: 46, height: 46 },
});
