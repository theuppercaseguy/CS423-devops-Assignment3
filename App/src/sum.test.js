import sum from './sum'

describe('Test Suite for sum function', () => {
  test('sum of two values is correct', () => {
    expect(sum(2, 4)).toBe(6);
  });

  const cases = [[2, 2, 4], [-2, -2, -4], [2, -2, 0]];
  test.each(cases)(
    "given %p and %p as arguments, returns %p",
    (firstArg, secondArg, expectedResult) => {
      const result = sum(firstArg, secondArg);
      expect(result).toEqual(expectedResult);
    }
  );

  test('sum of two real numbers with floating point precision', () => {
    expect(sum(0.1, 0.02)).toBe(0.12000000000000001);
  });
});
