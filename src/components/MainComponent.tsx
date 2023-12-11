import Navbar from "components/Navbar";
import ChatComponent from "components/ChatComponent";

const style: React.CSSProperties = {
    display: 'flex',
    height:'100vh',
}

const MainComponent: React.FC = () => {
    return (
        <div style={style}>
            <Navbar />
            <ChatComponent />
        </div>
    );
  }
  
  export default MainComponent;
  
  