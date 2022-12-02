'use strict'

const parseInput = input => {
	return input.split('\n\n').map(l => l.split('\n').map(v => parseInt(v)))
}

const solve = (tops, input) => parseInput(input).reduce((acc, cur) => {
		acc.push(cur.reduce((a, c) => a + c, 0))
		return acc
	}, [])
	.sort((a, b) => b - a)
	.slice(0, tops)
	.reduce((a, c) => a + c, 0)

const part1 = input => solve(1, input)

const part2 = input => solve(3, input)

module.exports = { part1, part2 }
