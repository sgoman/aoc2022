'use strict'

const solve = (isPart2, input) => {
	const sizes = {}
	const path = []
	input.trim().split('\n').forEach(l => {
		const words = l.trim().split(' ')
		if (words[0] == '$' && words[1] == 'cd') {
			if (words[2] == '..') {
				path.pop()
			} else {
				path.push(words[2])
			}
		} else if (words[0] == '$' && words[1] == 'ls') {
			// ignore
		} else if (words[0] == 'dir') {
			// ignore
		} else {
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
	let result = (isPart2) ? Infinity : 0

	for (const v of Object.values(sizes)) {
		if (!isPart2 && v <= 100000) {
			result += v
		}
		if (isPart2 && v >= needed) {
			result = Math.min(result, v)
		}
	}

	return result
}

const part1 = input => {
  return solve(false, input)
}

const part2 = input => {
  return solve(true, input)
}

module.exports = { part1, part2 }
