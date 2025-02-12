'use client'

import search from '@/actions/search'
import { Form, Input } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'

export default function SearchInput() {
  const searchParams = useSearchParams()

  return (
    <Form action={search}>
      <Input name="term" defaultValue={searchParams.get('term') || ''} placeholder="Search" />
    </Form>
  )
}
