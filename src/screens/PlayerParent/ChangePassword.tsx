// src/screens/PlayerParent/ChangePassword.tsx  (REPLACE FULL FILE)

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    TextInput,
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

export default function ChangePassword() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirm, setConfirm] = useState("");

    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.title}>Change Password</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.content}>
                        <Field
                            label="Old Password"
                            value={oldPass}
                            onChangeText={setOldPass}
                            visible={showOld}
                            onToggle={() => setShowOld((v) => !v)}
                        />

                        <Field
                            label="New Password"
                            value={newPass}
                            onChangeText={setNewPass}
                            visible={showNew}
                            onToggle={() => setShowNew((v) => !v)}
                        />

                        <Field
                            label="Confirm Password"
                            value={confirm}
                            onChangeText={setConfirm}
                            visible={showConfirm}
                            onToggle={() => setShowConfirm((v) => !v)}
                        />

                        <Pressable style={styles.primaryBtn}>
                            <Text style={styles.primaryBtnText}>Set Password</Text>
                        </Pressable>
                    </View>
                </View>

                <BottomTabs active="settings" />
            </ImageBackground>
        </View>
    );
}

function Field({
    label,
    value,
    onChangeText,
    visible,
    onToggle,
}: {
    label: string;
    value: string;
    onChangeText: (v: string) => void;
    visible: boolean;
    onToggle: () => void;
}) {
    return (
        <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{label}</Text>

            <View style={styles.inputWrap}>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!visible}
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.25)"
                />

                <Pressable onPress={onToggle} hitSlop={10} style={styles.eyeBtn}>
                    <Icon name={visible ? "eye" : "eye-off"} size={16} color="#fff" />
                </Pressable>
            </View>
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

    content: {
        flex: 1,
        paddingHorizontal: 18,
        paddingTop: 22,
    },

    fieldRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    fieldLabel: {
        width: 120,
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
    },

    inputWrap: {
        flex: 1,
        height: 34,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#FF0000",
        backgroundColor: "#000",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 6,
    },

    input: {
        flex: 1,
        height: "100%",
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
    },

    eyeBtn: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 6,
    },

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
