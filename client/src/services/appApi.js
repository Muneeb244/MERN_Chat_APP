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
            }),
        }),
        loginUser: builder.mutation({
            query: user => ({
                url: '/user/login',
                method: 'post',
                body: user,
            })
        }),

        logoutUser: builder.mutation({
            query: payload => ({
                url: '/logout',
                method: 'delete',
                body: payload,
            })
        })

    }),
})

export const {useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation} = appApi
export default appApi;