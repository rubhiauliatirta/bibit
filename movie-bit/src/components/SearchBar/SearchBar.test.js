import SearchBar from "./index"
import store from "../../store"
import { Provider } from "react-redux"
import * as api from "../../helpers/api"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

let spy
describe('search-bar', () => {

  afterEach(() => {
    if (spy) {
      spy.mockClear()
    }

  })
  test('Should render movie card correctly', () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    const formElement = screen.getByTestId("search-form")
    const inputElement = screen.getByTestId("search-input")
    const buttonElement = screen.getByTestId("search-button")

    expect(formElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })

  test('should showing blue border when have focus, gray for blur', async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )
    const wrapperElement = screen.getByTestId("search-wrapper")
    const inputElement = screen.getByTestId("search-input")

    expect(wrapperElement).toBeInTheDocument()
    expect(wrapperElement).toHaveClass("border-gray-200")

    fireEvent.focus(inputElement)
    expect(wrapperElement).toHaveClass("border-blue-500")
    fireEvent.blur(inputElement)
    expect(wrapperElement).toHaveClass("border-gray-200")
  })

  test('Should not call api when query length < 2, and call after length > 2, and showing suggestion', async () => {
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    )

    spy = jest.spyOn(api, "search")
    spy.mockImplementation(() => Promise.resolve({ Search: [{ Title: "Harry Potter 1" }, { Title: "Harry Potter 2" }] }))
    const inputElement = screen.getByTestId("search-input")

    fireEvent.change(inputElement, { target: { value: "ha" } })
    expect(spy).not.toHaveBeenCalled();

    let suggestionElement = screen.queryByTestId("suggestion-option")
    expect(suggestionElement).not.toBeInTheDocument()
    fireEvent.change(inputElement, { target: { value: "harry" } })

    await waitFor(() => {
      return screen.getByTestId("suggestion-option")
    })
    suggestionElement = screen.getByTestId("suggestion-option")
    expect(suggestionElement).toBeInTheDocument() // now suggestion available in DOM
    expect(spy).toHaveBeenCalled();
    expect(screen.getAllByText(/harry/i)[0]).toBeInTheDocument()
  })
})

