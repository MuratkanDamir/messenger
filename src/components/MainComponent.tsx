import Navbar from "components/Navbar";
import Chat from "components/Chat";

const style: React.CSSProperties = {
    display: 'flex',
    height:'100vh',
}

const MainComponent: React.FC = () => {
    return (
        <div style={style}>
            <Navbar />
            <Chat />
        </div>
    );
  }
  
  export default MainComponent;
  
  