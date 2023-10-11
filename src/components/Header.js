import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/">
        <img src='./images/logo.png' alt='my logo img'/>
      </NavLink>
      <Nav/>
    </MainHeader>
  )
}

const MainHeader = styled.header`
 height: 10rem;
 background-color: ${({theme}) => theme.colors.bg};
 display: flex;
 justify-content: space-between;
 align-items: center;
 positon: relative;

 .logo{
    height: 5rem;
 }
`;

export default Header
