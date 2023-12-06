import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { auth } from "firebaseApp";
import { signInWithEmailAndPassword } from "firebase/auth";

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


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async function({email, password}: {email:string, password:string}, {dispatch}){
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userToken = await userCredential.user.getIdToken();

            return  {
                id: userCredential.user.uid, 
                email: email, 
                token: userToken,
                username: "user", 
            }
        }catch(error){
            console.log(error)
            throw error;
        }
    }
);

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
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            userSlice.caseReducers.setUser(state, action);
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.id = null;
            state.token = null;
            state.email = null;
            state.username = null;
            throw action.error;
        })
    }
})

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;