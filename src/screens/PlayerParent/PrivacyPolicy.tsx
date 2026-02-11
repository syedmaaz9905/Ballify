// src/screens/PlayerParent/PrivacyPolicy.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform, ScrollView } from "react-native";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";

const BODY =
    "Lorem Ipsum Quia Dolor Sit Porro Quisquam Est Qui Amet Consectetur Adipisci, Sed Quia Duis Aut Iure Dolor In Reprehenderit Dolore Magna Aliqua. Porro Quisquam Est Qui Nisi Ut Aliquid Ex Ea Commodi. Culpa Quia Officia Deserunt Ex Mollit Anim Id Est Laborum.\n\nHowever, Modern Generators Let You Add Personality To Your Placeholder Text While Maintaining The Same Benefits. From Pirate Speak To Cupcake Ingredients, These Specialized Generators Help Your Mockups Feel More Aligned With Your Brand’s Tone And Industry. Here Are Some Creative Alternatives:";

export default function PrivacyPolicy() {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={styles.centerWrap}>
                    <View style={styles.card}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardContent}>
                            <Text style={styles.title}>Privacy Policy</Text>
                            <Text style={styles.body}>{BODY}</Text>

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
        borderWidth: 2,
        borderColor: "#ff1e1e",
        backgroundColor: "rgba(0,0,0,0.60)",
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 18,
    },

    cardContent: { paddingBottom: 6 },
    title: { color: "#ff1e1e", fontSize: 30, fontWeight: "900", textAlign: "center", marginBottom: 12 },
    body: { color: "#eaeaea", fontSize: 12, lineHeight: 18, textAlign: "center", opacity: 0.92 },

    btn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    btnText: { color: "#fff", fontSize: 15, fontWeight: "900" },
});
