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
    .otherwise({redirectTo: '/'});
  }
);

// REST Web API functions
function getAllBlogs($http) {
  return $http.get('/api/blogs');
}

function addBlog($http, data) {
  return $http.post('/api/blogs/', data);
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data) {
  return $http.put('/api/blogs/' + id, data);
}

function deleteBlogById($http, id) {
  return $http.delete('/api/blogs/' + id);
}

// Controllers
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.pageHeader = {
    title: "My Blog"
  };
  vm.message = "Welcome to Robert Slade's blog!";
});

app.controller('ListController', function ListController($http) {
  var vm =  this;
  vm.pageHeader =  {
    title: "Blogs"
  };
  getAllBlogs($http)
    .success(function(data) {
      vm.blogs = data;
      vm.message = "Blogs found!";
    })
    .error(function(e) {
      vm.message = "Couldn't retrieve blogs.";
    });
});

app.controller('AddController', [ '$http', '$location', function AddController($http, $location) {
  var vm = this;
  vm.blog = {}
  vm.pageHeader = {
    title: "Add Blog"
  };
  vm.submit = function() {
    var data = vm.blog;
    data.blogTitle = addForm.blogTitle.value;
    data.blogText = addForm.blogText.value;
    addBlog($http, data)
      .success(function(data) {
	vm.message = "Blog successfully created.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't add blog " + addForm.blogTitle.text + " " + addForm.blogText.text;
      });
  }
}]);

app.controller('EditController', [ '$http', '$routeParams', '$location', function EditController($http, $routeParams, $location) {
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
    updateBlogById($http, vm.id, data)
      .success(function(data) {
	vm.message = "Blog successfully updated.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't update blog with id of " + vm.id + editForm.blogTitle.text + " " + editForm.blogText.text;
      });
  }
}]);

app.controller('DeleteController', [ '$http', '$routeParams', '$location', function DeleteController($http, $routeParams, $location) {
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
    deleteBlogById($http, vm.id)
      .success(function(data) {
        vm.message = "Blog deleted.";
	$location.path('/bloglist').replace();
      })
      .error(function(e) {
	vm.message = "Couldn't delete blog with id of " + vm.id;
      });
  }
}]);
