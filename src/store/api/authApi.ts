import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
    id: number;
    email: string;
    name: string;
    lastname: string;
    role: string;
}

interface LoginResponse {
    user: User;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/portusApp1/' }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'users/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;