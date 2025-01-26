'use client'

import { createComment } from '@/actions/comments'
import { Button, Textarea } from '@nextui-org/react'
import { useActionState, useEffect, useRef, useState } from 'react'

interface CommentCreateFormProps {
  postId: string
  parentId?: string
  startOpen?: boolean
}

export default function CommentCreateForm({ postId, parentId, startOpen }: CommentCreateFormProps) {
  const ref = useRef<HTMLFormElement | null>(null)
  const [open, setOpen] = useState(startOpen)
  const [formState, action, loading] = useActionState(
    createComment.bind(null, { postId, parentId }),
    { errors: null }
  )

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset()

      if (!startOpen) {
        setOpen(false)
      }
    }
  }, [formState, startOpen])

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors?.content}
          errorMessage={formState.errors?.content?.join(', ')}
        />

        <Button type="submit" isLoading={loading}>
          Submit
        </Button>
      </div>
    </form>
  )

  return (
    <div>
      <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  )
}
