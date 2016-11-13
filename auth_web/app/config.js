var baseUrl = 'http://localhost:9000/';
var loginUrl = 'http://localhost:9001/auth_web/';
var iotecaUrl = 'http://localhost:9001/market_web/';


var clientId = 'bt3DF5yKjdIawl6nGPiHl0C0V1NkDYSDSU9Eq8U3';
var clientSecret = 'iFkN8OsIuwSri7tGgSeWrcBKKmSThvSmJkhGi3WifAwtjZ3wF2DbAYNVF3qqJRexDioU3yOvbewFdnvEg326yIsClfklpMs1TJEcBUz3zhN9lj37Ijzulquoh37eANad';
var grantType = 'password';

var config = {

    baseUrl: baseUrl,
    loginUrl: loginUrl,
    iotecaUrl: iotecaUrl,

    clientId: clientId,
    clientSecret: clientSecret,
    grantType: grantType,

};

app.value('config', config);

app
    .run(function($rootScope, $state, $stateParams, $window, loginService) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*******************************agregado**************************/
        console.log("run");

        if (loginService.authentication.isAuth === false) {
            $window.location = loginUrl;
        }
        /******************************************************************/

    })

.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$httpProvider.interceptors.push('authInterceptorService');
})

.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
