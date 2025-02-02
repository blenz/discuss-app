import { PostData } from '@/lib/db/posts'
import paths from '@/lib/paths'
import Link from 'next/link'

interface PostListProps {
  fetchPosts: () => Promise<PostData[]>
}

export default async function PostList({ fetchPosts }: PostListProps) {
  const posts = await fetchPosts()

  return (
    <div className="space-y-2">
      {posts.map(post => (
        <div key={post.id} className="border rounded p-2">
          <Link href={paths.postView(post.topic.slug, post.id)}>
            <h3 className="text-lg font-bold">{post.title}</h3>
            <div className="flex flex-row gap-8">
              <p className="text-xs text-gray-400">By {post.user.name}</p>
              <p className="text-xs text-gray-400">{post._count.comments} comments</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
