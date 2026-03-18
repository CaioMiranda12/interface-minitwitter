import api from '@/lib/api'

export interface Post {
  id: string
  title: string
  content: string
  image?: string | null
  authorId: string
  createdAt: string
  authorName: string
  likesCount: number
}

export interface GetPostsParams {
  page?: number
  search?: string
}

export interface GetPostsResponse {
  posts: Post[]
  total: number
  page: number
  limit: number
}

export interface CreatePostData {
  title: string
  content: string
  image?: string
}

export const getPosts = async (params?: GetPostsParams): Promise<GetPostsResponse> => {
  const response = await api.get<GetPostsResponse>('/posts', { params })
  return response.data
}

export const getPostById = async (id: string): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`)
  return response.data
}

export const createPost = async (data: CreatePostData): Promise<Post> => {
  const response = await api.post<Post>('/posts', data)
  return response.data
}

export const editPost = async (id: string, data: Partial<CreatePostData>): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, data)
  return response.data
}

export const deletePost = async (id: string): Promise<void> => {
  await api.delete(`/posts/${id}`)
}

export const likePost = async (id: string): Promise<void> => {
  await api.post(`/posts/${id}/like`)
}