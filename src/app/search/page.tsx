import PostList from '@/components/post-list'
import { postRepository } from '@/repositories/posts'
import { redirect } from 'next/navigation'

interface SearchPageProps {
  searchParams: Promise<{
    term: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams
  if (!term) redirect('/')

  return (
    <div>
      <PostList fetchPosts={() => postRepository.getPostsBySearchTerm(term)} />
    </div>
  )
}
