var app = angular.module('bloggerApp', ['ngRoute']);

// Angular providers
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/index.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .when('/bloglist', {
      templateUrl: 'pages/bloglist.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/blogadd', {
      templateUrl: 'pages/blogadd.html',
      controller: 'AddController',
      controllerAs: 'vm'
    })
    .when('/blogedit/:id', {
      templateUrl: 'pages/blogedit.html',
      controller: 'EditController',
      controllerAs: 'vm'
    })
    .when('/blogdelete/:id', {
      templateUrl: 'pages/blogdelete.html',
      controller: 'DeleteController',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .otherwise({redirectTo: '/'});
  }
);

// REST Web API functions
function getAllBlogs($http) {
  return $http.get('/api/blogs');
}

function addBlog($http, data, authentication) {
  return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }} );
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data, authentication) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer ' + authentication.getToken() }} );
}

function deleteBlogById($http, id, authentication) {
  return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer ' + authentication.getToken() }} );
}

// Controllers
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.pageHeader = {
    title: "My Blog"
  };
  vm.message = "Welcome to Robert Slade's blog!";
});

app.controller('ListController', [ '$http', 'authentication', function ListController($http, authentication) {
  var vm =  this;
  vm.pageHeader =  {
    title: "Blogs"
  };
  vm.isLoggedIn = authentication.isLoggedIn();
  vm.currentUser = authentication.currentUser();
  getAllBlogs($http)
    .success(function(data) {
      vm.blogs = data;
      vm.message = "Blogs found!";
    })
    .error(function(e) {
      vm.message = "Couldn't retrieve blogs.";
    });
}]);

app.controller('AddController',  [ '$http', '$location', 'authentication', function AddController($http, $location, authentication) {
  var vm = this;
  vm.blog = {}
  vm.pageHeader = {
    title: "Add Blog"
  };
  vm.submit = function() {
    var data = vm.blog;
    data.blogTitle = addForm.blogTitle.value;
    data.blogText = addForm.blogText.value;
    data.name = authentication.currentUser().name;
    data.email = authentication.currentUser().email;
    addBlog($http, data, authentication)
      .success(function(data) {
	vm.message = "Blog successfully created.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't add blog " + addForm.blogTitle.text + " " + addForm.blogText.text + " " + authentication.currentUser().name + " " + authentication.currentUser().email;
      });
  }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.pageHeader = {
    title: "Edit Blog"
  };
  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      vm.message = "Blog successfully retrieved.";
    })
    .error(function(e) {
      vm.message = "Couldn't get blog with id of " + vm.id;
    });
  vm.submit = function() {
    var data = vm.blog;
    data.blogTitle = editForm.blogTitle.value;
    data.blogText = editForm.blogText.value;
    data.comment = editForm.comment.value;
    updateBlogById($http, vm.id, data, authentication)
      .success(function(data) {
	vm.message = "Blog successfully updated.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't update blog with id of " + vm.id + editForm.blogTitle.text + " " + editForm.blogText.text + " " + editForm.comment.text;
      });
  }
}]);

app.controller('DeleteController', [ '$http', '$routeParams', '$location', 'authentication', function DeleteController($http, $routeParams, $location, authentication) {
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.pageHeader = {
    title: "Delete Blog"
  };
  getBlogById($http, vm.id)
    .success(function(data) {
      vm.blog = data;
      vm.messsage = "Blog successfully retrieved.";
    })
    .error(function(e) {
      vm.message = "Couldn't get blog with id of " + vm.id;
    });
  vm.submit = function() {
    deleteBlogById($http, vm.id, authentication)
      .success(function(data) {
        vm.message = "Blog deleted.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't delete blog with id of " + vm.id;
      });
  }
}]);
