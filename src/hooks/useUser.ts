import { useCallback, useState } from "react";
import {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    updateUserProfilePicture,
    toggleUserNotification,
    updateUserLanguage,
    type UpdateUserBody,
    type UpdateProfilePictureBody,
    type UpdateLanguageBody,
} from "../api/user/user.api";

export const useUser = () => {
    const [loading, setLoading] = useState(false);

    const handleGetAllUsers = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllUsers();
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleGetUserById = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const res = await getUserById(id);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateUserById = useCallback(async (id: string, data: UpdateUserBody) => {
        setLoading(true);
        try {
            const res = await updateUserById(id, data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteUserById = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const res = await deleteUserById(id);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateUserProfilePicture = useCallback(
        async (id: string, data: UpdateProfilePictureBody) => {
            setLoading(true);
            try {
                const res = await updateUserProfilePicture(id, data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const handleToggleUserNotification = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const res = await toggleUserNotification(id);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateUserLanguage = useCallback(
        async (id: string, data: UpdateLanguageBody) => {
            setLoading(true);
            try {
                const res = await updateUserLanguage(id, data);
                return res.data;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return {
        loading,
        handleGetAllUsers,
        handleGetUserById,
        handleUpdateUserById,
        handleDeleteUserById,
        handleUpdateUserProfilePicture,
        handleToggleUserNotification,
        handleUpdateUserLanguage,
    };
};