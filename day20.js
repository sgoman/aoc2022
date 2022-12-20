'use strict'

const parseInput = (input, mul) => input.split('\n').map(Number)

const solve = (isPart2, input) => {
	input = parseInput(input, isPart2 ? 811589153 : 1)
	const mixed = input.map((n, i) => [n, i]), l = isPart2 ? 10 : 1, m = mixed.length
	for (let j = 0; j < l; j++) {
		console.log([input.slice(0, 3), mixed.slice(0, 3)])
		for (let x = 0; x < m; x++) {
			const i = mixed.findIndex(f => f[1] == x)
			const n = mixed[i][0]
			mixed.splice(i, 1)
			mixed.splice((i + n) % m, 0, [n, x])
		}
	}
	console.log(mixed.slice(0, 3))
	return mixed.map(e => e[0])
}

const calcCoords = mixed => {
	const zero = mixed.findIndex(f => f == 0), m = mixed.length
	console.log([zero, mixed[zero], m, (zero + 1000) % m, (zero + 2000) % m,mixed[(zero + 1000) % m] , mixed[(zero + 2000) % m] , mixed[(zero + 3000) % m]])
	return mixed[(zero + 1000) % m] + mixed[(zero + 2000) % m] + mixed[(zero + 3000) % m]
}

const part1 = input => calcCoords(solve(false, input))

const part2 = input => calcCoords(solve(true, input))

module.exports = { part1, part2 }
