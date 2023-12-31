import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ZipcodeEntry from './zipcodeEntry';

describe('Test Suite for CartView Component', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  afterAll(() => window.fetch.mockClear())

  test('zipcode update is reflected in new tax calculation', async () => {
    window.fetch.mockResolvedValueOnce({
      status: 200,
      ok: true,
      json: async () => ({
        zipcode: "12345",
        taxrate: .1
      }),
    })

    render(<ZipcodeEntry zipcode={12345} onChangeTax={()=>{}} />);
  });
});
