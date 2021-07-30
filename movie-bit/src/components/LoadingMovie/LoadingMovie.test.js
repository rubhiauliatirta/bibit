import { render, screen } from '@testing-library/react';
import LoadingMovie from './index';

describe("loading-movie", () => {
  test("Should render message correctly with large text (text-3xl)", () => {
    const message = "test message"
    render(
      <LoadingMovie
        message={message}
      />
    )
    const messageElement = screen.getByText(message)
    expect(messageElement).toHaveClass("text-3xl")

  })
})

