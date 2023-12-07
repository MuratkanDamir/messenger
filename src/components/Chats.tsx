import {useState, useEffect} from "react";
import Avatar from '@mui/material/Avatar';

import { db } from "firebaseApp";
import { doc, addDoc, collection, getDocs, query , where, onSnapshot} from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "hooks/hooks";

interface Chat{
    user1: string,
}

const Chats: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([])
    const { id } = useAppSelector(state => state.user)
    const getChats = async () =>{


        const q = query(collection(db, "chats"), where("user1", "==", id), where("user2", "==", id)  );
        // console.log(q);
        onSnapshot(q, (querySnapshot) => {
            const tempChats: Chat[] = [];
            querySnapshot.forEach((doc) => {
                const userChat: Chat = doc.data() as Chat;
                console.log(userChat);
                tempChats.push(userChat);
            });
            setChats(tempChats);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, "chats"), where("user1", "==", id));
            const querySnapshot = await getDocs(q);
            
            const tempChats: Chat[] = [];
            querySnapshot.forEach((doc) => {
              const userChat: Chat = doc.data() as Chat;
              tempChats.push(userChat);
            });
            console.log(tempChats);
            setChats(tempChats);
          };
      
        fetchData(); // Вызываем fetchData при создании компонента

        // getChats();

    }, []);

    return (
        <div>
            Chats
            {
                chats.map((user)=>(
                    <div style = {{display:'flex', alignItems:'center', gap:'5px'}}>
                        <Avatar>H</Avatar>
                        {user.user1}
                    </div>
                ))
            }
        </div>
    );
  }
  
export default Chats;
  
  