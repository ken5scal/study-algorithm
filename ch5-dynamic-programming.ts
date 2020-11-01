
////////// Frog Problem ////////
let node = [2, 9, 4, 5, 1, 6, 10]
let total_costs = [...Array<number>(node.length)].map((_, i) => 0)
console.log(`Frog Jumping Costs with node $[{node}]: ${frog_jump(node)}`)

function frog_jump(each_costs: number[]): number{
    for (let i = 0; i < each_costs.length; i++) {
        if ( i === 0) {
            total_costs[i] = 0
        } else if ( i === 1) {
            total_costs[i] = Math.abs(each_costs[i] - each_costs[i - 1])
        } else {
            let prev = total_costs[i - 1] + Math.abs(each_costs[i] - each_costs[i - 1])
            let prevPrev = total_costs[i - 2] + Math.abs(each_costs[i] - each_costs[i - 2])
            total_costs[i] = Math.min(prev, prevPrev)
        }
    }
    return total_costs[each_costs.length - 1]
}
