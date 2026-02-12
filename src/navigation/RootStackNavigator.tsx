import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PlayerParentHome from "../screens/PlayerParent/PlayerParentHome";
import Share from "../screens/PlayerParent/Share";
import Settings from "../screens/PlayerParent/Settings";
import Profile from "../screens/PlayerParent/Profile";
import CoachHome from "../screens/Coach/CoachHome";
import AboutUs from "../screens/PlayerParent/AboutUs";
import PrivacyPolicy from "../screens/PlayerParent/PrivacyPolicy";
import CoachPlayers from "../screens/Coach/CoachPlayers";
import SelectedPlayerProfile from "../screens/Coach/SelectedPlayerProfile";
import ChooseRoleScreen from "../screens/Auth/ChooseRoleScreen";

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Signup: undefined;
    Onboarding: undefined;
    ChooseRole: undefined;

    PlayerParentHome: undefined;
    CoachHome: undefined;
    Share: undefined;
    Settings: undefined;
    Profile: undefined;
    AboutUs: undefined;
    PrivacyPolicy: undefined;

    CoachPlayers: undefined;
    SelectedPlayerProfile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />

            <Stack.Screen name="PlayerParentHome" component={PlayerParentHome} />
            <Stack.Screen name="Share" component={Share} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />

            <Stack.Screen name="CoachHome" component={CoachHome} />
            <Stack.Screen name="CoachPlayers" component={CoachPlayers} />
            <Stack.Screen name="SelectedPlayerProfile" component={SelectedPlayerProfile} />
        </Stack.Navigator>
    );
}
