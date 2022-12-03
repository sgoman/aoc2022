'use strict'

const parseInput = input => {
    return input.split('\n')
        .map(l => [l.slice(0, l.length / 2), l.slice(l.length / 2)])
}

const worth = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const part1 = input => {
  return parseInput(input)
        .reduce((a, c) => {
            for(const s of c[0].split('')) {
                if (c[1].indexOf(s) != -1) {
                    a.push(s)
                    break
                }
            }
            return a
        }, []) 
        .reduce((a, c) => a + worth.indexOf(c), 0)
}

const part2 = input => {
    const rucksacks = parseInput(input)
    const badges = []
    for (let i = 0; i < rucksacks.length; i += 3){
        for (const s of worth.split('')) {
            if ((rucksacks[i][0] + rucksacks[i][1]).indexOf(s) != -1
                && (rucksacks[i + 1][0] + rucksacks[i + 1][1]).indexOf(s) != -1
                && (rucksacks[i + 2][0] + rucksacks[i + 2][1]).indexOf(s) != -1
            ) {
                badges.push(s)
                break
            }
        }
    }
    return badges.reduce((a, c) => a + worth.indexOf(c), 0)
}

module.exports = { part1, part2 }
