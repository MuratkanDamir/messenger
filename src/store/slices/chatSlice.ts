import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';

type Chat = {
    friendId: string | null,
    chatId: string | null,  
}
const initialState: Chat = {
    friendId: null,
    chatId: null,
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(state, action: PayloadAction<Chat>){
            state.friendId = action.payload.friendId;
            state.chatId = action.payload.chatId;            
        },
        deleteChat(state){
            state.friendId = null;
            state.chatId = null;
        },
    }
})

export const {setChat, deleteChat} = chatSlice.actions;
export default chatSlice.reducer;