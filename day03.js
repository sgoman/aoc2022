'use strict'

const worth = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const part1 = input => input.split('\n')
        .map(l => [l.slice(0, l.length / 2), l.slice(l.length / 2)])
        .reduce((a, c) => {
            for(const s of c[0].split('')) {
                if (c[1].indexOf(s) != -1) {
                    return a + worth.indexOf(s)
                }
            }
        }, 0) 

const part2 = input => {
    const sacks = input.split('\n')
    let badges = 0 
    for (let i = 0; i < sacks.length; i += 3){
        for (const s of worth.split('')) {
            if (sacks[i].indexOf(s) != -1 && sacks[i + 1].indexOf(s) != -1 && sacks[i + 2].indexOf(s) != -1) {
                badges += worth.indexOf(s)
                break
            }
        }
    }
    return badges
}

module.exports = { part1, part2 }
