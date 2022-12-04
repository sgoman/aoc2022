'use strict'

const parseInput = input => input.split('\n').map(l => Array.from(l.matchAll(/\d+/g)).map(v => parseInt(v[0])))

const part1 = input => parseInput(input).reduce((acc, [astart, aend, bstart, bend]) => 
        acc + ((astart <= bstart && aend >= bend) || (astart >= bstart && aend <= bend))
    , 0)

const part2 = input => parseInput(input).reduce((acc, [astart, aend, bstart, bend]) => 
    acc + !((aend < bstart) || (bend < astart))
    , 0)

module.exports = { part1, part2 }
