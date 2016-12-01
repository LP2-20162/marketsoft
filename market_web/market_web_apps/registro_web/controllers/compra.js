app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("CompraCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'id';
    var params = {};
    $scope.lista = [];
    $scope.Compra = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Compra.query(params, function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
            $scope.isLoading = false;
        }, function(err) {
            $log.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
        });
    };
    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        params.fields = $scope.fields;
        params.query = $scope.query;
        $scope.list(params);
    };

    $scope.onReorder = function(order) { //TODO
        $log.log('Order: ' + order);
    };

    $scope.delete = function(d) {
        if ($window.confirm("Seguro?")) {
            RegistroService.Compra.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó Compra:" + JSON.stringify(d));
                toastr.success('Se eliminó Compra ' + d.nombre, 'Compra');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update Autor
// =========================================================================
.controller("CompraSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.Compra = {};

    $scope.sel = function() {
        RegistroService.Compra.get({ id: $stateParams.id }, function(r) {
            $scope.Compra = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.Compra.id) {
            RegistroService.Compra.update({ id: $scope.Compra.id }, $scope.Compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó Compra ' + r.nombre, 'Compra');
                $state.go('Registro.Registro.Compra');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Compra.save($scope.Compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó Compra ' + r.nombre, 'Compra');
                $state.go('Registro.Registro.Compra');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('Registro.Registro.Compra');


        
    };
});
