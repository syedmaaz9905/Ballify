import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
    TextInput,
    Dimensions,
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

const { width } = Dimensions.get("window");

export default function UploadGame() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [date, setDate] = useState("");
    const [opponent, setOpponent] = useState("");
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={Images.profileIcon} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>

                    <Pressable style={styles.headerIconBtn}>
                        <Icon name="sliders" size={18} color="#fff" />
                    </Pressable>
                </View>

                {/* SHEET */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    {/* top row */}
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Upload Game</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    {/* upload box */}
                    <View style={styles.uploadBox}>
                        <View style={styles.uploadIconWrap}>
                            <Icon name="upload" size={22} color="#000" />
                        </View>

                        <Text style={styles.uploadTitle}>Select from Gallery</Text>
                        <Text style={styles.uploadSub}>
                            tap the button below to upload a video file{"\n"}from your phone
                        </Text>

                        <Pressable style={styles.uploadBtn}>
                            <Text style={styles.uploadBtnText}>upload video</Text>
                        </Pressable>
                    </View>

                    {/* inputs */}
                    <View style={styles.field}>
                        <Text style={styles.label}>Date</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                value={date}
                                onChangeText={setDate}
                                placeholder=""
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                style={styles.input}
                            />
                            <Pressable style={styles.trailingIcon}>
                                <Icon name="calendar" size={16} color="#fff" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Opponent</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                value={opponent}
                                onChangeText={setOpponent}
                                placeholder=""
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Player(s)</Text>
                        <View style={styles.inputWrap}>
                            <TextInput
                                value={p1}
                                onChangeText={setP1}
                                placeholder=""
                                placeholderTextColor="rgba(255,255,255,0.35)"
                                style={styles.input}
                            />
                        </View>
                    </View>

                    {/* next */}
                    <Pressable style={styles.nextBtn} onPress={() => navigation.navigate("UploadingGame")}>
                        <Text style={styles.nextText}>NEXT</Text>
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
    screenOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    /* header */
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },
    headerIconBtn: {
        width: 34,
        height: 34,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },

    /* sheet */
    sheet: {
        flex: 1,
        marginHorizontal: 14,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.55)",
        padding: 12,
        overflow: "hidden",
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 6,
        paddingTop: 2,
        paddingBottom: 10,
    },
    backBtn: { width: 34, height: 28, alignItems: "center", justifyContent: "center" },
    topTitle: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },

    uploadBox: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        backgroundColor: "rgba(0,0,0,0.35)",
        paddingVertical: 16,
        paddingHorizontal: 14,
        alignItems: "center",
        marginBottom: 14,
    },
    uploadIconWrap: {
        width: 46,
        height: 46,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    uploadTitle: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Bold", marginBottom: 6 },
    uploadSub: { color: "rgba(255,255,255,0.65)", fontSize: 9, fontFamily: "Montserrat-Regular", textAlign: "center" },

    uploadBtn: {
        marginTop: 10,
        height: 28,
        paddingHorizontal: 18,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.45)",
        alignItems: "center",
        justifyContent: "center",
    },
    uploadBtnText: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Bold" },

    field: { marginBottom: 10 },
    label: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Regular", marginBottom: 6 },

    inputWrap: {
        height: 36,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,30,30,0.55)",
        backgroundColor: "rgba(0,0,0,0.55)",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
        height: "100%",
    },
    trailingIcon: { width: 28, height: 28, alignItems: "center", justifyContent: "center" },

    nextBtn: {
        marginTop: 8,
        alignSelf: "center",
        width: Math.min(210, width * 0.62),
        height: 40,
        borderRadius: 8,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    nextText: { color: "#000", fontSize: 14, fontFamily: "Montserrat-Bold" },
});
