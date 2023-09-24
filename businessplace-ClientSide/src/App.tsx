import React, { createContext , useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import MyCards from './components/MyCards';
import ShowBussiness from './components/ShowBussiness';
import About from './components/About';
import FavoriteCards from './components/FavoriteCards';
import SandBox from './components/SandBox';
import UpdateCard from './components/UpdateCard';
import Footer from './components/Footer';
import NewCard from './components/NewCard';
import { ToastContainer } from 'react-toastify';
import BussinessPage from './components/BussinessPage';
import PageNotFound from './components/PageNotFound';
import UpdateUser from './components/UpdateUser';

let themes = {
  light: {
    color: "black",
    background: "turquoise",
    cardBg: "white",
    Navbarbg: "blue",
    buttonbg: "blue"
  },
  dark: {
    color: "white",
    background: "black",
    cardBg: "grey",
    Navbarbg: "grey",
    buttonbg: "grey"
  }

}
export let SiteTheme= createContext(themes.light)

function App() {
  let[darkMode, setDarkMode] = useState<boolean>(false)
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? {isAdmin: false, isBussiness: false, isLoggedIn: false}
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  let [cardInfo, setCardInfo] = useState(
    JSON.parse(sessionStorage.getItem("cardInfo") as string) == null
      ? {isfavorite: false}
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  return (
    <div className="App">
    <SiteTheme.Provider value={darkMode ? themes.dark : themes.light}>
    <ToastContainer theme="dark" />
      <Router>
      <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path='/showbussiness' element={<ShowBussiness userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/' element={<Login setUserInfo={setUserInfo}/>} />
          <Route path='/my-cards' element={<MyCards cardInfo={cardInfo} setCardInfo={setCardInfo} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/about' element={<About />} />
          <Route path='/showbussiness/update/:_id' element={<UpdateCard />} />
          <Route path='/favoriteCards' element={<FavoriteCards cardInfo={cardInfo} setCardInfo={setCardInfo} userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path='/newcard'element={<NewCard />} />
          <Route path='/sandbox' element={<SandBox userInfo={userInfo} />} />
          <Route path= "/updateUser/:_id" element={<UpdateUser userInfo={userInfo}/>} />
          <Route path='/showbussiness/show/:_id' element={<BussinessPage />} />
          <Route path='/register' element={<Register setUserInfo={setUserInfo} />} />
          <Route path='*' element={<PageNotFound  />} />
          
        </Routes>
        <Footer userInfo={userInfo}/>
      </Router>
    </SiteTheme.Provider>  
    </div>
  );
}

export default App;
