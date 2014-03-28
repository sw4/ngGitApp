var ngGa = angular.module('ngGa', []);
ngGa.user="sw4";
ngGa.controller("gitListController", ['$scope', 'gitFactory', '$timeout', function ($scope, gitFactory, $timeout) {
    $scope.getRepos= function(user){
        gitFactory.fetch(user, 'repos').then(function (response) {        
            var repos=_(response.data.data).sortBy(function(obj) { return obj.updated_at }).reverse();
            angular.forEach(repos, function(repo){
                repo.timeago=$.timeago(repo.updated_at);
            });
            $timeout(function(){
                $scope.repos=repos;
            });                
        });
    }    
}]);
ngGa.factory('gitFactory', ['$http', '$timeout', function ($http, $timeout) {
    var factory = {
        fetch : function (user, type) {
            return $http.jsonp('https://api.github.com/users/'+user+'/'+type+'?callback=JSON_CALLBACK').success(function (data) {
                return data;
            }).error(function (e) {
                return e;
            });
        }
    };
    return factory;    
}]);