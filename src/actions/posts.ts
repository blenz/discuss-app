'use server'

import { auth } from '@/lib/auth'
import { FormState } from '@/lib/forms'
import paths from '@/lib/paths'
import { postRepository } from '@/repositories/posts'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createPostSchema = z.object({
  title: z.string().min(3).regex(/[a-z-]/), // prettier-ignore
  content: z.string(),
})

export async function createPost(
  slug: string,
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    title: formData.get('title'),
    content: formData.get('content'),
  }

  const parsed = createPostSchema.safeParse(data)
  if (!parsed.success) {
    return { formErrors: parsed.error.flatten().fieldErrors }
  }

  const session = await auth()
  if (!session?.user?.id) return { error: 'User must be signed in' }

  const topic = await topicRepository.getBySlug(slug)
  if (!topic) return { error: 'Topic not found' }

  const post = await postRepository.create({
    title: parsed.data.title,
    content: parsed.data.content,
    userId: session.user.id,
    topicId: topic.id,
  })

  revalidatePath(paths.topicView(slug))
  redirect(paths.postView(slug, post.id))
}
