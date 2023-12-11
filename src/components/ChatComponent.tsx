import { useAppSelector } from "hooks/hooks";
import Chat from "./Chat";

const style: React.CSSProperties = {
    width:'70vw', 
    minWidth:'400px',
    backgroundColor:'violet',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
}
const ChatComponent: React.FC = () => {
    const {friendId} = useAppSelector(state => state.chat);

    return (
        <div style={style}>
            {
                friendId === null? 
                (<h3>Here will be your messages</h3>)
                :
                (<Chat />)
            }
            
        </div>
    );
  }
  
  export default ChatComponent;
  