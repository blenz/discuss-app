import { Comment, db } from '@/lib/db'
import { BaseRepository } from '@/repositories/base'

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null
    image: string | null
  }
}

class CommentRepository extends BaseRepository<Comment> {
  constructor() {
    super(db.comment)
  }

  getCommentsByPostId(postId: string): Promise<CommentWithAuthor[]> {
    return this.model.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    })
  }
}

export const commentRepository = new CommentRepository()
