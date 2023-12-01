import {Routes, Route} from "react-router-dom";
import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";

const App: React.FC = () => {
  return (
      <Routes>
        {/* <Route path="/" element={ <HomePage /> }/> */}
        <Route path="/" element={ <LoginPage /> }/>
        <Route path="/u" element={ <RegisterPage /> }/>
      </Routes>
  );
}

export default App;
