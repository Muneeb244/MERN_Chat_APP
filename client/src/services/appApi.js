import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: builder => ({
        signupUser: builder.mutation({
            query: user => ({
                url: '/user/signup',
                method: 'post',
                body: user,
            })
        }),
        loginUser: builder.mutation({
            query: user => ({
                url: '/user/login',
                method: 'post',
                body: user,
            })
        }),

        // logoutUser: builder.mutation({

    })
})

export const {useLoginUserMutation, useSignupUserMutation} = appApi
export default appApi;