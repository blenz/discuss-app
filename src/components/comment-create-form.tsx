'use client'

import { createComment } from '@/actions/comments'
import { Button, Textarea } from '@nextui-org/react'
import { useActionState, useEffect, useRef, useState } from 'react'

interface CommentCreateFormProps {
  postId: string
  parentId: string | null
  startOpen?: boolean
}

export default function CommentCreateForm({ postId, parentId, startOpen }: CommentCreateFormProps) {
  const ref = useRef<HTMLFormElement | null>(null)
  const [open, setOpen] = useState(startOpen)
  const [{ error, formErrors }, action, loading] = useActionState(
    createComment.bind(null, { postId, parentId }),
    {}
  )

  useEffect(() => {
    if (!error) {
      ref.current?.reset()

      if (!startOpen) {
        setOpen(false)
      }
    }
  }, [error, startOpen])

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          placeholder="Enter your comment"
          isInvalid={!!formErrors?.content}
          errorMessage={formErrors?.content?.join(', ')}
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
