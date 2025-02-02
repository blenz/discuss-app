import { Topic, db } from '@/lib/db'
import { BaseRepository } from '@/repositories/base'

class TopicRepository extends BaseRepository<Topic> {
  constructor() {
    super(db.topic)
  }

  getBySlug(slug: string) {
    return this.model.findFirst({ where: { slug } })
  }

  getByPostId(postId: string) {
    return this.model.findFirst({ where: { posts: { some: { id: postId } } } })
  }
}

export const topicRepository = new TopicRepository()
