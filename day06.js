'use strict'

const solve = (s, input) => {
    const chars = input.trim().split('')
    for (let i = 0, l = chars.length; i < l - s; i++) {
        const check = new Set(chars.slice(i, i + s))
        if (check.size == s) return i + s
    }
}

const part1 = input => solve(4, input)

const part2 = input => solve(14, input)

module.exports = { part1, part2 }
