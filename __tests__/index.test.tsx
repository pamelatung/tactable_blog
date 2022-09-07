import { render, screen } from '@testing-library/react'
import Blog from '@/pages/index'

describe('Blog', () => {
  it('renders a heading', () => {
    render(<Blog />)

    const heading = screen.getByRole('heading')

    expect(heading).toBeInTheDocument()
  })
})
