app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("VentaCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'id';
    var params = {};
    $scope.lista = [];
    $scope.Cabecera_Venta = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Cabecera_Venta.query(params, function(r) {
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
            RegistroService.Cabecera_Venta.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó Cabecera_Venta:" + JSON.stringify(d));
                toastr.success('Se eliminó Cabecera_Venta ' + d.id, 'Cabecera_Venta');
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
.controller("VentaSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.Cabecera_Venta = {};

    $scope.sel = function() {
        RegistroService.Cabecera_Venta.get({ id: $stateParams.id }, function(r) {
            $scope.Cabecera_Venta = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.Cabecera_Venta.id) {
            RegistroService.Cabecera_Venta.update({ id: $scope.Cabecera_Venta.id }, $scope.Cabecera_Venta, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó Venta ' + r.id, 'Venta');
                $state.go('Registro.Registro.Venta');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Cabecera_Venta.save($scope.Cabecera_Venta, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó Venta ' + r.id, 'Venta');
                $state.go('Registro.Registro.Venta');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('Registro.Registro.Venta');


        
    };
});