;

window.ng = window.angular;

var app = ng.module('app', ['ngMaterial', 'ngAnimate', 'angular-loading-bar']);

app.constant('config', {
  api: {
    base: 'http://api.gonomnom.in',
    url: function (slug) {
      return this.base + slug;
    }
  },
  pushstream: {
    host: 'api.gonomnom.in',
    port: 9080,
    modes: 'websocket|eventsource|stream'
  }
});

app.config([
  '$httpProvider', 'cfpLoadingBarProvider',
  function ($httpProvider, cfpLoadingBarProvider) {
    $httpProvider.defaults.headers.common['X-Device-Id'] = 'web';
    $httpProvider.defaults.headers.common['X-Device-Type'] = 'browser';
    $httpProvider.defaults.headers.common['X-Push-Id'] = 'random';

    cfpLoadingBarProvider.includeSpinner = false;
    
    $httpProvider.interceptors.push([
      '$q', '$rootScope',
      function ($q, $rootScope) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401 : $rootScope.$broadcast('unauthorized', rejection); break;
              case 403 : $rootScope.$broadcast('forbidden', rejection); break;
              default  : console.log(rejection)
            }
            
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);
;

window.ng = window.angular;

var app = ng.module('app', ['ngMaterial', 'ngAnimate', 'angular-loading-bar']);

app.constant('config', {
  api: {
    base: 'http://api.gonomnom.in',
    url: function (slug) {
      return this.base + slug;
    }
  },
  pushstream: {
    host: 'api.gonomnom.in',
    port: 9080,
    modes: 'websocket|eventsource|stream'
  }
});

app.config([
  '$httpProvider', 'cfpLoadingBarProvider',
  function ($httpProvider, cfpLoadingBarProvider) {
    $httpProvider.defaults.headers.common['X-Device-Id'] = 'web';
    $httpProvider.defaults.headers.common['X-Device-Type'] = 'browser';
    $httpProvider.defaults.headers.common['X-Push-Id'] = 'random';

    cfpLoadingBarProvider.includeSpinner = false;
    
    $httpProvider.interceptors.push([
      '$q', '$rootScope',
      function ($q, $rootScope) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401 : $rootScope.$broadcast('unauthorized', rejection); break;
              case 403 : $rootScope.$broadcast('forbidden', rejection); break;
              default  : console.log(rejection)
            }
            
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);
ng.module('app').config([
  'modelsProvider',
  function (modelsProvider) {
    modelsProvider
      .define(
        'User',
        ['id', 'name', 'contact_number', 'agent_type', 'cogent_agent_id']
      )
  }
]);
// Register response data translators here.
// Translators only handle data from successful requests
// Whether a translator is run on a request or not is
// determined by running the method translator.test(method, url, options).
// If the test method is not defined on a translator, it is
// instantiated by default to :
// translator.test = function (method, url, options) {
//   return method === this.method && this.pattern.test(url);
// }

ng.module('app').config([
  'apiProvider',
  function (apiProvider) {
    apiProvider
      .translator(['models', function (models) {
        var userBuilder = function (data) {
          return models.User({
            id             : data.id,
            name           : data.name,
            contact_number : data.contact_number,
            agent_type     : data.agent_type,
            cogent_agent_id: data.cogent_agent_id
          });
        };

        
        return {
          method: 'POST',
          pattern: /^\/agent_login$/,
          translate: function (data) {
            return {
              access_token: data.auth_token,
              user: userBuilder(data)
            };
          }
        };
      }])
    ;
  }
]);
ng.module('app').controller(
  'login', [
    '$scope', '$timeout', 'auth',
    function ($scope, $timeout, auth) {
      $scope.loginData = {
        contact_number: ''
      };

      $scope.showErrorMsg = false;

      $scope.errors = {
        contact_number: null
      };

      $scope.attemptLogin = function () {
        auth.login($scope.loginData);
        $timeout(function () {
          $scope.showErrorMsg = true;
        }, 3000)
      };
    }
  ]
);
ng.module('app').controller(
  'login', [
    '$scope', '$timeout', 'auth',
    function ($scope, $timeout, auth) {
      $scope.loginData = {
        contact_number: ''
      };

      $scope.showErrorMsg = false;

      $scope.errors = {
        contact_number: null
      };

      $scope.attemptLogin = function () {
        auth.login($scope.loginData);
        $timeout(function () {
          $scope.showErrorMsg = true;
        }, 3000)
      };
    }
  ]
);
ng.module('app').controller('main', [
  '$scope',
  function ($scope) {
	 $scope.list = [
	 	{
		 name: "Spanish",
 		 type:"Cuisine"
 		},
 		{
		 name: "Spicy",
 		 type:"Food Type",
 		 options:["Med Spicy","High Spicy"]
 		},
 		{
		 name: "Chicken",
 		 type:"Dish",
 		 options:["Oily","Less Oily","Med Oily"]
 		}
	 ];
  }
   
]);


ng.module('app').controller('main', [
  '$scope',
  function ($scope) {
  
  }
]);
ng.module('app').controller('master', [
  '$scope', '$rootScope', 'auth', 'api', 'socket',
  function ($scope, $rootScope, auth, api, socket) {
    auth.load();

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.user = auth.getUser;
    $scope.token = auth.getToken;

    $scope.$on('loggedIn', function ($ev) {
      socket.connect($scope.user().cogent_agent_id);
      api.setCommonHeader('Token', $scope.token());
    });

    $scope.$on('unauthorized', function ($ev) {
      auth.logout();
    });

    $scope.$on('loggedOut', function (ev) {
      socket.disconnect();
    });

    if ($scope.isLoggedIn()) {
      $rootScope.$broadcast('loggedIn');
    }
  }
]);
ng.module('app').controller('master', [
  '$scope', '$rootScope', 'auth', 'api', 'socket',
  function ($scope, $rootScope, auth, api, socket) {
    auth.load();

    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.user = auth.getUser;
    $scope.token = auth.getToken;

    $scope.$on('loggedIn', function ($ev) {
      socket.connect($scope.user().cogent_agent_id);
      api.setCommonHeader('Token', $scope.token());
    });

    $scope.$on('unauthorized', function ($ev) {
      auth.logout();
    });

    $scope.$on('loggedOut', function (ev) {
      socket.disconnect();
    });

    if ($scope.isLoggedIn()) {
      $rootScope.$broadcast('loggedIn');
    }
  }
]);
ng.module('app').controller('nav', [
  '$scope',
  function ($scope) {
    
  }
]);
ng.module('app').controller('nav', [
  '$scope',
  function ($scope) {
    
  }
]);
// translators are functions which translate
// res data into appropriate data structures.
// They can be added to apiProvider via the method translator
// They are only called if the request succeeds and when
// the request method and url pattern matches their own.

ng.module('app')
  .provider('api', [
    'config',
    function (config) {
      var translators = [];
      var headers = {};

      this.setCommonHeader = function (key, val) {
        headers[key] = val;
        return this;
      };

      this.unsetCommonHeader = function (key) {
        delete headers[key];
        return this;
      }

      this.translator = function (translator) {
        translators.push(translator);
        return this;
      };

      // declaring like this to avoid minification conflict
      this['$get'] = [
        '$http', '$injector',
        function ($http, $injector) {
          var resolvedTranslators = translators.map(function (translator) {
            return $injector.invoke(translator);
          });

          var api = function (method, url, options) {

            options.url = url.indexOf('http') === 0 ? url : config.api.url(url) + '/';
            options.method = method;
            return $http(options).then(function (res) {
              var data = res.data;

              for (var i=0;i<resolvedTranslators.length;i++) {
                var translator = resolvedTranslators[i];

                if (! ng.isFunction(translator.test)) {
                  translator.test = function (method, url, options) {
                    return method === this.method && this.pattern.test(url);
                  };
                }

                if (translator.test(method, url, options)) {
                  return translator.translate(data);
                }
              }

              return data;
            });
          };

          ['GET', 'PUT', 'POST', 'DELETE'].forEach(function (method) {
            api[method.toLowerCase()] = function (url, options) {
              return api(method, url, options);
            };
          });

          api.setCommonHeader = function (key, val) {
            $http.defaults.headers.common[key] = headers[key];
          };

          api.unsetCommonHeader = function (key) {
            delete $http.defaults.headers[key];
          };

          Object.keys(headers).forEach(function (key) {
            api.setCommonHeader(key, val);
          });

          return api;
        }
      ];
    }
  ])
;
ng.module('app')
  .provider('auth', [
    'config',
    function (config) {
      this['$get'] = [
        '$rootScope', 'api',
        function ($rootScope, api) {
          var user = null;
          var token = null;

          var store = function (user, token) {
            localStorage.setItem('auth.user', JSON.stringify(user));
            localStorage.setItem('auth.token', token.toString());
          };

          var load = function () {
            if (localStorage.getItem('auth.token')) {
              token = localStorage.getItem('auth.token');
              api.setCommonHeader('Token', token.toString());
            }
            if (localStorage.getItem('auth.user')) {
              user = JSON.parse(localStorage.getItem('auth.user'));
            }
          };

          var unload = function () {
            token = null;
            user = null;
            localStorage.removeItem('auth.token');
            localStorage.removeItem('auth.user');
            api.unsetCommonHeader('Token');
          };

          var getUser = function () {
            return user;
          };

          var getToken = function () {
            return token;
          }
          
          var login = function (data) {
            return api.post('/agent_login', {
              data: data
            }).then(
              function (data) {
                store(data.user, data.access_token);
                load();
                $rootScope.$broadcast('loggedIn');
                data;
              },
              function (res) {
                unload();
                $rootScope.$broadcast('loginFailed', res);
              }
            );
          };

          var logout = function () {
            unload();
            $rootScope.$broadcast('loggedOut');
          };

          $rootScope.$on('unauthorized', function ($ev) {
            if (user !== null || token !== null) {
              logout();
            }
          });

          return {
            load: load,
            getUser: getUser,
            getToken: getToken,
            isLoggedIn: function () {
              return user !== null && token !== null;
            },
            login: login,
            logout: logout
          };
        }
      ];
    }
  ])
ng.module('app')
  .provider('models', [
    function () {
      var models = {};
      
      var modelBuilder = function (name, props, defaults) {
        // model builder accepts a list of properties a model shoudl have
        // and generates a model which will give an instance only if
        // all those properties have been supplied to it in its argument
        // object
        
        name = name.toString();
        if (! ng.isArray(props)) {
          throw 'props must be an array';
        }

        if (ng.isUndefined(defaults)) {
          defaults = {};
        }

        var Model = function (args) {
          var model = {};

          for (var k in args) {
            if (props.indexOf(k) === -1) {
              throw 'invalid property "'+k+'" supplied to model "'+name+'"';
            }
          }

          props.forEach(function (prop) {
            if (args.hasOwnProperty(prop)) {
              model[prop] = args[prop];
            } else if (defaults.hasOwnProperty(prop) && ng.isFunction(defaults[prop])) {
              model[prop] = defaults[prop]();
            }
          });

          return model;
        };

        Model.type = name;

        return Model;
      };

      this.define = function (name, props, defaults) {
        models[name] = modelBuilder(name, props, defaults);
        return this;
      };

      this['$get'] = [
        function () {
          return models;
        }
      ];
    }
  ]);
ng.module('app')
  .provider('socket', [
    'config',
    function (config) {
      var stream = new PushStream({
        host: config.pushstream.host,
        port: config.pushstream.port,
        modes: config.pushstream.modes
      });

      // declaring like this to avoid minification issues
      this['$get'] = [
        '$rootScope',
        function ($rootScope) {
          var socket = {
            connect: function (cogentAgentId) {
              stream.addChannel(cogentAgentId);
              stream.connect();

              stream._onmessage(function (data) {
                $rootScope.$broadcast('socket:data', data);
              });
            },

            disconnect: function () {
              stream.disconnect();
            }
          };

          return socket;
        }
      ];
    }
  ]);
/*
ng.module('app').run([
  'auth',
  function (auth) {
    auth.load();

    if (auth.isLoggedIn()) {

    } else {
      auth.login({
        contact_number: fizzz
      }).then(function () {
        console.log(auth.isLoggedIn());
      });
    }
  }
]);
*/