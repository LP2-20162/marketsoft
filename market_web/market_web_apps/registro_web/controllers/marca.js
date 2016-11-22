app
// =========================================================================
// 
// =========================================================================
    .controller("MarcaCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'nombre';
    var params = {};
    $scope.lista = [];
    $scope.marca = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Marca.query(params, function(r) {
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
            RegistroService.Marca.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó marca:" + JSON.stringify(d));
                toastr.success('Se eliminó marca ' + d.nombre, 'Marca');
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
.controller("MarcaSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.marca = {};

    $scope.sel = function() {
        RegistroService.Marca.get({ id: $stateParams.id }, function(r) {
            $scope.marca = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.marca.id) {
            RegistroService.Marca.update({ id: $scope.marca.id }, $scope.marca, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó marca ' + r.nombre, 'Marca');
                $state.go('Registro.Registro.marca');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Marca.save($scope.marca, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó marca ' + r.nombre, 'Marca');
                $state.go('Registro.Registro.marca');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('Registro.Registro.marca');


        
    };
});
