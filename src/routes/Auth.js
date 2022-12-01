import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import { authService } from '../fbase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, GoogleAuthProvider,GithubAuthProvider,signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";


function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true); 
    const [error,setError] = useState("")

    const onChange = (e) => {
        //console.log(e.target.name)
        const {target:{value,name}} = e;
        if("email" === name){
            setEmail(value);
        }else if("password" === name){
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          let data;
          if(newAccount){
              //create newAccount
              data = await createUserWithEmailAndPassword(authService, email, password)
          }else{
              //login
              data = await signInWithEmailAndPassword(authService, email, password)
          }
          //console.log(data);//회원가입을 마친 사용자 정보
        } catch (error) {
          //console.log(error);
          setError(error.message)
        }
      }
    const toggleAccount = () => setNewAccount((prev) => !prev)

    const onSocialClick = (e) =>{
        //console.log(e.target.name)
        const {target:{name}} = e;
        let provider;
        if(name === "google"){
            provider = new GoogleAuthProvider();
        }else if(name === 'github'){
            provider = new GithubAuthProvider();
        }
        const data = signInWithPopup(authService, provider);
        console.log(data);
    }
  return (
<Container className='authContainer'>
  <Top className="top">
    <Wrapper className="wrapper">
        <Image
          className='logo'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
        />
     </Wrapper>
  </Top>
  <Content>
   <Form onSubmit={onSubmit} className='container'>
        <h1>Sing In</h1>
        <Input type="email" placeholder='Email' required name='email' value={email} onChange={onChange} className='authInput'/>
        <Input type="password" placeholder='Password' required name='password' value={password} onChange={onChange} className='authInput'/>
        <Input type="submit" value={newAccount ? "Create Account" : "Log In"} className='authInput authSubmit'/>
        {error && <span className='authError'>{error}</span>}
    
    <Span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "Sign In" : "Create Account"}
    </Span>
    <Span>
        New to Netflix?<Link to='/register'> Sign up now.</Link>
    </Span>
    <Span>
     This page is protected by Google reCAPTCHA to ensure you're not a
    bot. <b>Learn more</b>.
    </Span>
    <Button onClick={onSocialClick} name='google' className='authBtn'>
            Continue with Google<FaGoogle />
    </Button>
    </Form>
    
  </Content>
</Container>
  )
}

export default Auth

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    ),
    /* url(http://mppmduse2pmpovwapp.azurewebsites.net/wp-content/uploads/2019/09/netflix-background-9.jpg) */
    url(https://assets.nflxext.com/ffe/siteui/vlv3/701eec50-4b87-4dc0-9d00-b0f54025dc36/783900b6-ccf8-4d88-af02-601a6a8b4231/AR-es-20220905-popsignuptwoweeks-perspective_alpha_website_medium.jpg)
    ;
  background-size: cover;
  position: relative;
`;

const Top = styled.div`
`;
const Wrapper = styled.div`
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  height: 40px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Form = styled.form`
  width: 400px;
  height: 400px;
  padding: 40px;
  border-radius: 5px;
  background-color: #00000095;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding-left: 10px;
  &::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  height: 40px;
  border-radius: 5px;
  background-color: red;
  color: white;
  border: none;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const Span = styled.span`
  color: lightgray;
  a {
    color: white;
    text-decoration: none;
  }
`;