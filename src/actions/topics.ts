'use server'

import { Topic } from '@/lib/db'
import { db } from '@/lib/db'
import paths from '@/lib/paths'
import { topicRepository } from '@/repositories/topics'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

interface CreateTopicFormState {
  errors: null | {
    name?: string[]
    description?: string[]
  }
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/),
  description: z.string().min(10),
})

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const parsed = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  })

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }

  const topic = await topicRepository.create({
    slug: parsed.data.name,
    description: parsed.data.description,
    },
  })

  revalidatePath(paths.home())
  redirect(paths.topicView(topic.slug))
}
