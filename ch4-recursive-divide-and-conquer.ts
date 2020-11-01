function addSection(s: string): string {
    return `------------------------- ${s} ----------------------------`
}
function sumToN(n: number): number {
    console.log(`called func(${n})`)

    if (n === 0) {
        return 0
    }
    
    let result = n + sumToN(n - 1)
    console.log(`sum to ${n}: ${result}`)
    return result
}

function gcd(m: number, n: number): number {
    if (n === 0) {
        return m
    }
    return gcd(n, m % n)
}

function fibo(n: number): number {
    console.log(`called fibo(${n})`)

    if ( n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    }

    let result = fibo(n - 1) + fibo(n - 2)
    console.log(`${n} items: ${result}`)
    return result
}

function fiboEfficient(n: number): number {
    let list = new Array(n)
    list[0] = 0
    list[1] = 1
    for (let i = 2; i <= n; i++) {
        list[i] = list[i-1] + list[i-2]
        console.log(`${n} items: ${list}`)
    }
    return list[n]
    // sum
    // return list.reduce((sum: number, element: number) => sum + element, 0)
}

var memo = [...new Array(50)].map((_,i) => -1);

function fiboWithCache(n: number): number {
    if ( n === 0 ) {
        return 0 
    } else if ( n === 1 ) {
        return 1
    }

    if (memo[n] != -1) {
        return memo[n]
    }

    memo[n] = fiboWithCache(n - 1) + fiboWithCache(n - 2)
    return memo[n]
}

function partialSum(i: number, w: number, elements: number[]): boolean {
    if ( i === 0) { //base case
        return w === 0
    }

    if ( partialSum(i - 1, w, elements) ) {
        return true
    }

    if ( partialSum(i - 1, w - elements[i - 1], elements) ) {
        return true
    }

    return false
}

sumToN(5)
console.log(addSection(`calculate gcd`))
console.log(`gcd(51, 15): ${gcd(51, 15)}`)
console.log(`gcd(15, 51): ${gcd(51, 15)}`)
console.log(addSection(`fibonacci`))
console.log(fibo(6))
console.log(addSection(`fibonacci more efficient`))
console.log(fiboEfficient(6))
console.log(fiboEfficient(49))
console.log(addSection(`fibonacci with cache`))
console.log(fiboWithCache(49))
console.log(addSection(`partial sum`))
console.log(partialSum(4, 14, [3, 2, 6, 5]))