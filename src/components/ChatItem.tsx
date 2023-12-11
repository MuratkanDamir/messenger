import Avatar from '@mui/material/Avatar';
import { collection, doc, DocumentSnapshot, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useEffect, useState } from 'react';
import styles from "components/ChatItem.module.css";
import { fetchMessages } from 'store/slices/chatSlice';
import { useAppDispatch } from 'hooks/hooks';
interface ChatItemProps {
    chatId: string ,
    friendId: string,
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
    },[])
    return (
        <div className={styles.main} onClick={() => dispatch( fetchMessages( {chatId: props.chatId, friendId: props.friendId} ) )}>
            <Avatar>H</Avatar>
            {user && <p>{user.username}</p>}
        </div>
    )
}

export default ChatItem;