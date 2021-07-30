import Home from '../Home';
import store from "../../store"
import { Provider } from "react-redux"
import * as api from "../../helpers/api"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { movieList } from './mockData';


let spy
describe("home-page", () => {
  afterEach(() => {
    if (spy) {
      spy.mockClear()
    }
  })
  describe("Should render homepage correctly", () => {

    test("render search-box", () => {
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      )
      expect(screen.getByPlaceholderText(/batman/i))
    })
    test("Should render 'searching movie animation', list of movie cards after resolved, and infinite scrolling", async () => {
      spy = jest.spyOn(api, "search")
      spy.mockImplementation(() => Promise.resolve(movieList))
      render(
        <Provider store={store}>
          <Home />
        </Provider>
      )
      expect(screen.getByLabelText(/animation/i))

      // expecting card show
      await waitFor(() => screen.getByText(movieList.Search[0].Title))
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith("Batman") // initial search

      //expecting infinite scroll working correctly
      spy.mockImplementation(() => Promise.resolve({ ...movieList, Search: movieList.Search.map(item => ({ ...item, Title: item.Title + "X", imdbID: item.imdbID + "X" })) }))
      fireEvent.scroll(window, { target: { scrollY: window.innerHeight } })
      await waitFor(() => screen.getByText(movieList.Search[0].Title + "X"))
      expect(spy).toHaveBeenCalledTimes(2)
      expect(spy).toHaveBeenCalledWith("Batman")

    })
  })
})
