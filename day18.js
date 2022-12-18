'use strict'

const parseInput = input => input.split('\n').map(l => l.split(',').map(Number))

const solve = (isPart2, input) => {
    const neighbors = ([x, y, z]) => [[x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1]]

    const sumOfNeighbors = ([x, y, z]) => {
        const n = neighbors([x, y, z])
        return input.filter(([fx, fy, fz]) => n.some(([nx, ny, nz]) => nx == fx && ny == fy && nz == fz)).length
    }

    const coord = cube => cube.join(':')
    const cubes = new Set(input.map(coord))
    const dist = (a, b) => a.reduce((acc, cur, i) => acc + Math.abs(cur - b[i]), 0)
    const visited = new Set()
    const water = []

    const [min, max] = input.reduce(([min, max], cur) => [
        min.map((v, i) => Math.min(v, cur[i] - 1)),
        max.map((v, i) => Math.max(v, cur[i] + 1))
    ], [[100, 100, 100], [0, 0, 0]])

    const inRange = cube => cube.every((v, i) => v >= min[i] && v <= max[i])

    const floodFill = cube => {
        if (!visited.has(coord(cube))) {
            visited.add(coord(cube))
            water.push(cube)
            console.log([visited.size, water.length])
            for (const n of neighbors(cube)) {
                if (inRange(n) && !cubes.has(coord(n))) floodFill(n)
            }
        }
    }

    if (isPart2) {
        floodFill(min)
        return water.reduce((acc, w) => acc + input.filter(f => dist(w, f) == 1).length, 0)
    } else {
        return input.reduce((acc, cur) => acc + (6 - sumOfNeighbors(cur)), 0)
    }
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
