var app = angular.module('flapperNews', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('home', {
            url:'/home',
            templateUrl:'/home.html',
            controller:'MainCtrl'
        })
            .state('posts',{
            url:'/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });
        // specifies what should happen if the app receives an undefined URL
        $urlRouterProvider.otherwise('home');
    } // END function $stateProvider
]); //END app.config

app.factory('posts', [function(){
    //creates a new object that has an array property called posts
    var o = {
        posts: []
    };
    // returns the variable so that the object is available to other Angular modules
    return o;
}]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts){

    $scope.test = 'Hello world!';

    // any modification made to $scope.posts will be stored in the service and is available to other modules
    $scope.posts = posts.posts;

    // function that adds posts
    $scope.addPost = function(){
        // prevents the user from submitting a blank title
        if ($scope.title === ''){
            return;
        }

        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes:0,
            comments:[
                {author: 'Jose', body:'Cool post!', upvotes: 0},
                {author: 'Fedora', body: 'Great idea but everything is wrong!', upvotes: 0}
            ]
        });

        // clears the form after user submits
        // also sets title to blank once it has been added to the posts array
        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function(post){
        post.upvotes +=1;

    };
}]); // END app.controller MainCtrl

app.controller('PostsCtrl', [
    '$scope',
    '$stateParams', //needed for id
    'posts',
    function($scope, $stateParams, posts){
        // grabs the appropriate posts from the posts service using the id from $stateParams
        $scope.post = posts.posts[$stateParams.id];

        $scope.addComment = function(){
            if($scope.body === ''){
                return;
            }

            $scope.post.comments.push({
                body: $scope.body,
                author:'user',
                upvotes: 0
            });
        };
        $scope.body = '';
    }
]);