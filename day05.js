'use strict'

const parseInput = input => [
    readConfig(input.split('\n')),
    input.split('\n').filter(f => f.startsWith('move')).map(l => Array.from(l.matchAll(/\d+/g)).map(v => parseInt(v[0])))
]

const readConfig = input => {
    const stacks = [[],[],[],[],[],[],[],[],[],[]]
    for (const l of input.filter(f => f.startsWith('[')).reverse()) {
        const m = [...l.matchAll(/^.(.)...(.)...(.)...(.)...(.)...(.)...(.)...(.)...(.).$/g)]
        for (let i = 1; i < 10; i++) {
            if (m[0][i].search(/[A-Z]/) != -1) {
                stacks[i].push(m[0][i])
            }
        }
    }
    return stacks
}

const crane = (input, isPart2) => {
    const [stacks, moves] = parseInput(input)
    for (const [amount, source, target] of moves) {
        if (isPart2) {
            const tmp = []
            for (let a = 0; a < amount; a++) {
                tmp.push(stacks[source].pop())
            }
            while (tmp.length) {
                stacks[target].push(tmp.pop())
            }
        } else {
            for (let a = 0; a < amount; a++) {
                stacks[target].push(stacks[source].pop())
            }
        }
    }
    return stacks.reduce((acc, cur) => acc + ((cur.length) ? cur.pop() : ''), '')
}

const part1 = input => crane(input, false)

const part2 = input => crane(input, true)

module.exports = { part1, part2 }
