import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styled from 'styled-components';


const Layout: React.FC = () => (
    <LayoutContainer>
        <Header />
        <Main>
            <Outlet />
        </Main>
        <Footer />
    </LayoutContainer>
);


const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 1rem;
`;

const Main = styled.main`
  flex: 1;
`;


export default Layout;
