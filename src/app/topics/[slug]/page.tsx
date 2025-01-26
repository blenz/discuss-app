import PostCreateForm from '@/components/post-create-form'

interface TopicViewPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function TopicViewPage({ params }: TopicViewPageProps) {
  const topic = await params

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{topic.slug}</h1>
      </div>

      <div>
        <PostCreateForm slug={topic.slug} />
      </div>
    </div>
  )
}
