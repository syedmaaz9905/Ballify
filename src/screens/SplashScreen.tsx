import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Dimensions,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackNavigator";
import { Images } from "../assets";
import { getAccessToken, getOnboardingSeen, getUserData } from "../hooks/useAuthStorage";

export default function SplashScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const run = async () => {
            const seen = await getOnboardingSeen();
            const token = await getAccessToken();
            const user = await getUserData();
            const role = user?.role;

            setTimeout(() => {
                let nextRoute: keyof RootStackParamList = "Onboarding";

                if (!seen) {
                    nextRoute = "Onboarding";
                } else if (token) {
                    nextRoute = role === "coach" ? "CoachHome" : "PlayerParentHome";
                } else {
                    nextRoute = "Login";
                }

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: nextRoute }],
                    })
                );
            }, 1500);
        };

        run();
    }, [navigation]);

    return (
        <View style={styles.root}>
            <ImageBackground
                source={Images.splashBg}
                style={styles.bg}
                resizeMode="cover"
            >
                <View style={styles.overlay} />

                <View style={styles.center}>
                    <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
                </View>
            </ImageBackground>
        </View>
    );
}

const { width } = Dimensions.get("window");
const logoSize = Math.min(320, Math.max(200, width * 0.55));

const styles = StyleSheet.create({
    root: { flex: 1 },
    bg: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    logo: {
        width: logoSize,
        height: logoSize,
    },
});