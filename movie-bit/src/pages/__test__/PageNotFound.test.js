import PageNotFound from '../PageNotFound';
import { render, screen } from '@testing-library/react';

describe("page-not-found", () => {
  test("Should render correctly", () => {
    render(<PageNotFound />)
    expect(screen.getByTestId("page-not-found")).toBeInTheDocument()
  })
})
