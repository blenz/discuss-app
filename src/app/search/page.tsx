import PostList from '@/components/post-list'
import { fetchPostsBySearchTerm } from '@/lib/db/queries/posts'
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
      <PostList fetchPosts={() => fetchPostsBySearchTerm(term)} />
    </div>
  )
}
