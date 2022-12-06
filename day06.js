'use strict'

const parseInput = input => {
    return input.trim().split('')
}

const solve = (isPart2, input) => {
    return input
}

const part1 = input => {
    const chars = parseInput(input)
    for (let i = 0, l = chars.length; i < l - 4; i++) {
        const check = new Set(chars.slice(i, i + 4))
        if (check.size == 4) {
            return i + 4
        }
    }
}

const part2 = input => {
    const chars = parseInput(input)
    for (let i = 0, l = chars.length; i < l - 14; i++) {
        const check = new Set(chars.slice(i, i + 14))
        if (check.size == 14) {
            return i + 14
        }
    }
}

module.exports = { part1, part2 }
