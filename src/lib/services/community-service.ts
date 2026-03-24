import { wrapApiResponse, ApiResponse } from '../api';

export interface Post {
  id: string;
  author: string;
  text: string;
  likes: number;
  comments: number;
  createdAt: string;
}

const MOCK_POSTS: Post[] = [
  { id: '1', author: '밤의여왕', text: '어제 카페인 끊었더니 수면 점수 20점이나 올랐어요 대박!', likes: 24, comments: 8, createdAt: '2026.03.24' },
  { id: '2', author: '꿈꾸는베어', text: '슬립팡 레벨 15 찍으신 분 있나요? 성장이 점점 더뎌지네요..', likes: 12, comments: 20, createdAt: '2026.03.24' },
  { id: '3', author: '아침형지배자', text: '오전 기상 후 5분 스트레칭 진짜 효과 좋습니다. 다들 꼭 해보세요.', likes: 56, comments: 14, createdAt: '2026.03.24' },
];

export const communityService = {
  async getPosts(): Promise<ApiResponse<Post[]>> {
    return wrapApiResponse(MOCK_POSTS);
  },

  async createPost(text: string, author: string): Promise<ApiResponse<Post>> {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      author,
      text,
      likes: 0,
      comments: 0,
      createdAt: new Date().toLocaleDateString(),
    };
    return wrapApiResponse(newPost);
  }
};
