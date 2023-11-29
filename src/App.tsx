import {Routes, Route} from "react-router-dom";
const App: React.FC = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/login" element={ <LoginPage /> }/>
        <Route path="/register" element={ <RegisterPage /> }/>
      </Routes>
    </div>
  );
}

export default App;
