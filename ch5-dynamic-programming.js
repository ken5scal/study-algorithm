var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
////////// Frog Problem ////////
var inf = Math.pow(10, 1000);
var node = [2, 9, 4, 5, 1, 6, 10];
console.log("Frog Jumping Costs with node [" + node + "]: " + frog_jump(node));
console.log("Frog Jumping Costs with node [" + node + "] using relaxation: " + frog_jump_with_relaxation(node));
console.log("Frog Jumping Costs (push based) with node [" + node + "]: " + frog_jum_push_based(node));
console.log("Frog Jumping Costs with node [" + node + "] using recursion: " + frog_jump_recursion(node.length - 1));
var memo_ch5 = __spreadArrays(Array(node.length)).map(function (_, i) { return inf; });
console.log("Frog Jumping Costs with node [" + node + "] using memo-recursion: " + frog_jump_memo_recursion(node.length - 1));
console.log("napsack: " + napsack([2, 1, 3, 2, 1, 5], [3, 2, 6, 1, 3, 85], 15));
function napsack(weights, values, maxWeight) {
    var initial_values = __spreadArrays(Array(maxWeight)).map(function (_, i) { return 0; });
    var total_costs = __spreadArrays(Array(weights.length)).map(function (_, i) { return initial_values; });
    for (var i = 0; i <= values.length; i++) {
        for (var w = 0; w <= maxWeight; w++) {
            if (w - weights[i] >= 0) {
                console.log("currently: " + i + ", " + w);
                console.log("currently: " + total_costs);
                changeMax(total_costs[i + 1][w], total_costs[i][w - weights[i]] + values[i]);
            }
            changeMax(total_costs[i + 1][w], total_costs[i][w]);
        }
    }
    return total_costs[values.length][maxWeight];
}
function frog_jump_memo_recursion(idx) {
    var result = memo_ch5[idx];
    if (result < inf) {
        return result;
    }
    else if (idx === 0) {
        return 0;
    }
    else if (idx === 1) {
        return Math.abs(node[idx] - node[idx - 1]); //+ 0
    }
    result = changeMinRelaxation(result, frog_jump_recursion(idx - 1) + Math.abs(node[idx] - node[idx - 1]));
    // if ( idx > 1 ) { として、idx === 1 のチェックをなくすやり方もあり
    result = changeMinRelaxation(result, frog_jump_recursion(idx - 2) + Math.abs(node[idx] - node[idx - 2]));
    memo_ch5[idx] = result;
    return result;
}
function frog_jump_recursion(idx) {
    if (idx === 0) {
        return 0;
    }
    var result = Math.pow(10, 1000);
    result = changeMinRelaxation(result, frog_jump_recursion(idx - 1) + Math.abs(node[idx] - node[idx - 1]));
    if (idx > 1) {
        result = changeMinRelaxation(result, frog_jump_recursion(idx - 2) + Math.abs(node[idx] - node[idx - 2]));
    }
    return result;
}
function frog_jump(each_costs) {
    var total_costs = __spreadArrays(Array(each_costs.length)).map(function (_, i) { return Math.pow(10, 1000); });
    for (var i = 0; i < each_costs.length; i++) {
        if (i === 0) {
            total_costs[i] = 0;
        }
        else if (i === 1) {
            total_costs[i] = Math.abs(each_costs[i] - each_costs[i - 1]);
        }
        else {
            var prev = total_costs[i - 1] + Math.abs(each_costs[i] - each_costs[i - 1]);
            var prevPrev = total_costs[i - 2] + Math.abs(each_costs[i] - each_costs[i - 2]);
            total_costs[i] = Math.min(prev, prevPrev);
        }
    }
    return total_costs[each_costs.length - 1];
}
function frog_jum_push_based(costs) {
    var total_costs = __spreadArrays(Array(costs.length)).map(function (_, i) { return Math.pow(10, 1000); });
    total_costs[0] = 0;
    for (var i = 0; i < costs.length; i++) {
        if (i + 1 < costs.length) {
            total_costs[i + 1] = changeMinRelaxation(total_costs[i + 1], total_costs[i] + Math.abs(costs[i] - costs[i + 1]));
        }
        if (i + 2 < costs.length) {
            total_costs[i + 2] = changeMinRelaxation(total_costs[i + 2], total_costs[i] + Math.abs(costs[i] - costs[i + 2]));
        }
    }
    return total_costs[costs.length - 1];
}
function frog_jump_with_relaxation(costs) {
    var total_costs = __spreadArrays(Array(costs.length)).map(function (_, i) { return Math.pow(10, 1000); });
    total_costs[0] = 0;
    var calculatePrev = function (x) { return total_costs[x - 1] + Math.abs(costs[x] - costs[x - 1]); };
    var calculatePrevPrev = function (x) { return total_costs[x - 2] + Math.abs(costs[x] - costs[x - 2]); };
    for (var i = 1; i < costs.length; i++) {
        if (i === 1) {
            total_costs[i] = changeMinRelaxation(total_costs[i], calculatePrev(i));
        }
        else {
            total_costs[i] = changeMinRelaxation(calculatePrevPrev(i), calculatePrev(i));
        }
    }
    return total_costs[costs.length - 1];
}
function changeMinRelaxation(a, b) {
    return a > b ? b : a;
}
function changeMax(a, b) {
    return a > b ? a : b;
}
