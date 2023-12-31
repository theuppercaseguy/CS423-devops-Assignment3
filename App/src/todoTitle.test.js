import todoTitle from "./todoTitle";

test('should return the first name from the api', async () => {
    const result = await todoTitle(1);
    expect(result.title).toBe('delectus aut autem');
});

