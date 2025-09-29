import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import UsersListPage from './pages/UsersListPage';
import UserDetailPage from './pages/UserDetailPage';
import PostDetailPage from './pages/PostDetailPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import { apiService } from './services/apiService';

// Loader functions
const usersLoader = async () => {
  return apiService.getUsers();
};

const userLoader = async ({ params }) => {
  return apiService.getUser(Number(params.userId));
};

const postLoader = async ({ params }) => {
  const [post, comments, user] = await Promise.all([
    apiService.getPost(Number(params.postId)),
    apiService.getPostComments(Number(params.postId)),
    apiService.getUser(Number(params.userId))
  ]);
  return { post, comments, user };
};

const albumLoader = async ({ params }) => {
  const [album, photos, user] = await Promise.all([
    apiService.getAlbum(Number(params.albumId)),
    apiService.getAlbumPhotos(Number(params.albumId)),
    apiService.getUser(Number(params.userId))
  ]);
  return { album, photos, user };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UsersListPage />,
        loader: usersLoader,
      },
      {
        path: 'users',
        element: <UsersListPage />,
        loader: usersLoader,
      },
      {
        path: 'users/:userId',
        element: <UserDetailPage />,
        loader: userLoader,
      },
      {
        path: 'users/:userId/posts/:postId',
        element: <PostDetailPage />,
        loader: postLoader,
      },
      {
        path: 'users/:userId/albums/:albumId',
        element: <AlbumDetailPage />,
        loader: albumLoader,
      },
      {
        path: 'favorites',
        element: <FavoritesPage />,
      },
    ],
  },
], {
  basename: '/fe-9733p'
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
