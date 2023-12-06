import { useAppSelector } from "hooks/hooks";


const Chat: React.FC = () => {
    const {email} = useAppSelector(state => state.user);
    return (
        <div>
            Chat
        </div>
    );
  }
  
  export default Chat;
  