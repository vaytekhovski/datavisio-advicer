import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import AppMenu from './components/AppMenu';
import AppContent from './components/AppContent'
import Authorization from './components/Authorization'

function App() {
  const [jwt, setJwt] = useState("");
  const [isAuth, setAuth] = useState(localStorage.getItem("user") == null ? false : true);
  const [userName, setUserName] = useState("");

  const setAuthorize = (values) =>{
    if(values){
      setJwt(values.jwt);
      setAuth(true);
      setUserName(values.username);
    }
    else{

    }
  }

  return (
    <>
      {
        isAuth ?
          <>
            <AppMenu />
            <AppContent />
          </> :
          <Authorization onAuthorize={setAuthorize}/>
      }
    </>
  );
}



export default App;
