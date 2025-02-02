import CommentCreateForm from '@/components/comment-create-form'
import CommentList from '@/components/comment-list'
import PostView from '@/components/post-view'
import PostViewLoading from '@/components/post-view-loading'
import paths from '@/lib/paths'
import { commentRepository } from '@/repositories/comments'
import Link from 'next/link'
import { Suspense } from 'react'

interface PostViewPageProps {
  params: Promise<{
    slug: string
    postId: string
  }>
}

export default async function PostViewPage({ params }: PostViewPageProps) {
  const { slug, postId } = await params

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicView(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Suspense fallback={<PostViewLoading />}>
        <PostView postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchComments={() => commentRepository.getCommentsByPostId(postId)} />
    </div>
  )
}
