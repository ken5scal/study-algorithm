function addSection(s) {
    return "------------------------- " + s + " ----------------------------";
}
function sumToN(n) {
    console.log("called func(" + n + ")");
    if (n === 0) {
        return 0;
    }
    var result = n + sumToN(n - 1);
    console.log("sum to " + n + ": " + result);
    return result;
}
function gcd(m, n) {
    if (n === 0) {
        return m;
    }
    return gcd(n, m % n);
}
function fibo(n) {
    console.log("called fibo(" + n + ")");
    if (n === 0) {
        return 0;
    }
    else if (n === 1) {
        return 1;
    }
    var result = fibo(n - 1) + fibo(n - 2);
    console.log(n + " items: " + result);
    return result;
}
function fiboEfficient(n) {
    var list = new Array(n);
    list[0] = 0;
    list[1] = 1;
    for (var i = 2; i <= n; i++) {
        list[i] = list[i - 1] + list[i - 2];
        console.log(n + " items: " + list);
    }
    // sum
    // return list.reduce((sum: number, element: number) => sum + element, 0)
}
sumToN(5);
console.log(addSection("calculate gcd"));
console.log("gcd(51, 15): " + gcd(51, 15));
console.log("gcd(15, 51): " + gcd(51, 15));
console.log(addSection("fibonacci"));
console.log(fibo(6));
console.log(addSection("fibonacci more efficient"));
console.log(fiboEfficient(6));
