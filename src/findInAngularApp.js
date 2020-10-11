let $scope = window.angular.element('[ng-controller=AppController]').scope();
function _findInAngularApp(scope, key){
  if(scope[key]){
    return scope[key];
  }
  if(scope.$$childTail){
    let ret = _findInAngularApp(scope.$$childTail, key);
    if(ret !== undefined) return ret;
  }
  if(scope.$$prevSibling){
    let ret = _findInAngularApp(scope.$$prevSibling, key);
    if(ret !== undefined) return ret;
  }
}
//params = _findInAngularApp($scope, "searchParams");

function findInAngularApp(key){
  return _findInAngularApp($scope, key);
}

export {findInAngularApp};