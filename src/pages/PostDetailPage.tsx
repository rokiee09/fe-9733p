import React from 'react';
import { Card, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useLoaderData, Link, useParams } from 'react-router-dom';
import { Post, Comment, User } from '../services/apiService';
import { useFavoritesStore } from '../store/favoritesStore';

interface PostDetailData {
  post: Post;
  comments: Comment[];
  user: User;
}

const PostDetailPage: React.FC = () => {
  const { post, comments, user } = useLoaderData() as PostDetailData;
  const { userId } = useParams<{ userId: string }>();
  const { addPost, removePost, isPostFavorite } = useFavoritesStore();

  const handlePostFavorite = () => {
    if (isPostFavorite(post.id)) {
      removePost(post.id);
    } else {
      addPost(post);
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <Card.Title>{post.title}</Card.Title>
              <Card.Subtitle className="text-muted">
                <Link to={`/users/${user.id}`} className="text-decoration-none">
                  {user.name} (@{user.username})
                </Link>
              </Card.Subtitle>
            </div>
            <Button
              variant={isPostFavorite(post.id) ? "danger" : "outline-danger"}
              onClick={handlePostFavorite}
            >
              {isPostFavorite(post.id) ? "❤️ Favorilerden Çıkar" : "🤍 Favorilere Ekle"}
            </Button>
          </div>
          <Card.Text>{post.body}</Card.Text>
          <Card.Text className="small text-muted">
            📝 Gönderi #{post.id} • {new Date().toLocaleDateString('tr-TR')}
          </Card.Text>
        </Card.Body>
      </Card>

      <h3>Yorumlar ({comments.length})</h3>
      <Row>
        {comments.map((comment) => (
          <Col key={comment.id} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title className="h6">{comment.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                  💬 {comment.email}
                </Card.Subtitle>
                <Card.Text>{comment.body}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostDetailPage;
