'use strict'

const parseInput = input => input.split('\n').map(l => l.split(' '))

const change = x => ((x > 0) - (x < 0))

const solve = (k, input) => {
    const visited = new Set()
    const knots = []
    for(let n = 0; n < k; n++) knots.push({"r": 0, "c": 0})
    const dirs = {"U": [-1, 0], "R": [0, 1], "D": [1, 0], "L": [0, -1]}

    visited.add(`${knots[k - 1].r},${knots[k - 1].c}`)

    parseInput(input).forEach(([d, s]) => {
        s = parseInt(s)
        for (let i = 0; i < s; i++) {
            knots[0].r += dirs[d][0]
            knots[0].c += dirs[d][1]
            for (let j = 1; j < k; j++) {
                const head = knots[j - 1]
                const tail = knots[j]
                const dr = tail.r - head.r
                const dc = tail.c - head.c
                const diff = `${Math.abs(dr)},${Math.abs(dc)}`
                if (dr == 0 || dc == 0) {
                    if (Math.abs(dr) >= 2) {
                        tail.r -= change(dr)
                    }
                    if (Math.abs(dc) >= 2) {
                        tail.c -= change(dc)
                    }
                } else if (diff != '1,1') {
                    tail.r -= change(dr)
                    tail.c -= change(dc)
                }
            }
            visited.add(`${knots[k - 1].r},${knots[k - 1].c}`)
        }
    })

    return visited.size
}

const part1 = input => solve(2, input)

const part2 = input => solve(10, input)

module.exports = { part1, part2 }
