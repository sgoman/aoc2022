'use strict'

const parseInput = input => input.split('\n').filter(f => f.startsWith('move')).map(l => Array.from(l.matchAll(/\d+/g)).map(v => parseInt(v[0])))

const generateStartConfig = () => [
    [],
    ['S', 'Z', 'P', 'D', 'L', 'B', 'F', 'C'],
    ['N', 'V', 'G', 'P', 'H', 'W', 'B'],
    ['F', 'W', 'B', 'J', 'G'],
    ['G', 'J', 'N', 'F', 'L', 'W', 'C', 'S'],
    ['W', 'J', 'L', 'T', 'P', 'M', 'S', 'H'],
    ['B', 'C', 'W', 'G', 'F', 'S'],
    ['H', 'T', 'P', 'M', 'Q', 'B', 'W'],
    ['F', 'S', 'W', 'T'],
    ['N', 'C', 'R']
]

const crane = (stacks, moves, isPart2) => {
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
    let ret = ''
    for(const stack of stacks) {
        if (stack.length) {
            ret += stack.pop()
        }
    }
    return ret
}

const part1 = input => crane(generateStartConfig(), parseInput(input), false)

const part2 = input => crane(generateStartConfig(), parseInput(input), true)

module.exports = { part1, part2 }
