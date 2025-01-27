'use server'

import { redirect } from 'next/navigation'

export default async function search(formData: FormData) {
  const term = formData.get('term')
  if (!term) redirect('/')

  redirect(`/search?term=${term}`)
}
