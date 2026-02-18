import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
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

export default function UploadingGame() {
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

                    <Pressable style={styles.headerIconBtn}>
                        <Icon name="sliders" size={18} color="#fff" />
                    </Pressable>
                </View>

                {/* SHEET */}
                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.topTitle}>Uploading</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.center}>
                        <Text style={styles.processing}>Processing... 75%</Text>
                        <Text style={styles.note}>
                            Our AI is analyzing the action. This may{"\n"}take a few moments...
                        </Text>

                        <View style={styles.progressTrack}>
                            <View style={styles.progressFill} />
                        </View>

                        <Text style={styles.smallLabel}>Uploading Video</Text>

                        <Pressable style={styles.cancelBtn}>
                            <Icon name="x" size={22} color="#000" />
                        </Pressable>

                        <Pressable
                            style={styles.nextBtn}
                            onPress={() => navigation.navigate("UploadGameOptions")}
                        >
                            <Text style={styles.nextText}>NEXT</Text>
                        </Pressable>
                    </View>
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
    topTitle: { color: "#fff", fontSize: 18, fontFamily: "Montserrat-Bold" },

    center: { flex: 1, alignItems: "center", paddingTop: 24 },
    processing: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold", marginBottom: 10 },
    note: { color: "#FF0000", fontSize: 12, fontFamily: "Montserrat-Regular", textAlign: "center", marginBottom: 18 },

    progressTrack: {
        width: "90%",
        height: 8,
        borderRadius: 99,
        backgroundColor: "#890000",
        overflow: "hidden",
        marginBottom: 10,
    },
    progressFill: {
        width: "75%",
        height: "100%",
        backgroundColor: "#FF0000",
        borderRadius: 99,
    },

    smallLabel: { color: "#FF0000", fontSize: 12, fontFamily: "Montserrat-Regular", marginBottom: 18 },

    cancelBtn: {
        width: 48,
        height: 48,
        borderRadius: 999,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },

    nextBtn: {
        marginTop: "auto",
        marginBottom: 10,
        width: Math.min(210, width * 0.62),
        height: 40,
        borderRadius: 8,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    nextText: { color: "#000", fontSize: 18, fontFamily: "Montserrat-Bold" },
});
