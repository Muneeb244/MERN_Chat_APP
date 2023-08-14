import { createSlice, current } from '@reduxjs/toolkit';
import appApi from '../services/appApi';

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        addNotifications: (state, { payload }) => {
            if (state.user.newMessages[payload]) {
                console.log("in if", state.user.newMessages[payload])
                state.user.newMessages[payload] += 1
            }
            else {
                console.log(current(state.user))
                console.log("in else", state.user.newMessages[payload])
                state.user.newMessages[payload] = 1
            }
        },
        resetNotifications: (state, { payload }) => {
            if (state.user.newMessages) delete state.user.newMessages[payload]
        }
        ,
        logout: () => {
            localStorage.removeItem('persist:root');

        }
    },
    extraReducers: builder => {
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => payload)
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            if (!payload.error) {
                return payload
            }
            return null
        })
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null)
    }
})

export const { addNotifications, resetNotifications, logout } = userSlice.actions;
export default userSlice.reducer;

