import {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';

import { db } from "firebaseApp";
import { doc, addDoc, collection, getDocs, query , where,onSnapshot} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import ChatItem from "./ChatItem";

interface Chat{
    user1: string,
    user2: string,
    chatId: string,
}

const Chats: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const { id } = useAppSelector(state => state.user)
    const getChats = async () =>{
        const q = query(collection(db, "chats"), 
            where("user1", "==", id) ||
            where("user2", "==", id)
        );

        try{
            await onSnapshot(q, (querySnapshot) => {
                const tempChats: Chat[] = [];
                querySnapshot.forEach((doc) => {
                    const userChatData = doc.data() as Chat;
                    const userChat: Chat = {
                      chatId: doc.id,
                      user1: userChatData.user1,
                      user2: userChatData.user2,
                    };
                    console.log("chats:",userChat);
                    tempChats.push(userChat);
                });
                setChats(tempChats);
            });
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
        }

    }

    useEffect(() => {
        getChats();
    }, [db]);

    return (
        <div style={{display:'flex', flexDirection:'column' , gap:'15px', padding:'10px'}}>
            Chats
            {
                chats.map((user, index)=>(
                    <ChatItem key={index} chatId={user.chatId} friendId={user.user1 == id? user.user2: user.user1} />
                ))
            }
        </div>
    );
  }
  
export default Chats;
  
  