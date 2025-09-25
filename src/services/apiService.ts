const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const apiService = {
  // Users
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },

  getUser: async (userId: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
  },

  // Posts
  getUserPosts: async (userId: number): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    return response.json();
  },

  getPost: async (postId: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    return response.json();
  },

  getPostComments: async (postId: number): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    return response.json();
  },

  // Albums
  getUserAlbums: async (userId: number): Promise<Album[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/albums`);
    return response.json();
  },

  getAlbum: async (albumId: number): Promise<Album> => {
    const response = await fetch(`${API_BASE_URL}/albums/${albumId}`);
    return response.json();
  },

  getAlbumPhotos: async (albumId: number): Promise<Photo[]> => {
    const response = await fetch(`${API_BASE_URL}/albums/${albumId}/photos`);
    return response.json();
  },

  // Todos
  getUserTodos: async (userId: number): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/todos`);
    return response.json();
  },
};
