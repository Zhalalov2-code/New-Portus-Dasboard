import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Chassi{
    id_chassi: number
    chassi_number: string
    tuf: string
    sp: string
}

export const chassiApi = createApi({
    reducerPath: 'chassiApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/portusApp1/' }),
    tagTypes: ['Chassi'],
    endpoints: (builder) => ({
        getChassi: builder.query<Chassi[], void>({
            query: () => 'chassi',
            providesTags: ['Chassi'],
        }),
        updateChassi: builder.mutation<Chassi, Chassi>({
            query: (chassi) => ({
                url: 'chassi',
                method: 'PUT',
                body: chassi,
            }),
            invalidatesTags: ['Chassi'],
        }),
        createChassi: builder.mutation<Chassi, Omit<Chassi, 'id_chassi'>>({
            query: (chassi) => ({
                url: 'chassi',
                method: 'POST',
                body: chassi,
            }),
            invalidatesTags: ['Chassi'],
        }),
    }),
});

export const { useGetChassiQuery, useUpdateChassiMutation, useCreateChassiMutation } = chassiApi;