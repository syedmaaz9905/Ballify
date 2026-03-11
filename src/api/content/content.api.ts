import apiClient from "../apiClient";

export type UpdateContentBody = {
    type: "about_us" | "privacy_policy";
    language: string;
    content: string;
};

export const updateContent = (data: UpdateContentBody) =>
    apiClient.put("/content", data);

export const getAboutUsContent = () =>
    apiClient.get("/content/about-us");

export const getPrivacyPolicyContent = () =>
    apiClient.get("/content/privacy-policy");