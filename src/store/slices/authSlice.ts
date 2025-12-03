import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    email: string;
    name: string;
    lastname: string;
    role: string;
}

interface AuthState {
    currentUser: User | null;
}

interface LoginResponse {
    currentUser: User;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("currentUser") || "null") as User | null,
    } as AuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<LoginResponse>) => {
            const { currentUser } = action.payload;
            state.currentUser = currentUser;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        },

        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;