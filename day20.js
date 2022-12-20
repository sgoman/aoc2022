'use strict'

const solve = (isPart2, input) => {
    const key = isPart2 ? 811589153 : 1
	const initial = input.split('\n').map(v => v * key)
    const mixed = input.split('\n').map((v, i) => ({num: v * key, id: i}))
	const l = isPart2 ? 10 : 1, m = initial.length
	for (let j = 0; j < l; j++) {
        for (let i = 0; i < m; i++) {
            const id = mixed.findIndex(f => f.id === i)
            mixed.splice(id, 1)
            mixed.splice((initial[i] + id) % mixed.length, 0, {num: initial[i], id: i})
        }
	}
    const zero = mixed.findIndex(x => x.num === 0)
    return [1000, 2000, 3000].reduce((a, c) => a + mixed[(c + zero) % mixed.length].num, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
