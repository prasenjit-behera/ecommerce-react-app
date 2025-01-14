import { create } from 'zustand';
import { loginUserService, registerUserService, fetchUsersService } from '../services/apiService';
import { showSuccessToast, showErrorToast } from '../utils/ToastService'; // Import toast service

interface User {
    id?: number;
    name?: string;
    email: string;
    avatar: string;
}

interface UserStore {
    user: User | null;
    userList: User[];
    isLoading: boolean;
    error: string | null;
    loginUser: (
        credentials: { email: string; password: string },
        onSuccess?: () => void
    ) => Promise<void>;
    registerUser: (
        userData: { name: string; email: string; password: string; avatar: string }
    ) => Promise<void>;
    fetchUserList: () => Promise<void>;
    resetError: () => void;
    logoutUser: () => void; 
}
export const useUserStore = create<UserStore>((set) => ({
    user: null,
    userList: [],
    isLoading: false,
    error: null,
    loginUser: async ({ email, password }, onSuccess) => {
        set({ isLoading: true, error: null });
        try {
            const { access_token } = await loginUserService({ email, password });
            set({ user: { email, avatar: '' }, isLoading: false });
            localStorage.setItem('token', access_token); // Store token locally
            showSuccessToast('Login successful!');
            if (onSuccess) onSuccess(); // Call the onSuccess callback
        } catch (err: any) {
            set({ error: err.message || 'Login failed', isLoading: false });
            showErrorToast('Login Failed');
        }
    },
    registerUser: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const user = await registerUserService(userData);
            showSuccessToast('Registration successful!');
            set({ user, isLoading: false });
        } catch (err: any) {
            showErrorToast(err.message || 'Registration failed');
            set({ error: err.message || 'Registration failed', isLoading: false });
        }
    },

    fetchUserList: async () => {
        set({ isLoading: true, error: null });
        try {
            const users = await fetchUsersService();
            set({ userList: users, isLoading: false });
        } catch (err: any) {
            set({ error: err.message || 'Fetching users failed', isLoading: false });
        }
    },

    resetError: () => set({ error: null }),
    logoutUser: async () =>{
        set({ user: null, error: null }); // Reset user and error state
        localStorage.removeItem('token'); // Remove token from local storage
        showSuccessToast('Logged out successfully!');
    }
}));
