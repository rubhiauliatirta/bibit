import MovieCard from "./index"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';


describe('movie-card', () => {
  test('Should render movie card correctly', () => {
    render(<MovieCard movie={movie} />)

    const titleElement = screen.getByText(movie.Title)
    const yearElement = screen.getByText(movie.Year)
    const posterElement = screen.getByTestId("poster")

    expect(titleElement).toBeInTheDocument()
    expect(yearElement).toBeInTheDocument()
    expect(posterElement).toBeInTheDocument()

    expect(posterElement.getAttribute("src")).toEqual(movie.Poster)

    fireEvent.click(posterElement)
    const swalDialog = screen.getByRole("dialog")
    expect(swalDialog).toBeInTheDocument()
  })

  test("Should render image no_image.jpg if movie doesn't has Poster url (N/A)", () => {
    movie.Poster = "N/A"
    render(<MovieCard movie={movie} />)

    const titleElement = screen.getByText(movie.Title)
    const yearElement = screen.getByText(movie.Year)
    const posterElement = screen.getByTestId("poster")

    expect(titleElement).toBeInTheDocument()
    expect(yearElement).toBeInTheDocument()
    expect(posterElement).toBeInTheDocument()
    expect(posterElement.getAttribute("src")).toEqual("no_image.jpg")
    fireEvent.click(posterElement)
    expect(screen.getByText("Image not Available")).toBeInTheDocument()
  })
})

const movie = {
  Title: "Harry Potter",
  Year: "2020",
  Poster: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

