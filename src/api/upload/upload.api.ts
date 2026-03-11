import apiClient from "../apiClient";

export type NormalUploadBody = {
    fileName: string;
    contentType: string;
    fileContent: string;
    folderPath: string;
};

export type InitiateMultipartUploadBody = {
    fileName: string;
    contentType: string;
    folderPath: string;
};

export type GetPresignedUrlBody = {
    key: string;
    uploadId: string;
    partNumber: number;
};

export type CompleteMultipartUploadBody = {
    key: string;
    uploadId: string;
    parts: {
        partNumber: number;
        etag: string;
    }[];
};

export type AbortMultipartUploadBody = {
    key: string;
    uploadId: string;
};

export const uploadNormalFile = (data: NormalUploadBody) =>
    apiClient.post("/upload/normal", data);

export const initiateMultipartUpload = (data: InitiateMultipartUploadBody) =>
    apiClient.post("/upload/multipart/initiate", data);

export const getMultipartPresignedUrl = (data: GetPresignedUrlBody) =>
    apiClient.post("/upload/multipart/presigned-url", data);

export const completeMultipartUpload = (data: CompleteMultipartUploadBody) =>
    apiClient.post("/upload/multipart/complete", data);

export const abortMultipartUpload = (data: AbortMultipartUploadBody) =>
    apiClient.post("/upload/multipart/abort", data);