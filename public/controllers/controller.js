var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {


    var refresh = function(){        
            $http.get("/bookstore").then(function(response){
                $scope.bookstore = response.data;
                $scope.book = null;
            });
        };

    refresh();    

    $scope.addBook = function(){
            console.log($scope.book);
            $http.post('/bookstore', $scope.book).then(function(response){
                console.log(response);
                refresh();
            });
    };

    $scope.removeBook = function(id){
        console.log(id);
        $http.delete('/bookstore/'+id).then(function(response){
            refresh();
        });
         
    };

    $scope.editBook = function(id){
        // console.log(id);
        //  $http.get('/bookstore/'+id).then(function(response){
        //       $scope.book = response.data;
        //      });
           var book = $scope.bookstore.filter(function(item) { return item._id === id;})[0];
           $scope.book = JSON.parse(JSON.stringify(book));
    };

    $scope.updateBook = function(){
        console.log($scope.book._id);
        $http.put('/bookstore/' + $scope.book._id, $scope.book).then(function(response){refresh()});
    };

    $scope.clearScope = function(){
        $scope.book = null;
    };

});

// app.controller('addBook', function($scope, $http) {     
//     $scope.addBook = function(){
//         console.log('addBook activated')
//     }
// });
