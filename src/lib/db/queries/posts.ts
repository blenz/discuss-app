import { db } from '@/lib/db'
import type { Post } from '@prisma/client'

export type PostData = Post & {
  topic: { slug: string }
  user: { name: string | null }
  _count: { comments: number }
}

export function fetchPostsByTopicSlug(slug: string): Promise<PostData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  })
}
