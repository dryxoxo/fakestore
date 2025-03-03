import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    isLogin?: boolean,
    token: string,
}

const initialState: AuthState = {
    isLogin: false,
    token: '',
}

const storeCredensialReducer: CaseReducer<AuthState, PayloadAction<AuthState>> = (state, action) => {
    state.isLogin = true
    state.token = action.payload.token
}

const logOutReducer: CaseReducer<AuthState> = (state) => {
    state.isLogin = false
    state.token = ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeCredensial: storeCredensialReducer,
        logOut: logOutReducer
    }
});

export const { storeCredensial, logOut } = AuthSlice.actions

export default AuthSlice.reducer