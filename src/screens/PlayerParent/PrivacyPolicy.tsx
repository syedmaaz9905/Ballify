import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Platform,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { useContent } from "../../hooks/useContent";

export default function PrivacyPolicy() {
    const navigation = useNavigation();

    const { loading, handleGetPrivacyPolicyContent } = useContent();
    const [body, setBody] = useState("");

    useEffect(() => {
        const loadContent = async () => {
            try {
                const res = await handleGetPrivacyPolicyContent();
                const resolvedContent = res?.content ?? res?.data?.content ?? res?.data ?? res ?? "";
                setBody(typeof resolvedContent === "string" ? resolvedContent : "");
            } catch (error) {
                console.log("PRIVACY POLICY ERROR:", error);
            }
        };

        loadContent();
    }, [handleGetPrivacyPolicyContent]);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={styles.centerWrap}>
                    <View style={styles.card}>
                        {/* FIXED HEADER */}
                        <Text style={styles.title}>Privacy Policy</Text>

                        {/* ONLY BODY SCROLLS */}
                        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                            {loading ? (
                                <ActivityIndicator color="#E8130D" style={{ marginTop: 20 }} />
                            ) : (
                                <Text style={styles.body}>{body}</Text>
                            )}
                        </ScrollView>

                        {/* FIXED BUTTON */}
                        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                            <Text style={styles.btnText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },
    screenOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.55)" },

    centerWrap: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 14,
        paddingTop: Platform.OS === "ios" ? 20 : 10,
        paddingBottom: Platform.OS === "ios" ? 24 : 16,
    },

    card: {
        height: "78%",
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "#FF0000",
        backgroundColor: "rgba(0,0,0,0.60)",
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 18,
    },

    title: { color: "#E8130D", fontSize: 34, fontFamily: "Montserrat-Bold", textAlign: "center", marginBottom: 12 },

    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 12 },

    body: { color: "#fff", fontSize: 14, fontFamily: 'Montserrat-SemiBold', textAlign: "center" },

    btn: {
        height: 54,
        borderRadius: 15,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
    },
    btnText: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Medium" },
});
