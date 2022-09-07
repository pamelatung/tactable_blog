import {useState} from 'react'
import Head from 'next/head'

import {useQuery} from '@tanstack/react-query'

import {Post} from '../shared/types'
import Pagination from '../components/Pagination'
import BlogPost from '../components/BlogPost'

const Blog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const {isLoading, data, error} = useQuery(['posts'], () =>
    fetch('https://6144e843411c860017d256f0.mockapi.io/api/v1/posts')
      .then((res) => res.json())
  )

  const totalPages = data && Math.ceil(data.length / 6)

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
      return data.slice(0, 6);

    } else if (currentPage > 1) {
      const start = (currentPage - 1) * 6
      return data.slice(start, start + 6)
    }
  }

  return (
    <div>
      <Head>
        <title>Welcome to my recent blog entries! </title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/css/uikit.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/js/uikit.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/uikit@3.15.6/dist/js/uikit-icons.min.js"></script>
      </Head>

      <main>
        <h1>
          Welcome to this blog!
        </h1>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageClick={handleOnPageClick}
          onBack={handleOnBack}
          onNext={handleOnNext}
        />

          <div className="uk-grid uk-grid-match" data-uk-grid-match="{target:'.uk-card'}">  
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