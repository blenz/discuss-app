import { postRepository } from '@/repositories/posts'
import { notFound } from 'next/navigation'

interface PostViewProps {
  postId: string
}

export default async function PostView({ postId }: PostViewProps) {
  const post = await postRepository.getById(postId)
  if (!post) notFound()

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  )
}
