import React from 'react'
import styled from 'styled-components';
import { campus } from '../img';

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  max-width: 360px;
  padding: 200px 30px 24px;
`;

const Logo = styled.img`
  display: block;
  width: 180px;
  margin: 0 auto 40px; 
`;

const MiddleMent = styled.div`
  font-size: 12px;
  color: #555;
  text-align: center;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #2ec4b6;
  }
`;

const Help = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin: 8px 0 16px;
  color: #666;
`;

const FindLink = styled.a`
  color: #2ec4b6;
  text-decoration: none;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 42px;
  background: #2ec4b6;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #1fa99c;
  }
`;

function Login() {
  return (
    <PageWrap>
      <Body>
        <Logo src={campus} alt="CAMPUS" />
        <MiddleMent>회원님의 아이디와 비밀번호를 정확히 입력해주세요.</MiddleMent>

        <Input type="text" placeholder="ID" />
        <Input type="password" placeholder="PASSWORD" />
        
        <Help>
          <span>비밀번호를 잊어버리셨나요?</span>
          <FindLink>비밀번호 찾기</FindLink>
        </Help>

        <LoginButton>로그인</LoginButton>
      </Body>
    </PageWrap>
  )
}

export default Login;