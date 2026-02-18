// src/screens/PlayerParent/ClipsPreview.tsx  (NEW FILE)

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Image,
    Platform,
    Dimensions,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const { height } = Dimensions.get("window");

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function ClipsPreview() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
                </View>

                {/* CARD */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP, height: height * 0.73 }]}>
                    <View style={styles.sheetHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.sheetTitle}>Clips</Text>

                        <Pressable onPress={() => navigation.navigate("UploadShare")}>
                            <Icon name="upload" size={22} color="#fff" />
                        </Pressable>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.cardContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <Text style={styles.previewTitle}>Preview</Text>

                        <View style={styles.videoBox}>
                            <Pressable style={styles.playBtn}>
                                <Icon name="play" size={20} color="#000" />
                            </Pressable>
                        </View>

                        <View style={styles.metaRow}>
                            <Text style={styles.videoName}>Video Name</Text>
                            <Text style={styles.videoTime}>00:15:00</Text>
                        </View>

                        <Pressable
                            style={styles.primaryOutlineBtn}
                            onPress={() => navigation.navigate("ClipsEditor")}
                        >
                            <Text style={styles.primaryOutlineText}>Edit Manually</Text>
                        </Pressable>

                        <View style={styles.twoBtnsRow}>
                            <Pressable style={[styles.smallOutlineBtn, { flex: 1 }]} onPress={() => navigation.navigate("UploadShare")}>
                                <Text style={styles.smallOutlineText}>Share</Text>
                            </Pressable>

                            <Pressable style={[styles.smallOutlineBtn, { flex: 1 }]} onPress={() => navigation.navigate("Share")}>
                                <Text style={styles.smallOutlineText}>Save</Text>
                            </Pressable>
                        </View>

                        <View style={{ height: 8 }} />
                    </ScrollView>
                </View>

                {/* FOOTER */}
                <BottomTabs active="home" />
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
        backgroundColor: "#000",
        overflow: "hidden",
    },

    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    sheetTitle: { color: "#fff", fontSize: 26, fontFamily: "Montserrat-Bold" },

    cardContent: { paddingTop: 6, paddingBottom: 10 },

    previewTitle: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
        marginBottom: 14,
    },

    videoBox: {
        height: 210,
        borderRadius: 14,
        backgroundColor: "#B70003",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginHorizontal: 10,
    },

    playBtn: {
        width: 72,
        height: 72,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },

    metaRow: {
        marginTop: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    videoName: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Bold" },
    videoTime: { color: "#fff", fontSize: 12, fontFamily: "Montserrat-Bold" },

    primaryOutlineBtn: {
        marginTop: 18,
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    primaryOutlineText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },

    twoBtnsRow: {
        marginTop: 14,
        flexDirection: "row",
        gap: 14,
    },

    smallOutlineBtn: {
        height: 46,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.25)",
    },
    smallOutlineText: { color: "#fff", fontSize: 16, fontFamily: "Montserrat-Bold" },
});
