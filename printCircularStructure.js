// Source: https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format#answer-11616993

let $scope = window.angular.element('[ng-controller=AppController]').scope();

function printCircularStructure(circ){
    // Note: cache should not be re-used by repeated calls to JSON.stringify.
    var cache = [];
    return JSON.stringify(circ, (key, value) => {
    if (typeof value === 'object' && value !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;
        // Store value in our collection
        cache.push(value);
    }
    return value;
    }, 2);
}

//console.log(printCircularStructure($scope));

export {printCircularStructure};