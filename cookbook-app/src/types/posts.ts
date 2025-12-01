export interface BasePost {
  id: number;
  post_type: 'recipe' | 'thought';
  title: string;
  body: string;
  user: User;
  likes: User[];
  created_at: string;
  updated_at: string;

  images?: PostImage[];
}

export interface RecipePost extends BasePost {
  type: 'recipe';
  ingredients: string;
  instructions: string;
}

export interface ThoughtPost extends BasePost {
  type: 'thought';
}

export interface PostImage {
  id: string;
  image_url: string;
  caption?: string;
  created_at: string;
}

export type Post = RecipePost | ThoughtPost;

export interface User {
  id: number;
  username: string;
}
