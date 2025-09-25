import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout: React.FC = () => {
  return (
    <>
      <AppNavbar />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
