'use strict'

const parseInput = input => {
	return input.split('\n\n').map(l => l.split('\n').map(v => parseInt(v)))
}

const solve = (isPart2, input) => {
	return input.reduce((acc, cur) => {
		const r = cur.reduce((a, c) => a + c, 0)
		return (r > acc) ? r : acc
	}, 0)
}

const part1 = input => {
	return solve(false, parseInput(input))
}

const part2 = input => {
	const vals = parseInput(input).reduce((acc, cur) => {
		const r = cur.reduce((a, c) => a + c, 0)
		acc.push(r)
		return acc
	}, [])
	vals.sort((a, b) => b - a)
	return vals.slice(0, 3).reduce((a, c) => a + c, 0)
}

module.exports = { part1, part2 }
