import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App';

jest.mock("./cartItem", () => {
  return function DummyCartItem(props) {
    return (
      <div data-testid="dummycartitem">
        Dummy CartItem
      </div>
    );
  };
});

describe('Test Suite for App Component', () => {
  beforeAll(() => jest.spyOn(window, 'fetch'))
  afterAll(() => window.fetch.mockClear())

  test('renders with mocked out CartItem', async () => {
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
          }
        ]
      }),
    })

    render(<App cartId={777} />);
    expect(await screen.findByTestId("dummycartitem")).toBeInTheDocument();
    expect(screen.getByTestId('dummycartitem')).toHaveTextContent('Dummy CartItem')
  });
});

//XXXXXXXXXXXXXXXXXXXXXXXXXX
// To mock a function of a returned module like the os module of Node.js
// jest.mock('os', () => {
//   return { hostname: () => 'my-computer' }
// })


// import { loadStripe } from '@stripe/stripe-js';
// jest.mock('@stripe/stripe-js', () => {
//   return {
//     loadStripe: () => {
//       // TODO: Console log the "result" from an actual run and copy here
//       return Promise.resolve({})
//     }
//   };
// });

// Shows mock of the aws-sdk SQS object and functions found on that.
// var AWS = require('aws-sdk');
// const FakeSQS = jest.fn(() => ({
//   receiveMessage: jest.fn((paramscancel, cb) => {
//     // throw new Error('Test error');
//     setImmediate(() => {
//       return cb(null,
//         {
//           "ResponseMetadata": {
//             "RequestId": "7b2d9ba3-4395-5d9a-8d2f-ccc460220805"
//           }
//         });
//     })
//   }),
//   sendMessage: jest.fn((params, cb) => {
//     // throw new Error('Test error');
//     setImmediate(() => {
//       return cb(null,
//         {
//           "ResponseMetadata": {
//             "RequestId": "f38f44a5-f10c-59ac-8300-13c2d2c2c678"
//           },
//           "MD5OfMessageBody": "80148b94de01a2a26976475590570f3c",
//           "MessageId": "624b39d0-3ff4-48b5-a297-19a5158d7a9b",
//           "SequenceNumber": "18854449398826223616"
//         });
//     })
//   })
// }));
// AWS.SQS = FakeSQS;

// // now in the real code deeper in some file called from a test, the following gets the mock
// var AWS = require('aws-sdk');
// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID_2,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_2,
//   region: 'us-east-1'
// });
// sqs = new AWS.SQS();
// sqs.sendMessage(params, (error, data) => { ...
// sqs.receiveMessage(paramscancel, function (err, data) { ...

// // Back in the test code
// jest.clearAllMocks();

