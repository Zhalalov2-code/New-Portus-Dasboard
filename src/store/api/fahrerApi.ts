import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Fahrer {
    id_fahrer: number;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    lkw: string;
    chassi: string;
}

 export const fahrerApi = createApi({
    reducerPath: 'fahrerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/portusApp1/' }),
    tagTypes: ['Fahrer'],
    endpoints: (builder) => ({
        getFahrers: builder.query<Fahrer[], void>({
            query: () => 'fahrer',
            providesTags: ['Fahrer'],
        }),
        updateFahrer: builder.mutation<Fahrer, Fahrer>({
            query: (fahrer) => ({
                url: 'fahrer',
                method: 'PUT',
                body: fahrer,
            }),
            invalidatesTags: ['Fahrer'],
        }),
        createFahrer: builder.mutation<Fahrer, Omit<Fahrer, 'id_fahrer'>>({
            query: (fahrer) => ({
                url: 'fahrer',
                method: 'POST',
                body: fahrer,
            }),
            invalidatesTags: ['Fahrer'],
        }),
    })
})

export const { useGetFahrersQuery, useUpdateFahrerMutation, useCreateFahrerMutation } = fahrerApi;