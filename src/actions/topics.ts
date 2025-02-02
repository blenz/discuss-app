'use server'

import { FormState } from '@/lib/forms'
import paths from '@/lib/paths'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/[a-z-]/), // prettier-ignore
  description: z.string().min(10),
})

export async function createTopic(_: FormState, formData: FormData): Promise<FormState> {
  const data = {
    name: formData.get('name'),
    description: formData.get('description'),
  }

  const parsed = createTopicSchema.safeParse(data)
  if (!parsed.success) {
    return { formErrors: parsed.error.flatten().fieldErrors }
  }

  const topic = await topicRepository.create({
    slug: parsed.data.name,
    description: parsed.data.description,
  })

  revalidatePath(paths.home())
  redirect(paths.topicView(topic.slug))
}
