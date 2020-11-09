
////////// Frog Problem ////////
const inf = Math.pow(10, 1000)
let node = [2, 9, 4, 5, 1, 6, 10]
console.log(`Frog Jumping Costs with node [${node}]: ${frog_jump(node)}`)
console.log(`Frog Jumping Costs with node [${node}] using relaxation: ${frog_jump_with_relaxation(node)}`)
console.log(`Frog Jumping Costs (push based) with node [${node}]: ${frog_jum_push_based(node)}`)
console.log(`Frog Jumping Costs with node [${node}] using recursion: ${frog_jump_recursion(node.length - 1)}`)
let memo_ch5 = [...Array(node.length)].map((_, i)=> inf)
console.log(`Frog Jumping Costs with node [${node}] using memo-recursion: ${frog_jump_memo_recursion(node.length - 1)}`)
console.log(`napsack: ${napsack([2, 1, 3, 2, 1, 5], [3, 2, 6, 1, 3, 85], 15)}`)
console.log(`edit distance: ${edit_distance('logistic', 'algorithm')}`)

function edit_distance(s: string, t : string) :number {
    var distances:number[][] = []
    for (let x = 0; x <= s.length; x++) {
        let row:number[] = new Array<number>()
        for (let y = 0; y <= t.length; y++) {
            row.push(inf)
        }
        distances.push(row)
    }
    distances[0][0] = 0

    for (let i = 0; i <= s.length; i++) {
        for (let j = 0; j <= t.length; j++) {
            if ( i > 0 && j> 0) {

            }
            if (i > 0) {

            }
    
            if ( j > 0 ) {}
        }
    }
    return distances[s.length][t.length]
}
function napsack(weights:number[], values:number[], maxWeight: number): number {
    var total_costs:number[][] = []
    for (let x = 0; x <= values.length; x++) {
        let row:number[] = new Array<number>()
        for (let y = 0; y <= maxWeight; y++) {
            row.push(0)
        }
        total_costs.push(row)
    }

    for (let i = 0; i < values.length; i++) {
        for (let w = 0; w <=maxWeight ; w++) {
            if (w - weights[i] >= 0) {
                total_costs[i + 1][w] = changeMax(total_costs[i + 1][w],  total_costs[i][w - weights[i]] + values[i])
            }

            total_costs[i + 1][w] = changeMax(total_costs[i + 1][w], total_costs[i][w])
        }
    }

    return total_costs[values.length][maxWeight]
}
function frog_jump_memo_recursion(idx: number):number {
    let result = memo_ch5[idx]
    if (result < inf) {
        return result
    } else if ( idx === 0 ) {
        return 0 
    } else if (idx === 1) {
        return Math.abs(node[idx] - node[idx - 1]) //+ 0
    }

    result = changeMinRelaxation(result, frog_jump_recursion(idx - 1) + Math.abs(node[idx] - node[idx - 1]))
    // if ( idx > 1 ) { として、idx === 1 のチェックをなくすやり方もあり
    result = changeMinRelaxation(result, frog_jump_recursion(idx - 2) + Math.abs(node[idx] - node[idx - 2]))

    memo_ch5[idx] = result
    return result
}

function frog_jump_recursion(idx: number):number {
    if ( idx === 0 ) {
        return 0 
    }
    let result = Math.pow(10, 1000)
    result = changeMinRelaxation(result, frog_jump_recursion(idx - 1) + Math.abs(node[idx] - node[idx - 1]))

    if ( idx > 1 ) {
        result = changeMinRelaxation(result, frog_jump_recursion(idx - 2) + Math.abs(node[idx] - node[idx - 2]))
    }

    return result
}

function frog_jump(each_costs: number[]): number{
    let total_costs = [...Array<number>(each_costs.length)].map((_, i) =>  Math.pow(10, 1000))

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

function frog_jum_push_based(costs: number[]): number {
    let total_costs = [...Array<number>(costs.length)].map((_, i) =>  Math.pow(10, 1000))
    total_costs[0] = 0

    for (let i = 0; i < costs.length; i++) {
        if ( i + 1 < costs.length) {
            total_costs[i + 1] = changeMinRelaxation(total_costs[i + 1], total_costs[i] + Math.abs(costs[i] - costs[i + 1]))
        } 
        if ( i + 2 < costs.length) {
            total_costs[i + 2] = changeMinRelaxation(total_costs[i + 2], total_costs[i] + Math.abs(costs[i] - costs[i + 2]))
        }
    }
    
    return total_costs[costs.length - 1]
}

function frog_jump_with_relaxation(costs: number[]): number {
    let total_costs = [...Array<number>(costs.length)].map((_, i) =>  Math.pow(10, 1000))
    total_costs[0] = 0

    let calculatePrev = (x:number) => total_costs[x-1] + Math.abs(costs[x] - costs[x - 1])
    let calculatePrevPrev = (x:number) => total_costs[x-2] + Math.abs(costs[x] - costs[x - 2])

    for (let i = 1; i < costs.length; i++) {
        if ( i === 1) {
            total_costs[i] = changeMinRelaxation(total_costs[i], calculatePrev(i))
        } else {
            total_costs[i] = changeMinRelaxation(calculatePrevPrev(i), calculatePrev(i))
        }
    }
    return total_costs[costs.length - 1]
}

function changeMinRelaxation<T>(a: T, b: T): T {
    return a > b ? b : a
}

function changeMax<T>(a: T, b: T): T {
    return a > b? a:b
}
