import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
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

export default function EditProfile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [hasPhoto, setHasPhoto] = useState(false);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={[styles.sheet, { marginBottom: TAB_GAP }]}>
                    <View style={styles.topRow}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.title}>Edit Profile</Text>
                        <View style={{ width: 22 }} />
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Profile Photo</Text>

                        <View style={styles.photoRow}>
                            <View style={styles.avatarWrap}>
                                {hasPhoto ? (
                                    <Image source={Images.profileIcon} style={styles.avatar} resizeMode="cover" />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Icon name="user" size={26} color="rgba(255,255,255,0.8)" />
                                    </View>
                                )}
                            </View>

                            <Pressable
                                style={styles.uploadBtn}
                                onPress={() => setHasPhoto(true)} // hook your image picker later
                            >
                                <Icon name="upload" size={16} color="#fff" />
                                <Text style={styles.uploadText}>Upload</Text>
                            </Pressable>
                        </View>

                        <View style={styles.hintBox}>
                            <Text style={styles.hintText}>
                                Upload option only. We’ll connect gallery/camera later.
                            </Text>
                        </View>

                        <Pressable style={styles.primaryBtn}>
                            <Text style={styles.primaryBtnText}>Update</Text>
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
    title: { color: "#fff", fontSize: 24, fontFamily: "Montserrat-Bold" },
    divider: { height: 1, backgroundColor: "rgba(255,255,255,0.18)" },

    content: { flex: 1, paddingHorizontal: 18, paddingTop: 16 },

    sectionTitle: {
        color: "#FF0004",
        fontSize: 18,
        fontFamily: "Montserrat-Bold",
        paddingTop: 8,
        paddingBottom: 10,
    },

    photoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.14)",
        paddingHorizontal: 14,
        backgroundColor: "rgba(255,255,255,0.04)",
    },

    avatarWrap: { width: 62, height: 62, borderRadius: 18, overflow: "hidden" },
    avatar: { width: "100%", height: "100%" },
    avatarPlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
    },

    uploadBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: "#ff1e1e",
    },
    uploadText: { color: "#fff", fontSize: 14, fontFamily: "Montserrat-Bold" },

    hintBox: {
        marginTop: 14,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.10)",
    },
    hintText: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontFamily: "Montserrat-Regular" },

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
