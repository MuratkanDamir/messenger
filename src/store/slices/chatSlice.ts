import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { db } from "firebaseApp";
import { collection, doc, getDocs, onSnapshot, orderBy, query} from "firebase/firestore";

type Message = {
    createdAt: null | string,
    text: null | string,
    creator: null | string, 
}
type Chat = {
    friendId: string | null,
    chatId: string | null,
    messages: Message[] | [],  
}
const initialState: Chat = {
    friendId: null,
    chatId: null,
    messages: [],
}

export const fetchMessages = createAsyncThunk(
    'user/fetchMessages',
    async function({chatId, friendId }:{chatId: string| null, friendId: string}){

        try{
            if (chatId !== null){

                // const messagesCollectionRef = collection(doc(db, "chats", chatId), 'messages');
                // const q = query(messagesCollectionRef, orderBy("createdAt"));
              
                // let mes: Message[] = [];
                // const unsubscribe = await onSnapshot(q, (querySnapshot) => {
                //     querySnapshot.forEach((doc) => {
                //     const messageData = doc.data() as Message;
                //     mes.push({ ...messageData});
                //   });
                // });
                return {
                    friendId: friendId,
                    chatId: chatId,
                    messages: [],
                };


            }else{
                throw Error;
            }

        }catch(error){
            console.log(error);
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(state, action: PayloadAction<Chat>){
            state.friendId = action.payload.friendId;
            state.friendId = action.payload.chatId;
            state.messages = action.payload.messages;            
        },
        deleteChat(state){
            state.friendId = null;
            state.chatId = null;
            state.messages = [];
        },
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.friendId = action.payload?.friendId ?? null;
            state.chatId = action.payload?.chatId ?? null;
            state.messages = action.payload?.messages ?? [];
        });
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.friendId = null;
            state.chatId = null;
            state.messages = [];
        })
    }
})


export default chatSlice.reducer;