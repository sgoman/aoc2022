'use strict'

const parseInput = input => input.split('\n\n').map(b => {
        const m = {}
        const l = b.split('\n')
        m.id = [...l[0].matchAll(/\d+/g)].map(p => parseInt(p[0]))[0]
        m.items = [...l[1].matchAll(/\d+/g)].map(p => parseInt(p[0]))
        const o = l[2].trim().split(' ')
        m.operand = o[4]
        m.amount = parseInt(o[5])
        m.divisible = parseInt(l[3].trim().split(' ')[3])
        m.positive = parseInt(l[4].trim().split(' ')[5])
        m.negative = parseInt(l[5].trim().split(' ')[5])
        return m
    })

const solve = (isPart2, input) => {
    let inspected = new Array(input.length).fill(0)
    const gcd = input.map(m => m.divisible).reduce((acc, cur) => acc * cur)
    for (let rounds = 0, maxi = isPart2 ? 10000 : 20; rounds < maxi; rounds++) {
        for (const monkey of input) {
            while(monkey.items.length) {
                let item = monkey.items.shift()
                const val = isNaN(monkey.amount) ? item : monkey.amount
                switch(monkey.operand) {
                    case '+': item += val; break
                    case '*': item *= val; break
                    default: console.log('unknown operand: ' + monkey)
                }
                inspected[monkey.id] += 1
                item = isPart2 ? item % gcd : Math.floor(item / 3)
                const rem = item % monkey.divisible
                input[rem ? monkey.negative : monkey.positive].items.push(item)
            }
        }
    }
    inspected.sort((a, b) => b - a)
    return inspected[0] * inspected[1]
}

const part1 = input => solve(false, parseInput(input))

const part2 = input => solve(true, parseInput(input))

module.exports = { part1, part2 }
