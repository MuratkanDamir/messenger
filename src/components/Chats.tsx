import {useState, useEffect} from "react";

import { db } from "firebaseApp";
import { collection, query , where,onSnapshot} from "firebase/firestore";
import { useAppSelector } from "hooks/hooks";
import ChatItem from "./ChatItem";

interface Chat{
    user1: string,
    user2: string,
    chatId: string,
}

const Chats: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const { id } = useAppSelector((state) => state.user);

    const getChats = () => {
        const q = query(
            collection(db, 'chats'),
            where('user1', '==', id)
        );

        const q2 = query(
            collection(db, 'chats'),
            where('user2', '==', id)
        );

        const unsubscribe1 = onSnapshot(q, (querySnapshot1) => {
            const tempChats: Chat[] = [];
            querySnapshot1.forEach((doc) => {
                const userChatData = doc.data() as Chat;
                const userChat: Chat = {
                    chatId: doc.id,
                    user1: userChatData.user1,
                    user2: userChatData.user2,
                };
                tempChats.push(userChat);
            });

            setChats((prevChats) => [...prevChats, ...tempChats]);
        });

        const unsubscribe2 = onSnapshot(q2, (querySnapshot2) => {
            const tempChats: Chat[] = [];
            querySnapshot2.forEach((doc) => {
                const userChatData = doc.data() as Chat;
                const userChat: Chat = {
                    chatId: doc.id,
                    user1: userChatData.user1,
                    user2: userChatData.user2,
                };
                tempChats.push(userChat);
            });

            setChats((prevChats) => [...prevChats, ...tempChats]);
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        };
    };

    useEffect(() => {
        const unsubscribe = getChats();
        return () => {
            unsubscribe();
        };
    }, []); 

    const i = useAppSelector(state => state.chat.chatId);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '10px' }}>
            Chats
            {chats.map((user, index) => (
                i == user.chatId?
                (<ChatItem isActive={true} key={index}  chatId={user.chatId} friendId={user.user1 === id ? user.user2 : user.user1} />)
                :
                (<ChatItem isActive={false} key={index} chatId={user.chatId} friendId={user.user1 === id ? user.user2 : user.user1} />)
            ))}
        </div>
    );
};

export default Chats;

  
  