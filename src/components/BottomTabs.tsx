import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootStackNavigator";

type Props = {
    active?: "home" | "settings" | "profile" | null;
};

export default function BottomTabs({ active = "home" }: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.navigate("PlayerParentHome")}>
                <Icon name="home" size={28} color={active === "home" ? "#ff1e1e" : "#fff"} />
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Settings")}>
                <Icon name="settings" size={28} color={active === "settings" ? "#ff1e1e" : "#fff"} />
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Profile")}>
                <Icon name="user" size={28} color={active === "profile" ? "#ff1e1e" : "#fff"} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 24 : 14,
        left: 14,
        right: 14,
        height: 57,
        borderRadius: 50,
        backgroundColor: "#000",
        borderWidth: 1,
        borderColor: "#ff1e1e",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
