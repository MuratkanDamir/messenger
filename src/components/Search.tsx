import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";

import { db } from "firebaseApp";
import { doc, setDoc,addDoc, collection, getDocs, query , where, onSnapshot} from "firebase/firestore";
import { useAppSelector } from 'hooks/hooks';

interface UserData {
    username: string;
    userId: string;
}



const Search: React.FC = () => {
    const [searchedUsername, setSearchedUsername] = useState("")
    const [fullUsers, setFullUsers] = useState<UserData []>([])
    const [users, setUsers] = useState<UserData[]>([]);

    const fetchUsers = async () =>{
        const q = query(collection(db, 'users'));
        
        let usersList: UserData[] = [];
        const unsubscribe =  onSnapshot(q, (querySnapshot) => {            
            querySnapshot.forEach((doc) => {
                const userData: UserData = doc.data() as UserData;
                usersList.push(userData);
            });
            setFullUsers(usersList);
        });
          
        return () => {
            unsubscribe();
        };
    };
    

    const updateUsers = () =>{
        
        if (searchedUsername.trim() !== '') {
            const regex = new RegExp(`^${searchedUsername}`, 'i');
            const res = fullUsers.filter(  (user) => user.username.match(regex) !== null)  ;
            setUsers(res );
        }else{
            setUsers([] );
        }
    }

    

    useEffect(() => {
        fetchUsers();
    },[]);

    useEffect(() => {
        updateUsers();
    },[searchedUsername]);

    const {id} =  useAppSelector(state => state.user);

    const addChat = async (userId: string) =>{
        const data={
            user1: id,
            user2: userId,
        }
        try {
            const chatsCollectionRef = collection(db, 'chats');
            const newChatDocRef = await addDoc(chatsCollectionRef, data);
            const messagesCollectionRef = collection(newChatDocRef, 'messages');
            await addDoc(messagesCollectionRef, {});
        } catch (error) {
            console.error("Error adding chat:", error);
        }
        setSearchedUsername("");
        setUsers([])
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
                    onBlur={() => {
                        setSearchedUsername("")
                    }}
                />
            </div>
            <div>
                {
                    users.map((user, index) =>(
                        <div key={index} style={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',padding:'5px', border:'1px solid black',    wordBreak:'break-word',}}>
                            {user.username}
                            <Button 
                                variant="contained"
                                color='success'
                                style={{width:'20px', height:'15px', fontSize:'.6em'}}
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
  