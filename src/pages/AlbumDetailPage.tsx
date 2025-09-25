import React from 'react';
import { Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useLoaderData, Link, useParams } from 'react-router-dom';
import { Album, Photo, User } from '../services/apiService';
import { useFavoritesStore } from '../store/favoritesStore';

interface AlbumDetailData {
  album: Album;
  photos: Photo[];
  user: User;
}

const AlbumDetailPage: React.FC = () => {
  const { album, photos, user } = useLoaderData() as AlbumDetailData;
  const { userId } = useParams<{ userId: string }>();
  const { addPhoto, removePhoto, isPhotoFavorite } = useFavoritesStore();

  const handlePhotoFavorite = (photo: Photo) => {
    if (isPhotoFavorite(photo.id)) {
      removePhoto(photo.id);
    } else {
      addPhoto({
        ...photo,
        userId: Number(userId),
      });
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{album.title}</Card.Title>
          <Card.Subtitle className="text-muted">
            <Link to={`/users/${user.id}`} className="text-decoration-none">
              👤 {user.name} (@{user.username})
            </Link>
          </Card.Subtitle>
          <Card.Text className="small text-muted mt-2">
            📁 Albüm #{album.id}
          </Card.Text>
        </Card.Body>
      </Card>

      <h3>Fotoğraflar ({photos.length})</h3>
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
                  📸 Fotoğraf #{photo.id}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => window.open(photo.url, '_blank')}
                >
                  Tam Boyut
                </Button>
                <Button
                  variant={isPhotoFavorite(photo.id) ? "danger" : "outline-danger"}
                  size="sm"
                  onClick={() => handlePhotoFavorite(photo)}
                >
                  {isPhotoFavorite(photo.id) ? "❤️" : "🤍"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AlbumDetailPage;
