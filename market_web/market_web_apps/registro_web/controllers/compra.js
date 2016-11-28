app
// =========================================================================
// Show View and Delete Compra 
// =========================================================================
    .controller("CompraCtrl", function($scope, $state, $stateParams, registroService, $window, $mdDialog, $log, toastr, $filter) {
    //Valores iniciales
    $scope.fields = 'trabajador';
    var params = {};
    $scope.lista = [];
    $scope.compra = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        registroService.Compra.query(params, function(r) {
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
            registroService.Compra.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó compra:" + JSON.stringify(d));
                toastr.success('Se eliminó compra ' + d.nombre, 'Compra');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update Compra
// =========================================================================
.controller("CompraSaveCtrl", function($scope, $state, $stateParams, registroService, $window, $mdDialog, $log, toastr, $filter) {
    //Valores iniciales
    $scope.compra = {};
    $scope.sel = function() {
        registroService.Compra.get({ id: $stateParams.id }, function(r) {
            $scope.compra = r;
            if (r.fecha_nac) $scope.compra.fecha_nacT = new Date($filter('date')(r.fecha_nac));
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        
        if ($scope.compra.id) {
            registroService.Compra.update({ id: $scope.compra.id }, $scope.compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó compra ' + r.nombre, 'Compra');
                $state.go('registro.registro.compraes');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            registroService.Compra.save($scope.compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó compra ' + r.nombre, 'Compra');
                $state.go('registro.registro.compraes');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }

    };

    $scope.cancel = function() {
        $state.go('registro.registro.compraes');



    };
});