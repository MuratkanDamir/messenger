import { useAppSelector } from "hooks/hooks";


const Chat: React.FC = () => {
    const {email} = useAppSelector(state => state.user);
    return (
        <div style={{width:'70vw', minWidth:'400px'}}>
            Chat
        </div>
    );
  }
  
  export default Chat;
  