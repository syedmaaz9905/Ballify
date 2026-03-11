import { useCallback, useState } from "react";
import {
    updateContent,
    getAboutUsContent,
    getPrivacyPolicyContent,
    type UpdateContentBody,
} from "../api/content/content.api";

export const useContent = () => {
    const [loading, setLoading] = useState(false);

    const handleUpdateContent = useCallback(async (data: UpdateContentBody) => {
        setLoading(true);
        try {
            const res = await updateContent(data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGetAboutUsContent = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAboutUsContent();
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGetPrivacyPolicyContent = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getPrivacyPolicyContent();
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        handleUpdateContent,
        handleGetAboutUsContent,
        handleGetPrivacyPolicyContent,
    };
};