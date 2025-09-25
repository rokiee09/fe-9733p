import React from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { User } from '../services/apiService';

const UsersListPage: React.FC = () => {
  const users = useLoaderData() as User[];

  if (!users) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Kullanıcılar</h1>
      <Row>
        {users.map((user) => (
          <Col key={user.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  @{user.username}
                </Card.Subtitle>
                <Card.Text>
                  <strong>E-posta:</strong> {user.email}<br />
                  <strong>Telefon:</strong> {user.phone}<br />
                  <strong>Web Sitesi:</strong> {user.website}
                </Card.Text>
                <Card.Text>
                  <strong>Şirket:</strong> {user.company.name}
                </Card.Text>
                <Card.Text>
                  <strong>Adres:</strong> {user.address.street}, {user.address.city}
                </Card.Text>
                <Card.Text className="small text-muted">
                  👤 Kullanıcı #{user.id}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link 
                  to={`/users/${user.id}`} 
                  className="btn btn-primary w-100"
                >
                  Profili Görüntüle
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UsersListPage;
