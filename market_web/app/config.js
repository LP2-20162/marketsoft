var baseUrl = 'http://localhost:9000/';
var loginUrl = 'http://localhost:9001/auth_web/';

var config = {
    baseUrl: baseUrl,
    loginUrl: loginUrl,
};

app.value('config', config);

app
    .config(function($httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.interceptors.push('authInterceptorService');
    })

.run(function($rootScope, $state, $stateParams, $window, authService) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    /*******************************agregado**************************/
    //console.log("run");

    authService.fillAuthData();
    if (authService.authentication.isAuth === false) {
        //$window.location = loginUrl;
    }
    /******************************************************************/

})


.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
})

/*
angular.module('app').config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('YYYY-MM-DD');
    };
});

*/
.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.shortDays = [
        'Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'
    ];

    $mdDateLocaleProvider.formatDate = function(date) {
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return day + '/' + (monthIndex + 1) + '/' + year;
    };
})

.config(
    function($mdIconProvider, $$mdSvgRegistry) {
        // Add default icons from angular material para versiones no estables mayores a v1.0.9
        // la version v1.0.9 no necesita hacer esto
        $mdIconProvider
            .icon('md-close', $$mdSvgRegistry.mdClose)
            .icon('md-menu', $$mdSvgRegistry.mdMenu)
            .icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
    }
);



app.constant('ROUTERS_T', [{
    "estado.nombre.1": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    }

}, {
    "estado.nombre.2": {
        "url": "/url2",
        "data": {
            "section": "Menu name2",
            "page": "Menu item name2"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model2/index.html"
    }

}]);


app.constant('ROUTERS', [{
    "estado.nombre": {
        "url": "/url",
        "data": {
            "section": "Menu name",
            "page": "Menu item name"
        },
        "templateUrl": "appname_web_apps/appname_web/views/model/index.html"
    },

}, {
    "registro": {
        "url": "/registro",
        "views": {
            "": {
                "templateUrl": "app/views/layout.html"
            },
            "aside": {
                "templateUrl": "app/views/aside.html"
            },
            "content": {
                "templateUrl": "app/views/content.html"
            }
        }
    },
    "registro.registro": {
        "url": "/registro",
        "template": "<div ui-view ></div>"
    }
}, {
    "registro.registro.cliente": {
        "url": "/cliente",
        "data": {
            "section": "Registro",
            "page": "Cliente"
        },
        "templateUrl": "market_web_apps/registro_web/views/cliente/index.html"
    },
    "registro.registro.clienteNew": {
        "url": "/cliente/new",
        "data": {
            "section": "Registro",
            "page": "Cliente"
        },
        "templateUrl": "market_web_apps/registro_web/views/cliente/form.html"
    },
    "registro.registro.clienteEdit": {
        "url": "/cliente/:id/edit",
        "data": {
            "section": "Registro",
            "page": "Cliente"
        },
        "templateUrl": "market_web_apps/registro_web/views/cliente/form.html"
    }
}, {
    "registro.registro.producto": {
        "url": "/producto",
        "data": {
            "section": "Registro",
            "page": "Producto"
        },
        "templateUrl": "market_web_apps/registro_web/views/producto/index.html"
    },
    "registro.registro.productoNew": {
        "url": "/producto/new",
        "data": {
            "section": "Registro",
            "page": "Producto"
        },
        "templateUrl": "market_web_apps/registro_web/views/producto/form.html"
    },
    "registro.registro.productoEdit": {
        "url": "/producto/:id/edit",
        "data": {
            "section": "Registro",
            "page": "Producto"
        },
        "templateUrl": "market_web_apps/registro_web/views/producto/form.html"
    }

}, {
    "registro.registro.distribuidor": {
        "url": "/distribuidor",
        "data": {
            "section": "Registro",
            "page": "Distribuidor"
        },
        "templateUrl": "market_web_apps/registro_web/views/distribuidor/index.html"
    },
    "registro.registro.distribuidorNew": {
        "url": "/distribuidor/new",
        "data": {
            "section": "Registro",
            "page": "Distribuidor"
        },
        "templateUrl": "market_web_apps/registro_web/views/distribuidor/form.html"
    },
    "registro.registro.distribuidorEdit": {
        "url": "/distribuidor/:id/edit",
        "data": {
            "section": "Registro",
            "page": "Distribuidor"
        },
        "templateUrl": "market_web_apps/registro_web/views/distribuidor/form.html"
    }
},{
    "registro.registro.marca": {
        "url": "/marca",
        "data": {
            "section": "Registro",
            "page": "Marca"
        },
        "templateUrl": "market_web_apps/registro_web/views/Marca/index.html"
    },
    "registro.registro.marcaNew": {
        "url": "/marca/new",
        "data": {
            "section": "Registro",
            "page": "Marca"
        },
        "templateUrl": "market_web_apps/registro_web/views/marca/form.html"
    },
    "registro.registro.marcaEdit": {
        "url": "/marca/:id/edit",
        "data": {
            "section": "Registro",
            "page": "Marca"
        },
        "templateUrl": "market_web_apps/registro_web/views/marca/form.html"
    }
},{
    "registro.registro.compra": {
        "url": "/compra",
        "data": {
            "section": "Registro",
            "page": "Compra"
        },
        "templateUrl": "market_web_apps/registro_web/views/compra/index.html"
    },
    "registro.registro.compraNew": {
        "url": "/compra/new",
        "data": {
            "section": "Registro",
            "page": "Compra"
        },
        "templateUrl": "market_web_apps/registro_web/views/compra/form.html"
    },
    "registro.registro.compraEdit": {
        "url": "/compra:id/edit",
        "data": {
            "section": "Registro",
            "page": "Compra"
        },
        "templateUrl": "market_web_apps/registro_web/views/compra/form.html"
    }
},]);
