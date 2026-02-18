// src/screens/PlayerParent/Clips.tsx  (REPLACE FULL FILE)

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image,
    Platform,
    TextInput,
    Dimensions,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const { height, width } = Dimensions.get("window");

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function Clips() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [duration, setDuration] = useState<"15" | "40">("15");
    const [quality, setQuality] = useState<"1080" | "720">("1080");
    const [title, setTitle] = useState("");

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER (same like other pages) */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image source={Images.profileIcon} style={{ width: 45, height: 45 }} resizeMode="contain" />
                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP, height: height * 0.73 }]}>
                    <View style={styles.sheetHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="x" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.sheetTitle}>Clips</Text>

                        <Pressable onPress={() => navigation.navigate("UploadShare")}>
                            <Icon name="upload" size={22} color="#fff" />
                        </Pressable>
                    </View>

                    {/* scrollable content inside card */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.cardContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.videoBox}>
                            <Pressable style={styles.playBtn}>
                                <Icon name="play" size={20} color="#000" />
                            </Pressable>
                        </View>

                        {/* name + time + divider exactly like screenshot */}
                        <View style={styles.metaRow}>
                            <Text style={styles.videoName}>Video Name</Text>
                            <Text style={styles.videoTime}>2:15:00</Text>
                        </View>
                        <View style={styles.dividerLine} />

                        {/* rows */}
                        <Row
                            label="Select Duration"
                            right={
                                <View style={styles.rightBox}>
                                    <RadioOption
                                        label="15 Sec"
                                        active={duration === "15"}
                                        onPress={() => setDuration("15")}
                                    />
                                    <RadioOption
                                        label="40 Sec"
                                        active={duration === "40"}
                                        onPress={() => setDuration("40")}
                                    />
                                </View>
                            }
                        />

                        <Row
                            label="Select Video Size"
                            right={
                                <View style={styles.rightBox}>
                                    <RadioOption
                                        label="1080px"
                                        active={quality === "1080"}
                                        onPress={() => setQuality("1080")}
                                    />
                                    <RadioOption
                                        label="720px"
                                        active={quality === "720"}
                                        onPress={() => setQuality("720")}
                                    />
                                </View>
                            }
                        />

                        <Row
                            label="Add Titles"
                            right={
                                <View style={styles.inputWrap}>
                                    <TextInput
                                        value={title}
                                        onChangeText={setTitle}
                                        placeholder=""
                                        placeholderTextColor="rgba(255,255,255,0.35)"
                                        style={styles.input}
                                    />
                                </View>
                            }
                        />

                        <Pressable style={styles.autoBtn} onPress={() => navigation.navigate("ClipsPreview")}>
                            <Text style={styles.autoBtnText}>Auto Generate Highlights</Text>
                        </Pressable>

                        <View style={{ height: 8 }} />
                    </ScrollView>
                </View>

                <BottomTabs active="home" />
            </ImageBackground>
        </View>
    );
}

function Row({ label, right }: { label: string; right: React.ReactNode }) {
    return (
        <View style={styles.formRow}>
            <Text style={styles.formLabel}>{label}</Text>
            {right}
        </View>
    );
}

function RadioOption({
    label,
    active,
    onPress,
}: {
    label: string;
    active?: boolean;
    onPress?: () => void;
}) {
    return (
        <Pressable onPress={onPress} style={styles.radioItem}>
            <View style={[styles.radioOuter, active && styles.radioOuterActive]}>
                {active ? <View style={styles.radioInner} /> : null}
            </View>
            <Text style={styles.radioText}>{label}</Text>
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
        marginHorizontal: 14,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        padding: 14,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        overflow: "hidden",
    },

    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    sheetTitle: { color: "#fff", fontSize: 26, fontFamily: "Montserrat-Bold" },

    cardContent: { paddingBottom: 10 },

    videoBox: {
        height: 170,
        borderRadius: 14,
        backgroundColor: "#B70003",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    playBtn: {
        width: 62,
        height: 62,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },

    metaRow: {
        marginTop: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 2,
    },
    videoName: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Bold" },
    videoTime: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Bold" },

    dividerLine: {
        marginTop: 10,
        height: 1,
        backgroundColor: "rgba(255,255,255,0.35)",
    },

    formRow: {
        marginTop: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
    },
    formLabel: {
        color: "#FFFFFF",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        width: 110,
    },

    rightBox: {
        flex: 1,
        maxWidth: 185,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    radioItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    radioOuter: {
        width: 16,
        height: 16,
        borderRadius: 999,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    radioOuterActive: { borderColor: "#ff1e1e" },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
    },
    radioText: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Regular" },

    inputWrap: {
        flex: 1,
        maxWidth: 185,
        borderWidth: 1,
        borderColor: "#ff1e1e",
        borderRadius: 8,
        backgroundColor: "rgba(0,0,0,0.35)",
        height: 40,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    input: {
        color: "#fff",
        fontSize: 12,
        fontFamily: "Montserrat-Regular",
        paddingVertical: 0,
    },

    autoBtn: {
        marginTop: 22,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FF0000",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },
    autoBtnText: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Bold" },
});
