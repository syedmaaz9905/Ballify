import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/RootStackNavigator";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = Math.min(110, width * 0.28);

export default function PlayerParentHome() {

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.avatar}>
                            <Icon name="user" size={20} color="#fff" />
                        </View>
                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>

                    <Pressable>
                        <Icon
                            name="sliders"
                            size={30}
                            color="#fff"
                            style={{ transform: [{ rotate: "90deg" }] }}
                        />
                    </Pressable>
                </View>

                {/* BODY */}
                <View style={styles.body}>
                    <ActionCard title="Record" bg={Images.RecordBgImg} />
                    <ActionCard title="Clips" bg={Images.ClipsBgImg} />
                    <ActionCard
                        title="Share"
                        bg={Images.ShareBgImg}
                        onPress={() => navigation.navigate("Share")}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

/* CARD */
function ActionCard({
    title,
    bg,
    onPress,
}: {
    title: string;
    bg: any;
    onPress?: () => void;
}) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <ImageBackground source={bg} style={styles.cardBg} resizeMode="cover">
                <View style={styles.cardOverlay} />
                <Text style={styles.cardText}>{title}</Text>
            </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#000" },
    bg: { flex: 1 },

    screenOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.55)",
    },

    /* HEADER */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    greet: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "800",
    },
    sub: {
        color: "#cfcfcf",
        fontSize: 12,
        marginTop: 2,
    },

    /* BODY */
    body: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 16,
    },

    card: {
        height: CARD_HEIGHT,
        borderRadius: 16,
        overflow: "hidden",
    },
    cardBg: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    cardOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "#B70003",
        opacity: 0.6,
    },
    cardText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "900",
        letterSpacing: 0.5,
    },
});
