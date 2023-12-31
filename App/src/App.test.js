import React from 'react';
// import { createStore } from 'redux';
// import reducer from '../reducers';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';

// You can use the actual Redux store with your reducers you might have. As follows:
// const store = createStore(reducer)
// render(<App cartId={777} dispatch={store.dispatch} shippingCost={0} cartId={999999} />);
// Then in the test code you can use the Redux store getState call to see what is in there
// expect(store.getState().app.currentMsg).toEqual('Home Page news fetched');

// If you open the index.html file in the browser located at coverage/lcov-report folder you will be able
// to view the report
describe('Test Suite for App Component', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  afterAll(() => window.fetch.mockClear())
  // To set up a mock for more than one call, do the following
  // const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }))

  test('renders overall UI correctly', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        cartID: "999999",
        cartItems: [
        ]
      }),
    })

    render(<App cartId={999999} />);
    await waitFor(() => screen.getByTestId('thanks_id'))
    const element = screen.getByText("Thank you for shopping with us!");
    expect(element).toBeInTheDocument();
  });

  test('renders header text', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        cartID: "777",
        cartItems: [
          {
            title: "TestItemOneTitle",
            description: "TestItemOneDesc",
            cost: 111,
            imageUrl: "https://m.media-amazon.com/images/I/51VCKN8qupL._AC_UL320_.jpg"
          },
          {
            title: "TestItemTwoTitle",
            description: "TestItemOneDesc",
            cost: 222,
            imageUrl: "https://m.media-amazon.com/images/I/51L5EzDC76L._AC_UY218_.jpg"
          }
        ]
      }),
    })

    render(<App cartId={777} />);
    expect(screen.getByText('Loading shopping cart...')).toBeInTheDocument();
    expect(await screen.findByTestId("cart_heading_id")).toBeInTheDocument(); // findBy is for asyncronous usage, such as an useEffect
    expect(screen.getByTestId('cart_heading_id')).toHaveTextContent('Shopping Cart')
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/carts/777", { "cache": "default", "method": "GET" });
    expect(screen.getByTestId('itemscost_id')).toHaveTextContent("Items: $3.33");
    // screen.debug();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  test('handles server error', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 404,
      ok: false,
      json: async () => ({
        message: "Error: Cart ID was not found",
        error: {}
      }),
    })

    render(<App cartId={0} />);
    expect(await screen.findByTestId("error_heading_id")).toHaveTextContent('Failed to retrieve cart (Error: Cart ID was not found)')
    expect(screen.queryByText("Shopping Cart")).toBeNull(); // Need to use queryBy because getBy would throw an error
  })

  test('radio button click shipping cost update is reflected', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        cartID: "999999",
        cartItems: [
          {
            title: "TestItemOneTitle",
            description: "TestItemOneDesc",
            cost: 111,
            imageUrl: "https://m.media-amazon.com/images/I/51VCKN8qupL._AC_UL320_.jpg"
          },
          {
            title: "TestItemTwoTitle",
            description: "TestItemOneDesc",
            cost: 222,
            imageUrl: "https://m.media-amazon.com/images/I/51L5EzDC76L._AC_UY218_.jpg"
          }
        ]
      }),
    })

    render(<App cartId={777} />);
    expect(await screen.findByTestId("cart_heading_id")).toBeInTheDocument();
    expect(screen.getByText(/^Order Total/)).toHaveTextContent("Order Total: $3.66");

    let freeRB = screen.getByTestId('radio-button-free');
    expect(freeRB.checked).toEqual(true);
    expect(freeRB).toHaveProperty('checked', true)
    expect(screen.getByTestId('radio-button-free')).toBeChecked()
    fireEvent.click(screen.getByText('$20.00 overnight shipping'))
    // await waitFor(() => screen.findByText(/^Order Total/))
    const overnightRB = screen.getByTestId('radio-button-overnight');
    expect(overnightRB.checked).toEqual(true);
    expect(freeRB.checked).toEqual(false);
    expect(screen.getByText(/^Order Total/)).toHaveTextContent("Order Total: $25.66");

    // fireEvent.change(input, { target: { value: 'a' } }) // For if you need to alter the text of an input element
    // expect(input.value).toBe('a')

    // expect(handleChange).toHaveBeenCalledTimes(1)

    // expect(screen.getByRole('button')).toHaveAttribute('disabled')
  });
});


// How about HTML anchor link href testing?
// expect(getByText("Click Me").href).toBe("https://www.test.com/")
// expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.test.com');
// const { getByTestId } = render(<a data-testid='link' href="https://test.com">Click Me</a>);
// expect(getByTestId('link')).toHaveAttribute('href', 'https://test.com');
// expect(document.querySelector("a").getAttribute("href")).toBe("/somewhere")

// How about a button if just want to make sure it was clicked?
// const onClick = jest.fn();
// const { getByText } = render(<Button onClick={onClick} />);
// fireEvent.click(getByText(/click me nao/i));
// expect(onClick).toHaveBeenCalled();

// Link to useful documentation, like RTL methods to find elements - get/find/query
// https://testing-library.com/docs/react-testing-library/cheatsheet

// Link to useful documentation on what can do with expect Jest calls from @testing-library/jest-dom
// https://github.com/testing-library/jest-dom
