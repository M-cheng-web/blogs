const run = (matrix) => {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = x + 1; y < matrix.length; y++) {
      matrix[x][y] ^= matrix[y][x]
      matrix[y][x] ^= matrix[x][y]
      matrix[x][y] ^= matrix[y][x]
    }
    matrix[x].reverse()
  }
  console.log('matrix', matrix);
}

matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]

console.log(run(matrix));

[[1, 2, 3], [4, 5, 6], [7, 8, 9]]
[[1, 4, 7], [2, 5, 6], [3, 8, 9]]
[[1, 4, 7], [2, 5, 8], [3, 6, 9]] // 6 和 8 替换