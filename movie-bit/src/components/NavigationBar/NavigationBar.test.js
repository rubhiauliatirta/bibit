import { render, screen } from '@testing-library/react';
import NavigationBar from './index';
import { MemoryRouter } from "react-router-dom"

describe("Testing NavigationBar Component", () => {

  test("NavigationBar should has w-full class for full width, bg-gray-900 for dark background-color, and p-5 for padding", () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    )
    const navigationElement = screen.getByTestId("navbar")
    expect(navigationElement).toHaveClass("w-full")
    expect(navigationElement).toHaveClass("bg-gray-900")
    expect(navigationElement).toHaveClass("p-5")
  })

  test("NavigationBar should have Brand/Application Name which is an anchor tag, and link to '/'", () => {
    render(
      <MemoryRouter>
        <NavigationBar />
      </MemoryRouter>
    )
    const appsName = "BitMovie"
    const brandElement = screen.getByRole("link")

    expect(brandElement).toBeInTheDocument() // test anchor is in render result
    expect(brandElement).toHaveTextContent(appsName)
    expect(brandElement).toHaveAttribute("href")
    expect(brandElement.getAttribute("href")).toEqual("/")

  })

})

