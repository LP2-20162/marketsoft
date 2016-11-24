app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("DistribuidorCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'nombre';
    var params = {};
    $scope.lista = [];
    $scope.distribuidor = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Distribuidor.query(params, function(r) {
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
            RegistroService.Distribuidor.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó distribuidor:" + JSON.stringify(d));
                toastr.success('Se eliminó distribuidor ' + d.nombre, 'Distribuidor');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update 
// =========================================================================
.controller("DistribuidorSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.distribuidor = {};

    $scope.sel = function() {
        RegistroService.Distribuidor.get({ id: $stateParams.id }, function(r) {
            $scope.distribuidor = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.distribuidor.id) {
            RegistroService.Distribuidor.update({ id: $scope.distribuidor.id }, $scope.distribuidor, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó distribuidor ' + r.nombre, 'Distribuidor');
                $state.go('registro.registro.distribuidor');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Distribuidor.save($scope.distribuidor, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó distribuidor ' + r.nombre, 'Distribuidor');
                $state.go('registro.registro.distribuidor');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('registro.registro.distribuidor');


        
    };
});
