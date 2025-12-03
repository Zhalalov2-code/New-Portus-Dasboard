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
        })
    }),
});

export const { useGetChassiQuery } = chassiApi;