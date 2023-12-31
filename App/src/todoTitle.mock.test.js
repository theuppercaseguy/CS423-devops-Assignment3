import axios from 'axios';
import todoTitle from "./todoTitle";

jest.mock('axios');

describe('todoTitle', () => {
    afterEach(jest.clearAllMocks);

    test('return the first entry from the API', async () => {
        axios.get.mockResolvedValue({ data: { title: 'Tess Jedi' } });
        const result = await todoTitle(1);
        expect(result.title).toBe('Tess Jedi');
        expect(axios.get).toHaveBeenCalledTimes(1);
    });
});


// example from https://blog.jimmydc.com/mock-asynchronous-functions-with-jest/
