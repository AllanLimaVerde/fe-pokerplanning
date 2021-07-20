export const getFibonacciNumbers = amount => {
  const result = [1, 2]

  for (let i = 0; i <= amount - 3; i++) {
    result.push(result[i] + result[i+1])
  }

  return result
}