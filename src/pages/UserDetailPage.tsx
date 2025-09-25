import React, { useState, useEffect } from 'react';
import { Card, Tabs, Tab, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import { User, Post, Album, Todo, Photo } from '../services/apiService';
import { apiService } from '../services/apiService';
import { useFavoritesStore } from '../store/favoritesStore';

const UserDetailPage: React.FC = () => {
  const user = useLoaderData() as User;
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<{ posts: boolean; albums: boolean; todos: boolean }>({
    posts: false,
    albums: false,
    todos: false,
  });
  const [activeTab, setActiveTab] = useState<string>('posts');

  const { addPost, removePost, isPostFavorite } = useFavoritesStore();

  useEffect(() => {
    if (activeTab === 'posts' && posts.length === 0) {
      setLoading(prev => ({ ...prev, posts: true }));
      apiService.getUserPosts(Number(userId))
        .then(data => {
          setPosts(data);
          setLoading(prev => ({ ...prev, posts: false }));
        })
        .catch(() => setLoading(prev => ({ ...prev, posts: false })));
    }
  }, [activeTab, userId, posts.length]);

  useEffect(() => {
    if (activeTab === 'albums' && albums.length === 0) {
      setLoading(prev => ({ ...prev, albums: true }));
      apiService.getUserAlbums(Number(userId))
        .then(data => {
          setAlbums(data);
          setLoading(prev => ({ ...prev, albums: false }));
        })
        .catch(() => setLoading(prev => ({ ...prev, albums: false })));
    }
  }, [activeTab, userId, albums.length]);

  useEffect(() => {
    if (activeTab === 'todos' && todos.length === 0) {
      setLoading(prev => ({ ...prev, todos: true }));
      apiService.getUserTodos(Number(userId))
        .then(data => {
          setTodos(data);
          setLoading(prev => ({ ...prev, todos: false }));
        })
        .catch(() => setLoading(prev => ({ ...prev, todos: false })));
    }
  }, [activeTab, userId, todos.length]);

  const handlePostFavorite = (post: Post) => {
    if (isPostFavorite(post.id)) {
      removePost(post.id);
    } else {
      addPost(post);
    }
  };

  const renderPosts = () => {
    if (loading.posts) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Card.Text className="small text-muted">
                  📝 Gönderi #{post.id}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Link 
                  to={`/users/${userId}/posts/${post.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Gönderiyi Gör
                </Link>
                <Button
                  variant={isPostFavorite(post.id) ? "danger" : "outline-danger"}
                  size="sm"
                  onClick={() => handlePostFavorite(post)}
                >
                  {isPostFavorite(post.id) ? "❤️" : "🤍"}
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderAlbums = () => {
    if (loading.albums) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <Row>
        {albums.map((album) => (
          <Col key={album.id} md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text className="small text-muted">
                  📁 Albüm #{album.id}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link 
                  to={`/users/${userId}/albums/${album.id}`}
                  className="btn btn-primary w-100"
                >
                  Albümü Görüntüle
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const renderTodos = () => {
    if (loading.todos) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      );
    }

    return (
      <div>
        {todos.map((todo) => (
          <Card key={todo.id} className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="me-3"
                />
                <span className={todo.completed ? 'text-decoration-line-through text-muted' : ''}>
                  {todo.completed ? '✅ Tamamlandı' : '⏳ Bekliyor'} - {todo.title}
                </span>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
          <Card.Text>
            <strong>E-posta:</strong> {user.email}<br />
            <strong>Telefon:</strong> {user.phone}<br />
            <strong>Web Sitesi:</strong> {user.website}
          </Card.Text>
          <Card.Text>
            <strong>Şirket:</strong> {user.company.name}<br />
            <strong>Adres:</strong> {user.address.street}, {user.address.city}
          </Card.Text>
          <Card.Text className="small text-muted">
            👤 Kullanıcı #{user.id}
          </Card.Text>
        </Card.Body>
      </Card>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || 'posts')}
        className="mb-3"
      >
        <Tab eventKey="posts" title="Gönderiler">
          {renderPosts()}
        </Tab>
        <Tab eventKey="albums" title="Albümler">
          {renderAlbums()}
        </Tab>
        <Tab eventKey="todos" title="Yapılacaklar">
          {renderTodos()}
        </Tab>
      </Tabs>
    </div>
  );
};

export default UserDetailPage;
