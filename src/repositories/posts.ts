import { db, Post } from '@/lib/db'
import { BaseRepository } from '@/repositories/base'

export type PostData = Post & {
  topic: { slug: string }
  user: { name: string | null }
  _count: { comments: number }
}

class PostRepository extends BaseRepository<Post> {
  constructor() {
    super(db.post)
  }

  getPostsBySearchTerm(term: string): Promise<PostData[]> {
    return this.model.findMany({
      include: {
        topic: { select: { slug: true } },
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true } },
      },
      where: {
        OR: [{ title: { contains: term } }, { content: { contains: term } }],
      },
    })
  }

  getPostsByTopicSlug(slug: string): Promise<PostData[]> {
    return this.model.findMany({
      where: { topic: { slug } },
      include: {
        topic: { select: { slug: true } },
        user: { select: { name: true } },
        _count: { select: { comments: true } },
      },
    })
  }

  getTopPosts(): Promise<PostData[]> {
    return this.model.findMany({
      orderBy: [
        {
          comments: {
            _count: 'desc',
          },
        },
      ],
      include: {
        topic: { select: { slug: true } },
        user: { select: { name: true, image: true } },
        _count: { select: { comments: true } },
      },
      take: 5,
    })
  }
}

export const postRepository = new PostRepository()
