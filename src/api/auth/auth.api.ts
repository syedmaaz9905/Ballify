import apiClient from "../apiClient";

export type SignupBody = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    language: string;
    role: string;
    profilePicture?: string;
    isPushNotificationEnabled?: boolean;
};

export type LoginBody = {
    email: string;
    password: string;
    keepMeLoggedIn?: boolean;
};

export type ForgotPasswordBody = {
    email: string;
};

export type ChangePasswordBody = {
    oldPassword: string;
    newPassword: string;
};

export const signupUser = (data: SignupBody) =>
    apiClient.post("/auth/signup", data);

export const loginUser = (data: LoginBody) =>
    apiClient.post("/auth/login", data);

export const forgotPassword = (data: ForgotPasswordBody) =>
    apiClient.post("/auth/forgot-password", data);

export const changePassword = (data: ChangePasswordBody) =>
    apiClient.post("/auth/change-password", data);