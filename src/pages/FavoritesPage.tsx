import React from 'react';
import { Card, Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFavoritesStore } from '../store/favoritesStore';

const FavoritesPage: React.FC = () => {
  const { photos, posts, removePhoto, removePost } = useFavoritesStore();

  const handleRemovePhoto = (photoId: number) => {
    removePhoto(photoId);
  };

  const handleRemovePost = (postId: number) => {
    removePost(postId);
  };

  const renderPhotos = () => {
    if (photos.length === 0) {
      return (
        <Card>
          <Card.Body className="text-center">
            <p className="text-muted">Henüz favori fotoğraf eklenmemiş.</p>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={photo.thumbnailUrl} 
                alt={photo.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="h6">{photo.title}</Card.Title>
                <Card.Text className="small text-muted">
                  📁 Albüm ID: {photo.albumId}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Link 
                  to={`/users/${photo.userId}/albums/${photo.albumId}`}
                  className="btn btn-primary btn-sm"
                >
                  Albüme Git
                </Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemovePhoto(photo.id)}
                >
                  ❌ Kaldır
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderPosts = () => {
    if (posts.length === 0) {
      return (
        <Card>
          <Card.Body className="text-center">
            <p className="text-muted">Henüz favori gönderi eklenmemiş.</p>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="h6">{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Text className="small text-muted">
                  📝 Gönderi #{post.id}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Link 
                  to={`/users/${post.userId}/posts/${post.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Gönderiye Git
                </Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemovePost(post.id)}
                >
                  ❌ Kaldır
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <h1 className="mb-4">Favorilerim</h1>
      
      <Tabs defaultActiveKey="photos" className="mb-3">
        <Tab eventKey="photos" title={`Fotoğraflar (${photos.length})`}>
          {renderPhotos()}
        </Tab>
        <Tab eventKey="posts" title={`Gönderiler (${posts.length})`}>
          {renderPosts()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default FavoritesPage;
