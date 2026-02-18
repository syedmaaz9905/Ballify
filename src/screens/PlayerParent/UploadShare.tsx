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
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import BottomTabs from "../../components/BottomTabs";

const { width, height } = Dimensions.get("window");

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function UploadShare() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
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
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.sheet, { marginBottom: TAB_GAP, height: height * 0.73 }]}>
                    {/* Sheet Header */}
                    <View style={styles.sheetHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.sheetTitle}>Ready To Share</Text>

                        <View style={{ width: 22 }} />
                    </View>

                    {/* Preview */}
                    <View style={styles.previewWrap}>
                        <Image source={Images.ShareBgImg} style={styles.preview} resizeMode="cover" />
                    </View>

                    {/* Share options */}
                    <View style={styles.shareRow}>
                        <ShareIcon img={Images.facebookIcon} sub="Facebook" />
                        <ShareIcon img={Images.instagramIcon} sub="Instagram" />
                        <ShareIcon img={Images.whatsappIcon} sub="Whatsapp" />
                        <ShareIcon img={Images.imoIcon} sub="Imo" />
                        <MoreIcon sub="More" />
                    </View>

                    {/* Done */}
                    <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
                        <Text style={styles.doneText}>Done</Text>
                    </Pressable>
                </View>

                <BottomTabs active={null} />
            </ImageBackground>
        </View>
    );
}

function ShareIcon({ img, sub }: { img: any; sub: string }) {
    return (
        <View style={styles.shareItem}>
            <View style={styles.shareCircle}>
                <Image source={img} style={styles.shareImg} resizeMode="contain" />
            </View>
            <Text style={styles.shareSub}>{sub}</Text>
        </View>
    );
}

function MoreIcon({ sub }: { sub: string }) {
    return (
        <View style={styles.shareItem}>
            <View style={styles.moreCircle}>
                <Icon name="more-horizontal" size={22} color="#fff" />
            </View>
            <Text style={styles.shareSub}>{sub}</Text>
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
        borderColor: "#FF0000",
        padding: 14,
        backgroundColor: "#222222",
    },

    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sheetTitle: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
    },

    previewWrap: {
        width: "100%",
        aspectRatio: 1,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: "#000",
        alignSelf: "center",
    },
    preview: { width: "100%", height: "100%" },

    shareRow: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 6,
    },

    shareItem: { alignItems: "center", width: (width - 14 * 2 - 14 * 2 - 12) / 5 },

    shareCircle: {
        width: 40,
        height: 40,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    shareImg: { width: 40, height: 40 },

    /* More button: radius 10px + blue bg */
    moreCircle: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#00D0FF",
        alignItems: "center",
        justifyContent: "center",
    },

    shareSub: {
        marginTop: 6,
        color: "#EAFCFF",
        fontSize: 9,
        fontFamily: "Montserrat-Regular",
    },

    doneBtn: {
        marginTop: "auto",
        height: 56,
        borderRadius: 16,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    doneText: { color: "#fff", fontSize: 18, fontFamily: "Montserrat-Bold" },
});
