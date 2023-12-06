import {Routes, Route} from "react-router-dom";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

const App: React.FC = () => {
  return (
    <div style={{display:'flex', justifyContent:'space-around', alignItems:'flex-start'}}>
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/login" element={ <LoginPage /> }/>
        <Route path="/register" element={ <RegisterPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
