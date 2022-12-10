'use strict'

const solve = (isPart2, input, regs) => {
    const end = Math.max(...regs.cycles)
    for (const l of input.split('\n')) {
        regs.ticks += 1
        regs.pos += 1
        regs.line += ([regs.pos -1, regs.pos, regs.pos + 1].includes(regs.x)) ? '#' : '.'
        if (regs.pos == 39) {
            regs.crt.push(regs.line)
            regs.line = ''
            regs.pos = -1
        }
        if (l == "noop") {
            // ignore
        } else {
            let [cmd, val] = l.split(' ')
            val = parseInt(val)
            if (cmd == 'addx') {
                regs.sigs += regs.cycles.includes(regs.ticks) ? regs.ticks * regs.x : 0
                regs.ticks += 1
                regs.pos += 1
                regs.line += ([regs.pos -1, regs.pos, regs.pos + 1].includes(regs.x)) ? '#' : '.'
                if (regs.pos == 39) {
                    regs.crt.push(regs.line)
                    regs.line = ''
                    regs.pos = -1
                }
                regs.x += val
            } else {
                console.log(`unknown instruction: ${l}`)
            }
        }
        regs.sigs += regs.cycles.includes(regs.ticks) ? regs.ticks * regs.x : 0
        if (!isPart2 && regs.ticks > end) return regs.sigs
    }
    return isPart2 ? regs.crt : regs.sigs
}

const part1 = input => solve(false, input, {"x": 1, "ticks": 1, "sigs": 0, "crt": [], "line": '', "pos": -1, "cycles": [20, 60, 100, 140, 180, 220]})

const part2 = input => solve(true, input, {"x": 1, "ticks": 1, "sigs": 0, "crt": [], "line": '', "pos": -1, "cycles": [20, 60, 100, 140, 180, 220]})

module.exports = { part1, part2 }
