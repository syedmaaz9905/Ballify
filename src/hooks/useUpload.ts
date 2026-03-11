import { useCallback, useState } from "react";
import {
    uploadNormalFile,
    initiateMultipartUpload,
    getMultipartPresignedUrl,
    completeMultipartUpload,
    abortMultipartUpload,
    type NormalUploadBody,
    type InitiateMultipartUploadBody,
    type GetPresignedUrlBody,
    type CompleteMultipartUploadBody,
    type AbortMultipartUploadBody,
} from "../api/upload/upload.api";

export const useUpload = () => {
    const [loading, setLoading] = useState(false);

    const handleNormalUpload = useCallback(async (data: NormalUploadBody) => {
        setLoading(true);
        try {
            const res = await uploadNormalFile(data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInitiateMultipartUpload = useCallback(
        async (data: InitiateMultipartUploadBody) => {
            setLoading(true);
            try {
                const res = await initiateMultipartUpload(data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleGetMultipartPresignedUrl = useCallback(
        async (data: GetPresignedUrlBody) => {
            setLoading(true);
            try {
                const res = await getMultipartPresignedUrl(data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleCompleteMultipartUpload = useCallback(
        async (data: CompleteMultipartUploadBody) => {
            setLoading(true);
            try {
                const res = await completeMultipartUpload(data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleAbortMultipartUpload = useCallback(
        async (data: AbortMultipartUploadBody) => {
            setLoading(true);
            try {
                const res = await abortMultipartUpload(data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        loading,
        handleNormalUpload,
        handleInitiateMultipartUpload,
        handleGetMultipartPresignedUrl,
        handleCompleteMultipartUpload,
        handleAbortMultipartUpload,
    };
};