// src/screens/OnboardingScreen.tsx  (REPLACE FULL FILE)
// ✅ removed the 2 role buttons, now only Continue -> ChooseRole screen
import React from "react";
import { View, Text, StyleSheet, Pressable, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Images } from "../assets";
import type { RootStackParamList } from "../navigation/RootStackNavigator";

export default function OnboardingScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.overlay} />

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome</Text>

                    <Text style={styles.desc}>
                        Lorem ipsum quia dolor sit porro quisquam est qui amet consectetur adipisci, sed quia duis aute irure dolor in reprehenderit dolore magna aliqua, porro quisquan est qui nisi ut aliquid ex ea commodo. Culpa quia officia deserunt mollit anim id est laborum."
                        {"\n"}
                        However, modern generators let you add personality to your placeholder text while maintaining the same benefits. From pirate speak to cupcake ingredients, these specialized generators help your mockups feel more aligned with your brand's tone and industry. Here are some creative alternatives:
                    </Text>

                    <Pressable style={styles.btn} onPress={() => navigation.navigate("ChooseRole")}>
                        <Text style={styles.btnText}>Let's Go</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    bg: { flex: 1 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: { color: "#E8130D", fontSize: 48, fontFamily: "Montserrat-Bold" },
    desc: { color: "#fff", marginTop: 30, marginBottom: 50, textAlign: 'center', fontSize: 15, fontFamily: "Montserrat-SemiBold" },
    btn: {
        width: "100%",
        height: 54,
        borderRadius: 14,
        backgroundColor: "#E8130D",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: { color: "#fff", fontSize: 24, fontFamily: "Montserrat-Medium" },
});
