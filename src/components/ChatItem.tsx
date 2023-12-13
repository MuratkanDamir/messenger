import Avatar from '@mui/material/Avatar';
import { doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useEffect, useState } from 'react';
import styles from "components/ChatItem.module.css";
import { useAppDispatch } from 'hooks/hooks';
import { setChat } from 'store/slices/chatSlice';

interface ChatItemProps {
    chatId: string ,
    friendId: string,
    isActive: boolean,
}

interface userObject {
    username: string;
}
const ChatItem: React.FC<ChatItemProps> = (props) =>{

    const [user, setUser] = useState<userObject | null>(null);
    const dispatch = useAppDispatch();
    async function getUserInfo(id: string){
        try{
            const friendSnapshot: DocumentSnapshot = await getDoc( doc(db, "users", id) );
            
            if (friendSnapshot.exists()) { 
                const friendData = friendSnapshot.data() as userObject;
                setUser(friendData);
            } else {
                console.error("User not found");
            }
        } catch (error) {
            console.error("Error getting user info:", error);
          }
    }

    useEffect(() => {
        getUserInfo(props.friendId);
    },[props.friendId])

    
    return (
        props.isActive?
        (<div className={styles.activeMain} onClick={() => dispatch(setChat({ chatId: props.chatId, friendId: props.friendId }))}>
            <Avatar></Avatar>
            {user && <p>{user.username}</p>}
        </div>)
        :
        (<div className={styles.nonActiveMain} onClick={() => dispatch(setChat({ chatId: props.chatId, friendId: props.friendId }))}>
            <Avatar></Avatar>
            {user && <p>{user.username}</p>}
        </div>)
    )
}

export default ChatItem;