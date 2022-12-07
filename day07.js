'use strict'

const solve = (isPart2, input) => {
	const sizes = {}
	const path = []
	input.trim().split('\n').forEach(l => {
		const words = l.trim().split(' ')
		if (words[0] == '$') {
			if (words[1] == 'cd') {
				if (words[2] == '..') {
					path.pop()
				} else {
					path.push(words[2])
				}
			}
		} else if (words[0] != 'dir') {
			const size = parseInt(words[0])
			for (let i = 0; i < path.length; i++) {
				let dir = path.slice(0, i + 1).join('/')
				if (dir.length > 1) dir = dir.substring(1)
				if (!sizes.hasOwnProperty(dir)) sizes[dir] = 0
				sizes[dir] += size
			}
		}
	})

	const needed = sizes['/'] - (70000000 - 30000000)

	return isPart2
		? Math.min(...Object.values(sizes).filter(f => f >= needed))
		: Object.values(sizes).filter(f => f <= 100000).reduce((a, c) => a + c, 0)
}

const part1 = input => solve(false, input)

const part2 = input => solve(true, input)

module.exports = { part1, part2 }
