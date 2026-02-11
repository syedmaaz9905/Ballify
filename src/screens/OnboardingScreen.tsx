// src/screens/OnboardingScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Images } from "../assets";
import type { RootStackParamList } from "../navigation/RootStackNavigator";

type Role = "player" | "coach";

export default function OnboardingScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [role, setRole] = useState<Role>("player");

    const handleContinue = () => {
        if (role === "coach") {
            navigation.replace("CoachHome");
        } else {
            navigation.replace("PlayerParentHome");
        }
    };

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg}>
                <View style={styles.overlay} />

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome</Text>

                    <Text style={styles.desc}>
                        Lorem Ipsum Quia Dolor Sit Porro Quisquam Est Qui Amet Consectetur
                        Adipisci, Sed Quia Duis Aut Iure Dolor In Reprehenderit Dolore Magna
                        Aliqua. Porro Quisquam Est Qui Nisi Ut Aliquid Ex Ea Commodi. Culpa
                        Quia Officia Deserunt Ex Mollit Anim Id Est Laborum.
                        {"\n\n"}
                        However, Modern Generators Let You Add Personality To Your
                        Placeholder Text While Maintaining The Same Benefits. From Pirate
                        Speak To Cupcake Ingredients, These Specialized Generators Help Your
                        Mockups Feel More Aligned With Your Brand’s Tone And Industry. Here
                        Are Some Creative Alternatives:
                    </Text>

                    <Text style={styles.desc}>
                        Choose how you want to continue
                    </Text>

                    {/* Toggle */}
                    <View style={styles.toggleWrap}>
                        <Pressable
                            style={[styles.toggleBtn, role === "player" && styles.active]}
                            onPress={() => setRole("player")}
                        >
                            <Text style={styles.toggleText}>Player / Parent</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.toggleBtn, role === "coach" && styles.active]}
                            onPress={() => setRole("coach")}
                        >
                            <Text style={styles.toggleText}>Coach</Text>
                        </Pressable>
                    </View>

                    <Pressable style={styles.btn} onPress={handleContinue}>
                        <Text style={styles.btnText}>Let’s Go</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1 },
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    title: {
        color: "#ff1e1e",
        fontSize: 34,
        fontWeight: "900",
    },
    desc: {
        color: "#fff",
        marginTop: 10,
        marginBottom: 30,
        opacity: 0.8,
    },
    toggleWrap: {
        width: "100%",
        gap: 14,
        marginBottom: 28,
    },
    toggleBtn: {
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    active: {
        backgroundColor: "#ff1e1e",
        borderColor: "#ff1e1e",
    },
    toggleText: {
        color: "#fff",
        fontWeight: "800",
        fontSize: 15,
    },
    btn: {
        width: "100%",
        height: 54,
        borderRadius: 14,
        backgroundColor: "#ff1e1e",
        alignItems: "center",
        justifyContent: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },
});
