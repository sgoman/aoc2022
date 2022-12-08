'use strict'

const solve = (isPart2, input) => {
    const grid = input.split('\n').map(l => l.split('').map(Number))
    const h = grid.length, w = grid[0].length
    const dirs = [ [0, -1], [1, 0], [0, 1], [-1, 0] ]
    let result = 0

    const isVisible = (r, c) => {
        for (const [x, y] of dirs) {
            let tx = c + x, ty = r + y
            while (0 <= tx && tx < w && 0 <= ty && ty < h && grid[ty][tx] < grid[r][c]) {
                tx += x
                ty += y
            }
            if (!(0 <= tx && tx < w && 0 <= ty && ty < h)) return true
        }
        return false
    }

    const score = (r, c) => {
        let s = 1
        for (const [x, y] of dirs) {
            let cur = 0, tx = c + x, ty = r + y
            while (0 <= tx && tx < w && 0 <= ty && ty < h) {
                cur++
                if (grid[ty][tx] >= grid[r][c]) break
                tx += x
                ty += y
            }
            s *= cur
        }
        return s
    }

    for(let row = 0; row < h; row++) {
        for(let col = 0; col < w; col++) {
            if (isPart2) {
                result = Math.max(result, score(row, col))
            } else {
                result += isVisible(row, col)
            }
        }
    }

    return result
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
