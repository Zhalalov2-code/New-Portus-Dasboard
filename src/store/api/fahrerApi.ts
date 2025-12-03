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
        })
    })
})

export const { useGetFahrersQuery } = fahrerApi;