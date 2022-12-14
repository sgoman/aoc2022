'use strict'

const parseInput = input => {
    return input.split('\n').map(l => [...l.matchAll(/(\d+),(\d+)/g)].map(p => [parseInt(p[1]), parseInt(p[2])]))
}

const solve = (isPart2, input) => {
	const {minx, maxx, miny, maxy} = input.reduce((acc, cur) => {
		const limits = cur.reduce((a, c) => {
			a.minx = Math.min(a.minx, c[0])
			a.maxx = Math.max(a.maxx, c[0])
			a.miny = Math.min(a.miny, c[1])
			a.maxy = Math.max(a.maxy, c[1])
			return a
		}, {"minx": Infinity, "maxx": 0, "miny": Infinity, "maxy": 0})
		acc.minx = Math.min(acc.minx, limits.minx)
		acc.maxx = Math.max(acc.maxx, limits.maxx)
		acc.miny = Math.min(acc.miny, limits.miny)
		acc.maxy = Math.max(acc.maxy, limits.maxy)
		return acc
	}, {"minx": Infinity, "maxx": 0, "miny": Infinity, "maxy": 0})

	const w = isPart2 ? 1002 : maxx + 1
	const grid = []
	for (let r = 0; r <= maxy + 1; r++) {
		grid.push([])
		for (let c = 0; c <= w; c++) {
			grid[r].push(0)
		}
	}
	if (isPart2) {
		grid.push([])
		for (let c = 0; c <= w; c++) {
			grid[maxy + 2].push(1)
		}
	}

	for (const def of input) {
		if (def.length == 1) {
			grid[def[0][1]][def[0][0]] = 1
			continue
		}
		for (let i = 0; i < def.length - 1; i++) {
			const cur = def[i], next = def[i + 1]
			if (cur[1] == next[1]) {
				const r = cur[1]
				for (let c = Math.min(cur[0], next[0]), ce = Math.max(cur[0], next[0]); c <= ce; c++) {
					grid[r][c] = 1
				}
			} else {
				const c = cur[0]
				for (let r = Math.min(cur[1], next[1]), re = Math.max(cur[1], next[1]); r <= re; r++) {
					grid[r][c] = 1
				}
			}
		}
	}

	const isDone = ([r, c]) => isPart2 ? r == 0 && c == 500 : r >= maxy

	const avail = ([r, c]) => {
		for (const [nr, nc] of [[1, 0], [1, -1], [1, 1]]) {
			if (grid[r + nr][c + nc] == 0) return [r + nr, c + nc]
		}
		return null
	}
	let step = 0;
	while(true) {
		step++
		let p = [0, 500]
		let n = null 
		do {
			n = avail(p)
			if (n != null) p = n
		} while(n != null && !isDone(p))
		grid[p[0]][p[1]] = 2
		if (isDone(p)) {
			break
		}
	}

	for (let r = 0; r < grid.length; r++) {
		console.log(grid[r].slice(minx - 1, maxx + 2).join(''))
	}

	return step - !isPart2
}

const part1 = input => {
  return solve(false, parseInput(input))
}

const part2 = input => {
  return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
