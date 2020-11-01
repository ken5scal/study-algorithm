var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
////////// Frog Problem ////////
var node = [2, 9, 4, 5, 1, 6, 10];
var total_costs = __spreadArrays(Array(node.length)).map(function (_, i) { return 0; });
console.log("Frog Jumping Costs with node " + node + ": " + frog_jump(node));
function frog_jump(each_costs) {
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
