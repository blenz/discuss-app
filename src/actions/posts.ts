'use server'

import { auth } from '@/lib/auth'
import paths from '@/lib/paths'
import { postRepository } from '@/repositories/posts'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

interface CreatePostFormState {
  errors: null | {
    title?: string[]
    content?: string[]
  }
}

const createPostSchema = z.object({
  title: z
    .string()
    .min(3)
    .regex(/[a-z-]/),
  content: z.string(),
})

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const parsed = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const session = await auth()
  if (!session?.user?.id) return { errors: null }

  const topic = await topicRepository.getBySlug(slug)
  if (!topic) return { errors: null }

  const post = await postRepository.create({
    title: parsed.data.title,
    content: parsed.data.content,
    userId: session.user.id,
    topicId: topic.id,
  })

  revalidatePath(paths.topicView(slug))
  redirect(paths.postView(slug, post.id))
}
