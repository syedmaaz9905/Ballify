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

export default function AboutUs() {
    const navigation = useNavigation();

    const { loading, handleGetAboutUsContent } = useContent();
    const [body, setBody] = useState("");

    useEffect(() => {
        const loadContent = async () => {
            try {
                const res = await handleGetAboutUsContent();
                const resolvedContent = res?.content ?? res?.data?.content ?? res?.data ?? res ?? "";
                setBody(typeof resolvedContent === "string" ? resolvedContent : "");
            } catch (error) {
                console.log("ABOUT US ERROR:", error);
            }
        };

        loadContent();
    }, [handleGetAboutUsContent]);

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={styles.centerWrap}>
                    <View style={styles.card}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardContent}>
                            <Text style={styles.title}>About Us</Text>
                            {loading ? (
                                <ActivityIndicator color="#E8130D" style={{ marginTop: 20 }} />
                            ) : (
                                <Text style={styles.body}>{body}</Text>
                            )}

                            <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                                <Text style={styles.btnText}>Back</Text>
                            </Pressable>
                        </ScrollView>
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
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
    },

    card: {
        borderRadius: 26,
        borderWidth: 1,
        borderColor: "#FF0000",
        backgroundColor: "rgba(0,0,0,0.60)",
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 18,
    },

    cardContent: { paddingBottom: 6 },
    title: { color: "#E8130D", fontSize: 38, fontFamily: "Montserrat-Bold", textAlign: "center", marginBottom: 12 },
    body: { color: "#fff", fontSize: 14, fontFamily: 'Montserrat-SemiBold', textAlign: "center" },

    btn: {
        height: 54,
        borderRadius: 15,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    btnText: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Medium" },
});
