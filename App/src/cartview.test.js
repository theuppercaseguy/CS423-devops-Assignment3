import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CartView from './cartview';

describe('Test Suite for CartView Component', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  afterAll(() => window.fetch.mockClear())

  test('shipping cost update is reflected', async () => {
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

    const { rerender } = render(<CartView shippingCost={0} cartId={999999} />);
    expect(await screen.findByTestId("cart_heading_id")).toBeInTheDocument();
    expect(screen.getByTestId('itemscost_id')).toHaveTextContent("Items: $3.33");

    // Now test that if the props changes that the UI will reflect the change, this will not actually
    // Cause the fetch to be called again!
    expect(screen.getByText(/^Order Total/)).toHaveTextContent("Order Total: $3.66");
    rerender(<CartView shippingCost={5} cartId={999999} />)
    expect(screen.getByText(/^Order Total/)).toHaveTextContent("Order Total: $3.72");
  });
});
