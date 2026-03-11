import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    Image,
    Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { launchImageLibrary } from "react-native-image-picker";
import { Images } from "../../assets";
import BottomTabs from "../../components/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";
import { getUserData, setAuth } from "../../hooks/useAuthStorage";
import { useUpload } from "../../hooks/useUpload";
import { useUser } from "../../hooks/useUser";

const TAB_H = 57;
const TAB_BOTTOM = Platform.OS === "ios" ? 24 : 14;
const TAB_GAP = TAB_H + TAB_BOTTOM + 16;

export default function EditProfile() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { handleNormalUpload, loading: uploadLoading } = useUpload();
    const { handleUpdateUserProfilePicture, loading: userLoading } = useUser();

    const [userId, setUserId] = useState("");
    const [profilePreview, setProfilePreview] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [currentUser, setCurrentUser] = useState<any>(null);

    const loading = uploadLoading || userLoading;

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await getUserData();
            setCurrentUser(storedUser);
            setUserId(storedUser?.id || "");

            if (storedUser?.profilePicture && storedUser.profilePicture !== "string") {
                setProfilePreview(storedUser.profilePicture);
                setUploadedUrl(storedUser.profilePicture);
            }
        };

        loadUser();
    }, []);

    const handlePickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: "photo",
                includeBase64: true,
                quality: 0.8,
                selectionLimit: 1,
            });

            if (result.didCancel) return;

            const asset = result.assets?.[0];

            if (!asset?.base64 || !asset?.fileName || !asset?.type) {
                Alert.alert("Error", "Could not read selected image.");
                return;
            }

            if (asset.uri) {
                setProfilePreview(asset.uri);
            }

            const uploadRes = await handleNormalUpload({
                fileName: asset.fileName,
                contentType: asset.type,
                fileContent: asset.base64,
                folderPath: "profile-pictures",
            });

            setUploadedUrl(uploadRes?.url || "");
        } catch (error: any) {
            console.log("EDIT_PROFILE_UPLOAD_ERROR:", error?.response?.data || error);
            Alert.alert("Error", "Failed to upload image.");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            if (!userId) {
                Alert.alert("Error", "User not found.");
                return;
            }

            if (!uploadedUrl) {
                Alert.alert("Validation", "Please upload a profile photo first.");
                return;
            }

            const updatedUser = await handleUpdateUserProfilePicture(userId, {
                url: uploadedUrl,
            });

            await setAuth({
                user: updatedUser,
            });

            Alert.alert("Success", "Profile picture updated successfully.");
            navigation.goBack();
        } catch (error: any) {
            console.log("EDIT_PROFILE_UPDATE_ERROR:", error?.response?.data || error);
            Alert.alert(
                "Update Failed",
                error?.response?.data?.message || "Something went wrong."
            );
        }
    };

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
                                {profilePreview ? (
                                    <Image source={{ uri: profilePreview }} style={styles.avatar} resizeMode="cover" />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Icon name="user" size={26} color="rgba(255,255,255,0.8)" />
                                    </View>
                                )}
                            </View>

                            <Pressable
                                style={[styles.uploadBtn, loading && styles.disabledBtn]}
                                onPress={handlePickImage}
                                disabled={loading}
                            >
                                <Icon name="upload" size={16} color="#fff" />
                                <Text style={styles.uploadText}>
                                    {uploadLoading ? "Uploading..." : "Upload"}
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.hintBox}>
                            <Text style={styles.hintText}>
                                Choose image from gallery, upload it, then press update.
                            </Text>
                        </View>

                        <Pressable
                            style={[styles.primaryBtn, loading && styles.disabledBtn]}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            <Text style={styles.primaryBtnText}>
                                {userLoading ? "Updating..." : "Update"}
                            </Text>
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

    disabledBtn: {
        opacity: 0.6,
    },
});