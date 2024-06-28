import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoogleButton from "./components/GoogleButton";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoogleButton />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
