import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignupScreen from "../screens/Auth/SignupScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import PlayerParentHome from "../screens/PlayerParent/PlayerParentHome";
import Record from "../screens/PlayerParent/Record";
import Clips from "../screens/PlayerParent/Clips";
import Share from "../screens/PlayerParent/Share";
import ClipsPreview from "../screens/PlayerParent/ClipsPreview";
import ClipsEditor from "../screens/PlayerParent/ClipsEditor";
import Settings from "../screens/PlayerParent/Settings";
import Profile from "../screens/PlayerParent/Profile";
import CoachHome from "../screens/Coach/CoachHome";
import TeamStatus from "../screens/Coach/TeamStatus";
import UploadGame from "../screens/Coach/UploadGame";
import AboutUs from "../screens/PlayerParent/AboutUs";
import PrivacyPolicy from "../screens/PlayerParent/PrivacyPolicy";
import CoachPlayers from "../screens/Coach/CoachPlayers";
import SelectedPlayerProfile from "../screens/Coach/SelectedPlayerProfile";
import ChooseRoleScreen from "../screens/Auth/ChooseRoleScreen";
import EditProfile from "../screens/PlayerParent/EditProfile";
import ChangePassword from "../screens/PlayerParent/ChangePassword";
import PaymentMethod from "../screens/PlayerParent/PaymentMethod";
import LanguageScreen from "../screens/PlayerParent/LanguageScreen";
import UploadShare from "../screens/PlayerParent/UploadShare";
import UploadingGame from "../screens/Coach/UploadingGame";
import UploadGameOptions from "../screens/Coach/UploadGameOptions";
import AutoHighlights from "../screens/Coach/AutoHighlights";
import ReadyToShare from "../screens/Coach/ReadyToShare";
import Reel from "../screens/Coach/Reel";

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    Signup: undefined;
    Onboarding: undefined;
    ChooseRole: undefined;

    PlayerParentHome: undefined;
    CoachHome: undefined;
    Record: undefined;
    Clips: undefined;
    Share: undefined;
    ClipsPreview: undefined;
    ClipsEditor: undefined;
    UploadShare: undefined;
    Settings: undefined;
    Profile: undefined;
    AboutUs: undefined;
    PrivacyPolicy: undefined;
    EditProfile: undefined;
    ChangePassword: undefined;
    PaymentMethod: undefined;
    LanguageScreen: undefined;

    CoachPlayers: undefined;
    SelectedPlayerProfile: undefined;
    TeamStatus: undefined;
    UploadGame: undefined;
    UploadingGame: undefined;
    UploadGameOptions: undefined;
    AutoHighlights: undefined;
    ReadyToShare: undefined;
    Reel: undefined;
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
            <Stack.Screen name="Record" component={Record} />
            <Stack.Screen name="Clips" component={Clips} />
            <Stack.Screen name="Share" component={Share} />
            <Stack.Screen name="ClipsPreview" component={ClipsPreview} />
            <Stack.Screen name="ClipsEditor" component={ClipsEditor} />
            <Stack.Screen name="UploadShare" component={UploadShare} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
            <Stack.Screen name="LanguageScreen" component={LanguageScreen} />

            <Stack.Screen name="CoachHome" component={CoachHome} />
            <Stack.Screen name="CoachPlayers" component={CoachPlayers} />
            <Stack.Screen name="SelectedPlayerProfile" component={SelectedPlayerProfile} />
            <Stack.Screen name="TeamStatus" component={TeamStatus} />
            <Stack.Screen name="UploadGame" component={UploadGame} />
            <Stack.Screen name="UploadingGame" component={UploadingGame} />
            <Stack.Screen name="UploadGameOptions" component={UploadGameOptions} />
            <Stack.Screen name="AutoHighlights" component={AutoHighlights} />
            <Stack.Screen name="ReadyToShare" component={ReadyToShare} />
            <Stack.Screen name="Reel" component={Reel} />
        </Stack.Navigator>
    );
}
