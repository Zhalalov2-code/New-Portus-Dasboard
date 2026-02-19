import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Lkw {
    id_lkw: number
    tuf: string
    esp: string
    lkw_nummer: string
    status: string
}

export const lkwApi = createApi({
    reducerPath: 'lkwApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/portusApp1/' }),
    tagTypes: ['Lkw'],
    endpoints: (builder) => ({
        getLkws: builder.query<Lkw[], void>({
            query: () => 'lkw',
            providesTags: ['Lkw'],
        }),
        updateLkw: builder.mutation<Lkw, Lkw>({
            query: (lkw) => ({
                url: 'lkw',
                method: 'PUT',
                body: lkw,
            }),
            invalidatesTags: ['Lkw'],
        }),
        createLkw: builder.mutation<Lkw, Omit<Lkw, 'id_lkw'>>({
            query: (lkw) => ({
                url: 'lkw',
                method: 'POST',
                body: lkw,
            }),
            invalidatesTags: ['Lkw'],
        }),
    }),
});

export const { useGetLkwsQuery, useUpdateLkwMutation, useCreateLkwMutation } = lkwApi;