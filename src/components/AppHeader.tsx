import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Images } from "../assets";
import { getAccessToken, getUserData } from "../hooks/useAuthStorage";
import { useUser } from "../hooks/useUser";

export default function AppHeader() {
    const { handleGetUserById } = useUser();
    const [userName, setUserName] = useState("User");
    const [profilePicture, setProfilePicture] = useState<string>("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await getUserData();
                const userId = storedUser?.id;

                if (!userId) return;

                const res = await handleGetUserById(userId);
                console.log(res)

                const fullName = `${res?.firstName ?? ""} ${res?.lastName ?? ""}`.trim();
                setUserName(fullName || "User");
                setProfilePicture(res?.profilePicture || "");
            } catch (error) {
                console.log("HEADER_USER_ERROR:", error);
            }
        };

        loadUser();
    }, [handleGetUserById]);

    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View>
                    <Image
                        source={
                            profilePicture && profilePicture !== "string"
                                ? { uri: profilePicture }
                                : Images.profileIcon
                        }
                        style={styles.profileImg}
                        resizeMode="cover"
                    />
                </View>

                <View>
                    <Text style={styles.greet}>Morning {userName}!</Text>
                    <Text style={styles.sub}>How Are You Doing Today?</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    profileImg: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
    },
    greet: {
        color: "#fff",
        fontSize: 20,
        fontFamily: "Montserrat-Bold",
    },
    sub: {
        color: "#999999",
        fontSize: 10,
        fontFamily: "Montserrat-Bold",
    },
});