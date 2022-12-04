import { useState, useEffect } from "react";
import { Outlet, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { authService } from './fbase';
import Nav from './components/Nav';
import Footer from './components/Footer';
import MainPage from './routes/MainPage';
import DetailPage from './routes/DetailPage';
import SearchPage from './routes/SearchPage';
import Auth from './routes/Auth';
import './styles/App.css';


const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] =useState(null); //로그인한 사용자 정보

  useEffect(() => { //home 컴포넌트에서 async await 에 의한 결과를 받으면 useEffect 실행 할 수 있음
    onAuthStateChanged(authService, (user) => { // 그럼 로그인에 대한 사용자 정보를 onAuthStateChanged 함수에 의해 user에 저장됨
      console.log(user);
      if (user) { //값이 있으면 true 고, setIsLoggedIn에 값이 전달됨
        //user is signed in
        setIsLoggedIn(user);
        setUserObj(user);
        //const uid = user.uid; 로그인 됨(=true)
  
      } else { // 값이 없고 false 이면 setIsLoggedIn에 전달(로그아웃)
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <>
    {init ?  (
    <div className="app">    
     <Routes>
     {isLoggedIn ? (
      <Route path="/" element={<Layout/>}>
      <Route index element={<MainPage/>} />
      <Route path=":movieId" element={<DetailPage />}/>
      <Route path="search" element={<SearchPage userObj={userObj} />} />
      </Route>
        ) : (
        <Route path='/' element={<Auth />} />
        )}
    </Routes>
    </div>
  )  : "initializing..."}
 </>
  );
}


export default App;

//중첩 라우팅(Nested Routes) => <Outlet/> ,라우트 안에 라우트가 있고 부모에 해당하는 주소가 기준 