import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message_lkw{
    id_message: number
    id_lkw: number
    type_sender: string
    text: string
    created_ad: string
}

export interface Files_lkw{
    id_file: number
    id_message: number
    file_name: string
    created_ad: string
}

export interface Message_chassi{
    id_chassi: number
    id_message: number
    type_sender: string
    text: string
    created_ad: string
}

export interface Files_chassi{
    id_files: number
    id_message: number
    file_name: string
    created_ad: string
}

export const messageApi = createApi({
    reducerPath: 'messageApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost/portusApp1/' }),
    tagTypes: ['Messages', 'Files'],
    endpoints: (builder) => ({
        getMessagesByLkw: builder.query<Message_lkw[], number>({
            query: (id_lkw) => ({
                url: 'message_lkw',
                params: { id_lkw }
            }),
            providesTags: (result, error, id_lkw) => [{ type: 'Messages', id: `lkw-${id_lkw}` }],
        }),
        getFilesByMessageLkw: builder.query<Files_lkw[], number>({
            query: (id_message) => ({
                url: 'files_lkw', 
                params: { id_message }
            }),
            providesTags: ['Files'],
        }),
        getMessagesByChassi: builder.query<Message_chassi[], number>({
            query: (id_chassi) => ({
                url: 'message_chassi',
                params: { id_chassi }
            }),
            providesTags: (result, error, id_chassi) => [{ type: 'Messages', id: `chassi-${id_chassi}` }],
        }),
        getFilesByMessageChassi: builder.query<Files_chassi[], number>({
            query: (id_message) => ({
                url: 'files_chassi', 
                params: { id_message }
            }),
            providesTags: ['Files'],
        }),
        deleteMessageLkw: builder.mutation<void, { id_message: number; id_lkw: number }>({
            query: ({ id_message }) => ({
                url: `message_lkw/${id_message}`,
                method: 'DELETE',
            }),
            invalidatesTags: (res, err, {id_lkw}) => [{ type: 'Messages', id: `lkw-${id_lkw}` }],
        }),
        deleteMessageChassi: builder.mutation<void, { id_message: number; id_chassi: number }>({
            query: ({ id_message }) => ({
                url: `message_chassi/${id_message}`,
                method: 'DELETE',
            }),
            invalidatesTags: (res, err, {id_chassi}) => [{ type: 'Messages', id: `chassi-${id_chassi}` }],
        }),
    })
})

export const { useGetMessagesByLkwQuery, useGetFilesByMessageLkwQuery, useGetMessagesByChassiQuery, useGetFilesByMessageChassiQuery, useDeleteMessageLkwMutation, useDeleteMessageChassiMutation } = messageApi;