import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";

import { db } from "firebaseApp";
import { doc, setDoc,addDoc, collection, getDocs, query , where} from "firebase/firestore";
import { useAppSelector } from 'hooks/hooks';

interface UserData {
    username: string;
    userId: string;
}



const Search: React.FC = () => {
    const [searchedUsername, setSearchedUsername] = useState("")
    const [users, setUsers] = useState<UserData[]>([]);

    const updateUsers = async() =>{
        const q = query(collection(db, 'users'), where('username', '==', searchedUsername));
        // Выполнение запроса
        const querySnapshot = await getDocs(q);
            let usersList: UserData[] = [];
            // Обработка результатов запроса
            querySnapshot.forEach((doc) => {
                const userData: UserData = doc.data() as UserData;
                usersList.push(userData);
            });
            setUsers(usersList);
    }

    useEffect(() => {
        updateUsers();
    },[users]);

    const {id} =  useAppSelector(state => state.user);

    const addChat = async (userId: string) =>{
        const data={
            user1: id,
            user2: userId,
        }
        try {
            const chatsCollectionRef = collection(db, 'chats');
            const newChatDocRef = await addDoc(chatsCollectionRef, data);

            // Добавить подколлекцию в новый документ чата
            const messagesCollectionRef = collection(newChatDocRef, 'messages');
            await addDoc(messagesCollectionRef, {});
        } catch (error) {
            console.error("Error adding chat:", error);
        }
        setSearchedUsername("");
    }
    return (
        <div>
            <div style={{display:'flex', alignItems:'center'}}>
                <TextField
                    label="Search user"
                    size="small"
                    color="info"
                    value = {searchedUsername}
                    onChange={(e) => setSearchedUsername(e.target.value)}
                    onBlur={() => setSearchedUsername("")}
                />
            </div>
            <div>
                {
                    users.map((user, index) =>(
                        <div key={index}>
                            {user.username}
                            <Button 
                                variant="contained"
                                color='success'
                                style={{width:'20px', height:'10px', fontSize:'.6em'}}
                                onClick = {() => addChat(user.userId)}
                            >type</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
  }
  
  export default Search;
  