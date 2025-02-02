import PostCreateForm from '@/components/post-create-form'
import PostList from '@/components/post-list'
import { postRepository } from '@/repositories/posts'

interface TopicViewPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TopicViewPage({ params }: TopicViewPageProps) {
  const { slug } = await params

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchPosts={() => postRepository.getPostsByTopicSlug(slug)} />
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  )
}
