import apiClient from "../apiClient";

export type UpdateUserBody = {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    language?: string;
    role?: string;
    profilePicture?: string;
    isPushNotificationEnabled?: boolean;
};

export type UpdateProfilePictureBody = {
    url: string;
};

export type UpdateLanguageBody = {
    language: string;
};

export const getAllUsers = () => apiClient.get("/users");

export const getUserById = (id: string) => apiClient.get(`/users/${id}`);

export const updateUserById = (id: string, data: UpdateUserBody) =>
    apiClient.patch(`/users/${id}`, data);

export const deleteUserById = (id: string) =>
    apiClient.delete(`/users/${id}`);

export const updateUserProfilePicture = (
    id: string,
    data: UpdateProfilePictureBody
) => apiClient.patch(`/users/${id}/profile-picture`, data);

export const toggleUserNotification = (id: string) =>
    apiClient.patch(`/users/${id}/toggle-notification`);

export const updateUserLanguage = (id: string, data: UpdateLanguageBody) =>
    apiClient.patch(`/users/${id}/language`, data);