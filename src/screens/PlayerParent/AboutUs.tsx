// src/screens/PlayerParent/AboutUs.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground, Pressable, Platform, ScrollView } from "react-native";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";

const BODY =
    "Lorem ipsum quia dolor sit porro quisquam est qui amet consectetur adipisci, sed quia duis aute irure dolor in reprehenderit dolore magna aliqua, porro quisquan est qui nisi ut aliquid ex ea commodo. Culpa quia officia deserunt mollit anim id est laborum. However, modern generators let you add personality to your placeholder text while maintaining the same benefits. From pirate speak to cupcake ingredients, these specialized generators help your mockups feel more aligned with your brand's tone and industry. Here are some creative alternatives:";

export default function AboutUs() {
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                <View style={styles.centerWrap}>
                    <View style={styles.card}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardContent}>
                            <Text style={styles.title}>About Us</Text>
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
        borderColor: "#E8130D",
        backgroundColor: "rgba(0,0,0,0.60)",
        overflow: "hidden",
        paddingHorizontal: 18,
        paddingTop: 22,
        paddingBottom: 18,
    },

    cardContent: { paddingBottom: 6 },
    title: { color: "#E8130D", fontSize: 40, fontFamily: "Montserrat-Bold", textAlign: "center", marginBottom: 12 },
    body: { color: "#fff", fontSize: 15, fontWeight: '600', lineHeight: 22, textAlign: "center" },

    btn: {
        height: 54,
        borderRadius: 14,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },
    btnText: { color: "#fff", fontSize: 24, fontWeight: "500" },
});
