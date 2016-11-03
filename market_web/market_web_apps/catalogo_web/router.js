




/*
app
    .config(function($stateProvider, $urlRouterProvider, ROUTERS) {
        var collectionr = localStorage.getItem("collection");
        var routersStorage = JSON.parse(collectionr);
        console.log('routersStorage::' + JSON.stringify(routersStorage));

        // routersStorage.forEach(function(collection) { // para cargar del localStorage
        ROUTERS.forEach(function(collection) {
            for (var routeName in collection) {
                $stateProvider.state(routeName, collection[routeName]);
            }
        });
    });

app

    .config(function($stateProvider, $urlRouterProvider, ROUTERS2) {
    var collectionr = localStorage.getItem("collection");
    var collection = JSON.parse(collectionr);
    

    console.log('collection::' + JSON.stringify(collection));
    console.log('ROUTERS2::' + JSON.stringify(ROUTERS2));

    //collection = ROUTERS2;

    ROUTERS2.forEach(function(collection) {

        for (var routeName in collection) {
            //if (!$state.get(routeName)) {
            $stateProvider.state(routeName, collection[routeName]); // $stateProvider.state debe generarse aqui para no perder el foco
            //}
        }

    });

    //
})

;

app
    .provider("userService", function() {
        var privateUserList = [];
        this.addInitialUser = function(username, email, $http) {
            var persona = [{
                nombre: "pepe pito",
                edad: 20,
                locura: true
            }, {
                nombre: "pepe pito2",
                edad: 20,
                locura: true
            }];

            localStorage.setItem('personasx3', JSON.stringify(persona));
            //$http.get('http://localhost:9000/api/auths/usermenu/').then(function(r) {
            //    console.log(r.data);
            //});
            privateUserList.push({
                username: username,
                email: email
            });
            console.log('add ' + username);
        };
        this.$get = function() {
            return {
                users: function() {
                    return [].concat(privateUserList);
                },
                addUser: function(username, email) {
                    privateUserList.push({
                        username: username,
                        email: email
                    });
                }
            };
        };
    });

app.provider('foo', function() { //http://jsbin.com/qidedunuyi/1/edit?html,js,output
    return {
        $get: function() {
            var thisIsPrivate = "Private";
            function getPrivate() {
                return thisIsPrivate;
            }
            return {
                variable: "This is public",
                getPrivate: getPrivate
            };
        }
    };
});

app
    .run(function($rootScope, $state, $stateParams, $window, authService, userService) {
        console.log('userService::' + JSON.stringify(userService.users()));
        authService.fillAuthData();
    })

.config(function($stateProvider, $urlRouterProvider, ROUTERS, userServiceProvider) {

    userServiceProvider.addInitialUser("admin", "admin@example.com");
    var persona = localStorage.getItem("personasx3");
    var personaGuardada = JSON.parse(persona);
    console.log(personaGuardada.locura); //true

    console.log('persona::' + persona);
    console.log('Provider::' + JSON.stringify(userServiceProvider));

    $stateProvider
    //==================================
    // catalogo layout base
    //==================================
        .state('catalogo', {
        url: '/catalogo',
        views: {
            '': {
                templateUrl: 'app/views/layout.html'
            },
            'aside': {
                templateUrl: 'app/views/aside.html'
            },
            'content': {
                templateUrl: 'app/views/content.html'
            }
        }
    });
    ROUTERSr = ROUTERS;
    angular.forEach(ROUTERSr, function(section) {
        //==================================
        // catalogo catalogo page example
        //==================================
        $stateProvider.state(section.state, {
            url: section.url,
            template: '<div ui-view ></div>'
        });

        angular.forEach(section.items, function(item) {
            //==================================
            // url categorias, autores, etc. example
            //==================================
            $stateProvider.state(item.state, {
                url: item.url,
                data: { section: item.section, page: item.page },
                templateUrl: item.templateUrl
            });
        });
    });

});




var base = angular.module('myAppBaseModule', []);
base.factory('Foo', function() {
    console.log("Foo");
    var Foo = function(name) { this.name = name; };
    Foo.prototype.hello = function() {
        return "Hello from factory instance " + this.name;
    };
    return Foo;
});
base.service('serviceFoo', function() {
    this.hello = function() {
        return "Service says hello";
    };
    return this;
});

app
    .run(function($rootScope, $state, $stateParams, $window, authService, serviceFoo) {
        authService.fillAuthData();
        console.log('serviceFoo.hello():' + serviceFoo.hello() );
    })

.config(function($stateProvider, $urlRouterProvider, ROUTERS, $provide, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    
    var base = angular.injector(['myAppBaseModule']);
    $provide.constant('Foo', base.get('Foo'));
    $provide.constant('serviceFoo', base.get('serviceFoo'));



*/
