import {useState} from 'react'
import Head from 'next/head'

import {useFetchPosts} from '../hooks/useFetchPosts'
import {Post} from '../shared/types'
import Pagination from '../components/Pagination'
import BlogPost from '../components/BlogPost'

const Blog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {isLoading, data, error} = useFetchPosts()

  const totalPages = data && Math.ceil(data.length / 6)

  const sortedData = data && data
    .map((item: Post) => {
      return {...item, createdAt: new Date(item.createdAt)}
    })
    .sort((a: {createdAt: number}, b: {createdAt: number}) => b.createdAt - a.createdAt)

  const handleOnPageClick = (page: number) => {
    if (currentPage !== page) {
      setCurrentPage(page)
    }
  }

  const handleOnBack = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleOnNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const selectPageData = () => {
    if (currentPage === 1) {
      return sortedData.slice(0, 6);

    } else if (currentPage > 1) {
      const start = (currentPage - 1) * 6
      return sortedData.slice(start, start + 6)
    }
  }

  if (isLoading) {
    return <p data-testid="loading_message">Posts are still loading.</p>
  }

  if (error) {
    return <p data-testid="error_message">There has been an error loading this page.</p>
  }

  return (
    <div>
      <Head>
        <title>Blog</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/css/uikit.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/js/uikit-icons.min.js"></script>
      </Head>

      <main>
        <h1>
          Welcome to my blog entries!
        </h1>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={handleOnPageClick}
          onBack={handleOnBack}
          onNext={handleOnNext}
        />

        <div className="uk-grid uk-grid-match uk-margin-small-left uk-margin-medium-right" data-uk-grid-match="{target:'.uk-card'}">  
          {
            data && selectPageData()
              .map(
                (post: Post) => {
                  return (
                    <div className="uk-width-1-3">
                      <BlogPost post={post} />
                    </div>
                  )
                }
              )
            }
          </div>
      </main>      
    </div>
  )
}

export default Blog
