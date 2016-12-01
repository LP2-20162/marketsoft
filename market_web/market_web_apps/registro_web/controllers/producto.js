app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("ProductoCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'nombre';
    var params = {};
    $scope.lista = [];
    $scope.producto = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Producto.query(params, function(r) {
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
            RegistroService.Producto.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó producto:" + JSON.stringify(d));
                toastr.success('Se eliminó producto ' + d.nombre, 'Producto');
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
.controller("ProductoSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.producto = {};

    $scope.sel = function() {
        RegistroService.Producto.get({ id: $stateParams.id }, function(r) {
            $scope.producto = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.producto.id) {
            RegistroService.Producto.update({ id: $scope.producto.id }, $scope.producto, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó producto ' + r.nombre, 'Producto');
                $state.go('Registro.Registro.producto');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Producto.save($scope.producto, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó producto ' + r.nombre, 'Producto');
                $state.go('Registro.Registro.producto');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('Registro.Registro.producto');


        
    };
});
