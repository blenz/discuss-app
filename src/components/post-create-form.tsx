'use client'

import { createPost } from '@/actions/posts'
import {
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react'
import { startTransition, useActionState } from 'react'

interface PostCreateFormProps {
  slug: string
}

function PostCreateForm({ slug }: PostCreateFormProps) {
  const [{ formErrors }, action, loading] = useActionState(createPost.bind(null, slug), {})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    startTransition(() => action(new FormData(event.currentTarget)))
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button>Create Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formErrors?.title}
              errorMessage={formErrors?.title?.join(', ')}
            />
            <Textarea
              name="content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formErrors?.content}
              errorMessage={formErrors?.content?.join(', ')}
            />
            <Button type="submit" isLoading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  )
}

export default PostCreateForm
