import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform, ScrollView } from "react-native";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";

const BODY =
    "Lorem Ipsum Quia Dolor Sit Porro Quisquam Est Qui Amet Consectetur Adipisci, Sed Quia Duis Aut Iure Dolor In Reprehenderit Dolore Magna Aliqua. Porro Quisquam Est Qui Nisi Ut Aliquid Ex Ea Commodi. Culpa Quia Officia Deserunt Ex Mollit Anim Id Est Laborum.However, Modern Generators Let You Add Personality To Your Placeholder Text While Maintaining The Same Benefits. From Pirate Speak To Cupcake Ingredients, These Specialized Generators Help Your Mockups Feel More Aligned With Your Brand’s Tone And Industry. Here Are Some Creative Alternatives:Lorem Ipsum Quia Dolor Sit Porro Quisquam Est Qui Amet Consectetur Adipisci, Sed Quia Duis Aut Iure Dolor In Reprehenderit Dolore Magna Aliqua. Porro Quisquam Est Qui Nisi Ut Aliquid Ex Ea Commodi. Culpa Quia Officia Deserunt Ex Mollit Anim Id Est Laborum.Lorem Ipsum Quia Dolor Sit Porro Quisquam Est Qui Amet Consectetur Adipisci, Sed Quia Duis Aut Iure Dolor In Reprehenderit Dolore Magna Aliqua.";

export default function PrivacyPolicy() {
    const navigation = useNavigation();

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
                            <Text style={styles.body}>{BODY}</Text>
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
        borderWidth: 2,
        borderColor: "#E8130D",
        backgroundColor: "rgba(0,0,0,0.60)",
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 18,
    },

    title: { color: "#E8130D", fontSize: 34, fontFamily: "Montserrat-Bold", textAlign: "center", marginBottom: 12 },

    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 12 },

    body: { color: "#fff", fontSize: 15, fontFamily: "Montserrat-SemiBold", lineHeight: 22, textAlign: "center" },

    btn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
    },
    btnText: { color: "#fff", fontSize: 24, fontWeight: "500" },
});
