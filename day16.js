'use strict'

const parseInput = input => input
	.split('\n')
	.map(l => {
		const rate = parseInt([...l.match(/(\d+)/)][1])
		const h = l.split(';')
		const name = [...h[0].match(/([A-Z][A-Z])/)][1]
		const destinations = [...h[1].match(/[A-Z][A-Z]/g)]
		return {name, rate, destinations, "open": name == 'AA' || rate == 0, "costs": {}}
	})

const solve = (isPart2, input) => {
	const valuables = input.filter(f => f.rate || f.name == 'AA')
	let total = 0

	const bfs = (destinations, target) => {
		let level = 1
		while(true) {
			const dests = new Set()
			for (const d of destinations) {
				if (d == target) {
					return level
				} else {
					for (const v of input.filter(f => f.name == d)[0].destinations) {
						dests.add(v)
					}
				}
			}
			destinations = [...dests]
			level++
		}
	}

	const bruteforce = (open, rate, cur, remaining, elephant) => {
		if (remaining <= 0) return

		total = Math.max(rate, total)
		const room = valuables.find(f => f.name == cur)

		if (open.includes(cur)) {
			for (const k of Object.keys(room.costs).filter(f => !open.includes(f))) {
				bruteforce(open, rate, k, remaining - room.costs[k], elephant)
			}
		} else {
			bruteforce([...open, cur], rate + room.rate * remaining, cur, remaining - 1, elephant)
			if (!elephant && isPart2) {
				bruteforce([...open, cur], rate + room.rate * remaining, 'AA', 25, true)
			}
		}
	}

	for (const v of valuables) {
		for (const w of valuables) {
			if (v.name != w.name) v.costs[w.name] = bfs(v.destinations, w.name)
		}
	}

	bruteforce(['AA'], 0, 'AA', isPart2 ? 25 : 29, false)
	return total
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
