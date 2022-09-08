import {render, screen} from '@testing-library/react'
import Blog from '@/pages/index'

import {mockPost} from '../fixtures/post'
import {useFetchPosts} from '../hooks/useFetchPosts'

const mockUseFetchPosts = useFetchPosts as jest.Mock
jest.mock('../hooks/useFetchPosts');

describe('Blog', () => {

  beforeEach(() => {
    mockUseFetchPosts.mockImplementation(() => ({
      isLoading: true,
      data: null,
      error: null,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  
  it('renders a loading message if the data is still loading', () => {
    render(<Blog />)

    expect(screen.getByTestId('loading_message')).toBeVisible()
  })

  it('renders an error message if there was an error getting the data', () => {
    mockUseFetchPosts.mockImplementation(() => ({
      isLoading: false,
      data: undefined,
      error: new Error(),
    }))

    render(<Blog />)

    expect(screen.getByTestId('error_message')).toBeVisible()
  })

  it('renders the pagination component when there are blog posts', () => {
    mockUseFetchPosts.mockImplementation(() => ({
      isLoading: false,
      data: [mockPost],
      error: null,
    }))
    render(<Blog />)

    expect(screen.getByTestId('page_navigator')).toBeVisible()
  })

  it('does not render more than six posts per page', () => {
    mockUseFetchPosts.mockImplementation(() => ({
      isLoading: false,
      data: [mockPost, mockPost, mockPost, mockPost, mockPost, mockPost, mockPost],
      error: null,
    }))

    render(<Blog />)

    expect(screen.getAllByTestId('blog_post')).toHaveLength(6)
  })
})
