'use strict'

const manhattan = (sx, sy, bx, by) => Math.abs(sx - bx) + Math.abs(sy - by)

const parseInput = input => input
	.split('\n')
	.map(l => [...l.matchAll(/(-?\d+)/g)].map(d => parseInt(d[0])))
	.map(([sx, sy, bx, by]) => {
		return {sx, sy, bx, by, "range": manhattan(sx, sy, bx, by)}
	})

const solve = (isPart2, input) => {
	const r = 2000000
	const result = new Set()
	const bx = new Set(input.filter(f => f.by == r).map(d => d.bx))
	const inRange = input
		.filter(f => manhattan(f.sx, f.sy, f.sx, r) <= f.range)
		.map(d => {
			const dist = d.range - Math.abs(r - d.sy)
			return {"xmin": d.sx - dist, "xmax": d.sx + dist}
		})
	for(const d of inRange) {
		for (let x = d.xmin; x <= d.xmax; x++) {
			result.add(x)
		}
	}
	return result.size - bx.size
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => {
	input = parseInput(input)
	for (let r = 0, maxi = input.length < 30 ? 20 : 4000000; r <= maxi; r++) {
		const inRange = input
			.filter(f => f.range >= Math.abs(r - f.sy))
			.map(d => {
				const dist = d.range - Math.abs(r - d.sy)
				return {"xmin": d.sx - dist, "xmax": d.sx + dist}
			})
		const ranges = []
		inRange.sort((a, b) => a.xmin - b.xmin)
		let prev = inRange[0]
		for (let i = 0; i < inRange.length; i++) {
			let cur = inRange[i]
			if (prev.xmax >= cur.xmin) {
				prev = {"xmin": prev.xmin, "xmax": Math.max(prev.xmax, cur.xmax)}
			} else {
				ranges.push(prev)
				prev = cur
			}
		}
		ranges.push(prev)
		if (ranges.length > 1 && ranges[1].xmin == ranges[0].xmax + 2) return {"part2": (ranges[0].xmax + 1) * 4000000 + r, r, ranges}
	}
	return "Ouch!"
}

module.exports = { part1, part2 }
