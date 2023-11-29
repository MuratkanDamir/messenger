import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

type User = {
    id: null | string,
    token: null | string,
    email: null | string,
    username: null | string,    
}
const initialState: User = {
    id: null,
    token: null,
    email: null,
    username: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>){
            state.id = action.payload.id;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.username = action.payload.username;            
        },
        deleteUser(state){
            state.id = null;
            state.token = null;
            state.email = null;
            state.username = null;
        },
    }
})

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;