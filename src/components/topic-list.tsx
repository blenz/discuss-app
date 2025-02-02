import paths from '@/lib/paths'
import { topicRepository } from '@/repositories/topics'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

async function TopicList() {
  const topics = await topicRepository.getAll()

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map(topic => (
        <div key={topic.id}>
          <Link href={paths.topicView(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TopicList
