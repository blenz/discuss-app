import PostList from '@/components/post-list'
import TopicCreateForm from '@/components/topic-create-form'
import TopicList from '@/components/topic-list'
import { postRepository } from '@/repositories/posts'
import { Divider } from '@nextui-org/react'

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchPosts={() => postRepository.getTopPosts()} />
      </div>
      <div className="border p-2 my-2 bg-slate-300 text-center shadow-md rounded-md">
        <TopicCreateForm />
        <Divider className="my-2" />
        <TopicList />
      </div>
    </div>
  )
}
