'use server'

import { auth } from '@/lib/auth'
import { FormState } from '@/lib/forms'
import paths from '@/lib/paths'
import { commentRepository } from '@/repositories/comments'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z.string().min(3),
})

export async function createComment(
  { postId, parentId }: { postId: string; parentId: string | null },
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    content: formData.get('content'),
  }

  const parsed = createCommentSchema.safeParse(data)
  if (!parsed.success) {
    return {
      formErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return { error: 'You must sign in to do this.' }
  }

  try {
    await commentRepository.create({
      postId,
      parentId,
      content: parsed.data.content,
      userId: session.user.id,
    })
  } catch (err) {
    return { error: 'Something went wrong...' }
  }

  const topic = await topicRepository.getByPostId(postId)
  if (!topic) {
    return { error: 'Topic not found' }
  }

  revalidatePath(paths.postView(topic.slug, postId))
  return {}
}
