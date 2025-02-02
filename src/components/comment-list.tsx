import CommentView from '@/components/comment-view'
import type { CommentWithAuthor } from '@/lib/db/comments'

interface CommentListProps {
  fetchComments: () => Promise<CommentWithAuthor[]>
}

export default async function CommentList({ fetchComments }: CommentListProps) {
  const comments = await fetchComments()
  const topLevelComments = comments.filter(comment => comment.parentId === null)

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {topLevelComments.map(comment => (
        <CommentView key={comment.id} commentId={comment.id} comments={comments} />
      ))}
    </div>
  )
}
