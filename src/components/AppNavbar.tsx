import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useFavoritesStore } from '../store/favoritesStore';

const AppNavbar: React.FC = () => {
  const { photos, posts } = useFavoritesStore();
  const location = useLocation();
  
  const favoritesCount = photos.length + posts.length;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/users">
          JSON Placeholder Uygulaması
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/users" active={location.pathname === '/users'}>
              Kullanıcılar
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" active={location.pathname === '/favorites'}>
              Favoriler ({favoritesCount})
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
