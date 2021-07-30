import ItemNotFound from './index';
import { render, screen } from '@testing-library/react';

describe("item-not-found", () => {
  test("Should render 'There are no movies that matched your query.' if props undefined ", () => {
    render(<ItemNotFound />)
    const messageElement = screen.getByText(/There are no movies that matched your query./i)
    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveClass("text-2xl")
  })

  test("Should render passed message", () => {
    render(<ItemNotFound message="test" />)
    const messageElement = screen.getByText("test")
    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveClass("text-2xl")
  })
})
