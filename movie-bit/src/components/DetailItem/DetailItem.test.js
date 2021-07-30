import DetailItem from './index';
import { render, screen } from '@testing-library/react';

describe("detail-item", () => {
  test("Should render title and content props correctly", () => {
    render(
      <DetailItem
        title="title test"
        content="content test"
      />
    )
    const titleElement = screen.getByText(/title test/i)
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass("font-semibold")
    expect(titleElement).toHaveClass("text-lg")

    const contentElement = screen.getByText(/content test/i)
    expect(contentElement).toBeInTheDocument()
    expect(contentElement).toHaveClass("ml-4")
    expect(contentElement).toHaveClass("text-base")
    expect(contentElement).toHaveClass("font-light")
    expect(contentElement).toHaveClass("text-gray-400")

  })
})
