'use strict'

const parseInput = input => {
    return input.split('\n').reduce((acc, cur, row) => {
        const startcol = cur.indexOf('S'), endcol = cur.indexOf('E')
        if (startcol != -1) {
            acc.start = [row, startcol]
            cur = cur.replace('S', 'a')
        }
        if (endcol != -1) {
            acc.end = [row, endcol]
            cur = cur.replace('E', 'z')
        }
        acc.heightmap.push(cur.split('').map(c => c.charCodeAt(0) - 96))
        return acc
    }, {"start": null, "end": null, "heightmap": []})
}

const solve = (isPart2, input) => {
    const h = input.heightmap.length, w = input.heightmap[0].length
    const q = [], s = new Set()
    if (isPart2) {
        for (let r = 0; r < h; r++) {
            for (let c = 0; c < w; c++) {
                if (input.heightmap[r][c] == 1) {
                    q.push([[r, c], 0])
                }
            }
        }
    } else {
        q.push([input.start, 0])
    }
    while (q.length) {
        const [p, d] = q.shift()
        const k = `${p[0]},${p[1]}`
        if (s.has(k)) continue
        s.add(k)
        if (p[0] == input.end[0] && p[1] == input.end[1]) return d
        for (const [r, c] of [[-1, 0], [0, 1], [1, 0], [0, -1]]) {
            const nr = p[0] + r, nc = p[1] + c
            if (nr >= 0 && nr < h && nc >= 0 && nc < w && input.heightmap[nr][nc] <= input.heightmap[p[0]][p[1]] + 1)
                q.push([[nr, nc], d + 1])
        }
    }
}

const part1 = input => {
  return solve(false, parseInput(input))
}

const part2 = input => {
  return solve(true, parseInput(input))
}

module.exports = { part1, part2 }
