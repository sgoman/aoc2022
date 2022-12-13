'use strict'

const compare = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') return a - b

    if (typeof a === 'number') {
        a = [a]
    } else if (typeof b === 'number') {
        b = [b]
    }

    for (let i = 0, al = a.length, bl = b.length; i < al; i++) {
        if (i >= bl) return 1
        const c = compare(a[i], b[i])
        if (c !== 0) return c
    }

    return (a.length == b.length) ? 0 : -1
}

const part1 = input => input
    .split('\n\n')
    .map(l => l.split('\n').map(JSON.parse))
    .map(([a, b]) => +(compare(a, b) <= 0))
    .map((c, i) => c * (i + 1))
    .reduce((acc, cur) => acc + cur)

const part2 = input => {
    const dividers = [[[2]], [[6]]]
    const puzzle = input.split('\n').filter(f => f != '').map(JSON.parse)
    puzzle.push(...dividers)
    puzzle.sort(compare)
    return (puzzle.indexOf(dividers[0]) + 1) * (puzzle.indexOf(dividers[1]) + 1)
}

module.exports = { part1, part2 }
