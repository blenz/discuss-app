'use client'

import { createTopic } from '@/actions/topics'
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

function TopicCreateForm() {
  const [{ formErrors }, action, loading] = useActionState(createTopic, {})

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    startTransition(() => action(new FormData(event.currentTarget)))
  }

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button>Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formErrors?.name}
              errorMessage={formErrors?.name?.join(', ')}
            />
            <Textarea
              name="description"
              labelPlacement="outside"
              placeholder="Description"
              isInvalid={!!formErrors?.description}
              errorMessage={formErrors?.description?.join(', ')}
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

export default TopicCreateForm
