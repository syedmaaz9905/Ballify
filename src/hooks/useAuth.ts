import { useCallback, useState } from "react";
import {
    signupUser,
    loginUser,
    forgotPassword,
    changePassword,
    type SignupBody,
    type LoginBody,
    type ChangePasswordBody,
} from "../api/auth/auth.api";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);

    const handleSignup = useCallback(async (data: SignupBody) => {
        setLoading(true);
        try {
            const res = await signupUser(data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogin = useCallback(async (data: LoginBody) => {
        setLoading(true);
        try {
            const res = await loginUser(data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleForgotPassword = useCallback(async (email: string) => {
        setLoading(true);
        try {
            const res = await forgotPassword({ email });
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    const handleChangePassword = useCallback(async (data: ChangePasswordBody) => {
        setLoading(true);
        try {
            const res = await changePassword(data);
            return res.data;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        handleSignup,
        handleLogin,
        handleForgotPassword,
        handleChangePassword,
    };
};