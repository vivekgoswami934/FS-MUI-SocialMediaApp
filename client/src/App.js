
import { Login } from "@mui/icons-material";
import HomePage from "pages/homepage";
import ProfilePage from "pages/profilePage";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"


function App() {


  return (
    <div className="app">

      <BrowserRouter>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      </BrowserRouter>

    </div>
  );
}

export default App;
