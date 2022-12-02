'use strict'

const worth = {"A": 1, "B": 2, "C": 3, "X": 1, "Y": 2, "Z": 3}

const outcomes = {
	"AX": 3,
	"AY": 6,
	"AZ": 0,
	"BX": 0,
	"BY": 3,
	"BZ": 6,
	"CX": 6,
	"CY": 0,
	"CZ": 3
}

const chosen = {
	"AX": "Z",
	"AY": "X",
	"AZ": "Y",
	"BX": "X",
	"BY": "Y",
	"BZ": "Z",
	"CX": "Y",
	"CY": "Z",
	"CZ": "X"
}

const evaluate = (their, mine) => outcomes[`${their}${mine}`]

const parseInput = input => {
    return input.split('\n').map(l => l.split(' '))
}

const solve = (isPart2, input) => {
    return parseInput(input).reduce((acc, [their, mine]) => acc + worth[isPart2 ? chosen[`${their}${mine}`] : mine] + evaluate(their, isPart2 ? chosen[`${their}${mine}`] : mine), 0)
}

const part1 = input => {
    return solve(false, input)
}

const part2 = input => {
    return solve(true, input)
}

module.exports = { part1, part2 }