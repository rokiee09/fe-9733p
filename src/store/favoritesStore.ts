import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Photo {
  userId: number;
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface FavoritesState {
  photos: Photo[];
  posts: Post[];
  addPhoto: (photo: Photo) => void;
  removePhoto: (photoId: number) => void;
  addPost: (post: Post) => void;
  removePost: (postId: number) => void;
  isPhotoFavorite: (photoId: number) => boolean;
  isPostFavorite: (postId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      photos: [],
      posts: [],
      addPhoto: (photo) =>
        set((state) => ({
          photos: [...state.photos, photo],
        })),
      removePhoto: (photoId) =>
        set((state) => ({
          photos: state.photos.filter((photo) => photo.id !== photoId),
        })),
      addPost: (post) =>
        set((state) => ({
          posts: [...state.posts, post],
        })),
      removePost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
      isPhotoFavorite: (photoId) =>
        get().photos.some((photo) => photo.id === photoId),
      isPostFavorite: (postId) =>
        get().posts.some((post) => post.id === postId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
