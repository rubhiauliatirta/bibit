import { render, screen } from '@testing-library/react';
import LoadingMore from './index';

describe("loading-more", () => {
  test("LoadingMore should showing Fetching Data message with class test-lg and text-white", () => {
    render(<LoadingMore />)
    const messageElement = screen.getByText(/Fetching Data/i)
    expect(messageElement).toHaveClass("text-lg")
    expect(messageElement).toHaveClass("text-white")
  })

  test("LoadingMore should showing spinning svg", () => {
    render(<LoadingMore />)
    const svgElement = screen.getByTestId("svg")
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveClass("animate-spin")
  })
})

