import AsyncStorage from "@react-native-async-storage/async-storage";

export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const USER_INFO = "USER_INFO";

export const ONBOARDING_SEEN = "ONBOARDING_SEEN";

export const getOnboardingSeen = async (): Promise<boolean> => {
    try {
        const value = await AsyncStorage.getItem(ONBOARDING_SEEN);
        return value === "true";
    } catch (error) {
        console.error("Failed to get onboarding flag:", error);
        return false;
    }
};

export const setOnboardingSeen = async () => {
    try {
        await AsyncStorage.setItem(ONBOARDING_SEEN, "true");
    } catch (error) {
        console.error("Failed to set onboarding flag:", error);
    }
};

export const getAccessToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(ACCESS_TOKEN);
    } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
    }
};

export const getUserData = async () => {
    try {
        const raw = await AsyncStorage.getItem(USER_INFO);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Failed to get user data:", error);
        return null;
    }
};

export const isLoggedIn = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return !!token;
};

export const setAuth = async (opts: {
    accessToken?: string | null;
    user?: any;
}) => {
    try {
        const { accessToken, user } = opts;

        if (accessToken) {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        }

        if (user) {
            await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
        }
    } catch (error) {
        console.error("Failed to set auth data:", error);
    }
};

export const clearAuth = async () => {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN);
        await AsyncStorage.removeItem(USER_INFO);
    } catch (error) {
        console.error("Failed to clear auth data:", error);
    }
};

export const persistAuthResponse = async (resp: any) => {
    const accessToken = resp?.access_token ?? null;
    const user = resp?.user ?? null;

    await setAuth({ accessToken, user });
};