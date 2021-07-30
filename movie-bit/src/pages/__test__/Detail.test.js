import DetailPage from "../Detail"
import { MemoryRouter } from "react-router-dom"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import store from "../../store"
import { Provider } from "react-redux"
import * as api from "../../helpers/api"
import { movieDetail as mockMovieDetail } from "./mockData"

let spy = null
describe('detail-page', () => {

  afterEach(() => {
    if (spy) {
      spy.mockClear()
    }
  })
  test('Should render detail page correctly when data is found', async () => {
    jest.mock('react-router-dom', () => ({
      useParams: jest.fn().mockReturnValue({ id: 'tt2975590' }),
    }));
    spy = jest.spyOn(api, "getDetail")
    spy.mockImplementation(() => Promise.resolve(mockMovieDetail))

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
      </Provider>
    )

    // showing loading component
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    //after loading completed
    await waitFor(() => screen.getByText(mockMovieDetail.Title))
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

    // expected detail data showing in DOM
    expect(screen.getByText(mockMovieDetail.Title)).toBeInTheDocument()
    expect(screen.getByText(mockMovieDetail.Director)).toBeInTheDocument()
    expect(screen.getByText(mockMovieDetail.Writer)).toBeInTheDocument()
    expect(screen.getByText(mockMovieDetail.Actors)).toBeInTheDocument()
    expect(screen.getByText(mockMovieDetail.Plot)).toBeInTheDocument()
  })


  test('Should render detail page correctly when data is not found by shoing ItemNotFound component', async () => {
    jest.mock('react-router-dom', () => ({
      useParams: jest.fn().mockReturnValue({ id: 'tt2975590' }),
    }));
    spy = jest.spyOn(api, "getDetail")
    spy.mockImplementation(() => Promise.reject("item not found"))

    render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailPage />
        </MemoryRouter>
      </Provider>
    )

    // showing loading component
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    //after loading completed
    await waitFor(() => screen.getByText("Item Not Found"))
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

    // expected showing item not found message
    expect(screen.queryByText("Item Not Found")).toBeInTheDocument()
  })
})

