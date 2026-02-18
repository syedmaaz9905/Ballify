import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    FlatList,
    Image,
    Pressable,
    Platform,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Images } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import BottomTabs from "../../components/BottomTabs";

const DATA = Array.from({ length: 15 }).map((_, i) => ({
    id: i.toString(),
    img: Images.ShareBgImg,
    duration: i % 3 === 0 ? "0:13" : i % 3 === 1 ? "1:37" : "2:29",
}));

const TAB_HEIGHT = 70;
const { height } = Dimensions.get("window");

export default function Share() {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.root}>
            <ImageBackground source={Images.splashBg} style={styles.bg} resizeMode="cover">
                <View style={styles.screenOverlay} />

                {/* HEADER */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View>
                            <Image
                                source={Images.profileIcon}
                                style={{ width: 45, height: 45 }}
                                resizeMode="contain"
                            />
                        </View>

                        <View>
                            <Text style={styles.greet}>Morning SAM!</Text>
                            <Text style={styles.sub}>How Are You Doing Today?</Text>
                        </View>
                    </View>
                </View>

                {/* SHARE CARD */}
                <View style={styles.sheet}>
                    {/* Sheet Header */}
                    <View style={styles.sheetHeader}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon name="x" size={22} color="#fff" />
                        </Pressable>

                        <Text style={styles.sheetTitle}>Share</Text>

                        <Pressable onPress={() => navigation.navigate("UploadShare")}>
                            <Icon name="upload" size={22} color="#fff" />
                        </Pressable>
                    </View>

                    {/* GRID (CONTROLLED HEIGHT) */}
                    <FlatList
                        data={DATA}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        columnWrapperStyle={styles.column}
                        showsVerticalScrollIndicator={false}
                        style={styles.grid}
                        ListFooterComponent={<View style={{ height: 12 }} />}
                        renderItem={({ item }) => (
                            <View style={styles.thumbWrap}>
                                <Image source={item.img} style={styles.thumb} />
                                <View style={styles.duration}>
                                    <Text style={styles.durationText}>{item.duration}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>

                {/* BOTTOM TABS */}
                <BottomTabs active={null} />
            </ImageBackground>
        </View>
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
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    greet: { color: "#fff", fontSize: 20, fontFamily: "Montserrat-Bold" },
    sub: { color: "#999999", fontSize: 10, fontFamily: "Montserrat-Bold" },

    /* SHARE CARD */
    sheet: {
        marginHorizontal: 14,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: "#ff1e1e",
        padding: 14,
        height: height * 0.73,
        backgroundColor: "#000",
    },
    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    sheetTitle: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "900",
    },

    /* GRID */
    grid: {
        flexGrow: 0,
    },
    column: {
        gap: 10,
        marginBottom: 10,
    },
    thumbWrap: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    thumb: { width: "100%", height: "100%" },
    duration: {
        position: "absolute",
        bottom: 6,
        right: 6,
        backgroundColor: "rgba(0,0,0,0.7)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    durationText: { color: "#fff", fontSize: 10, fontFamily: "Montserrat-Bold", },

    /* BOTTOM TABS */
    bottomTabs: {
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
