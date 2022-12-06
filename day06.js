'use strict'

const solve = (s, input) => {
    const chars = input.trim().split('')
    for (let i = s, l = chars.length; i < l; i++) {
        if (new Set(chars.slice(i - s, i)).size == s) return i
    }
}

const part1 = input => solve(4, input)

const part2 = input => solve(14, input)

module.exports = { part1, part2 }
