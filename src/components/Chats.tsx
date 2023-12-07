import {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';

import { db } from "firebaseApp";
import { doc, addDoc, collection, getDocs, query , where,onSnapshot} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "hooks/hooks";

interface Chat{
    user1: string,
    user2: string,
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
                    const userChat: Chat = doc.data() as Chat;
                    
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
                    <div key={index} style = {{display:'flex', alignItems:'center', gap:'5px'}}>
                        <Avatar>H</Avatar>
                        {user.user1 == id? user.user2: user.user1}
                    </div>
                ))
            }
        </div>
    );
  }
  
export default Chats;
  
  