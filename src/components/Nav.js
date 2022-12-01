import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authService } from "../fbase";
import '../styles/Nav.css';



function Nav() {
   const [show,setShow] = useState(false);
   const [searchValue, setSearchValue] = useState("");
   const navigate = useNavigate(); //hook 함수 사용

   useEffect(() => {  //스크롤 내리면 배경 바뀜(스크롤이벤트)
    window.addEventListener("scroll", () => {
       //console.log("window.scrolly", window.scrollY);
       if(window.scrollY > 50) {
        setShow(true); 
       }else {
        setShow(false);
       }
    });
    return () => {//스크롤 이벤트를 적용시 component가 더 이상 적용 안 할 때(스크롤이벤트삭제)
      window.removeEventListener("scroll", () => {});
    };
   },[]);
  
  const onChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  const OnLogOutClick = () => {
    const ok = window.confirm("로그아웃 하겠습니까?");
    if (ok) {
      authService.signOut();
      navigate('/');  //로그인페이지로 이동
      window.location.reload();
    }
  }
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png'
       alt='Netflix logo' 
       className='nav__logo'
       onClick={() => (window.location.href = "/React_Netflix_App/")}/> 
      <ul className='nav_bar'>
        <li>시리즈</li>
        <li>영화</li>
        <li>NEW! 요즘 대세 콘텐츠</li>
      
      </ul>
        <input
        value={searchValue}
        onChange={onChange}
        className="nav__input"
        type="search"
        placeholder="영화를 검색해주세요."
      />

     <img
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        alt="User logged"
        className="nav__avatar"
        />
    <span className='logOut_Btn' onClick={OnLogOutClick}>Log Out</span>
    </nav>
  )
}

export default Nav
// onClick={() => window.location.reload()}/> :클릭하면 자동으로 새로고침