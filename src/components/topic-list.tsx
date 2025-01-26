import { db } from '@/lib/db'
import paths from '@/lib/paths'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

async function TopicList() {
  const topics = await db.topic.findMany()

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
