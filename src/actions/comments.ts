'use server'

import { auth } from '@/lib/auth'
import paths from '@/lib/paths'
import { commentRepository } from '@/repositories/comments'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z.string().min(3),
})

interface CreateCommentFormState {
  errors: null | {
    content?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get('content'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must sign in to do this.'],
      },
    }
  }

  try {
    await commentRepository.create({
      postId,
      parentId,
      content: result.data.content,
      userId: session.user.id,
    })
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong...'],
        },
      }
    }
  }

  const topic = await topicRepository.getByPostId(postId)
  if (!topic) {
    return {
      errors: {
        _form: ['Failed to revalidate topic'],
      },
    }
  }

  revalidatePath(paths.postView(topic.slug, postId))
  return {
    errors: {},
    success: true,
  }
}
