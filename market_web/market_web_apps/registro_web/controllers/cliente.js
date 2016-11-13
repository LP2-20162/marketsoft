app
// =========================================================================
// Show View and Delete Autor 
// =========================================================================
    .controller("ClienteCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'nombre';
    var params = {};
    $scope.lista = [];
    $scope.cliente = {};

    $scope.list = function(params) {
        $scope.isLoading = true;
        RegistroService.Cliente.query(params, function(r) {
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
            RegistroService.Cliente.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó cliente:" + JSON.stringify(d));
                toastr.success('Se eliminó cliente ' + d.nombre, 'Cliente');
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
.controller("ClienteSaveCtrl", function($scope, $state, $stateParams, RegistroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.cliente = {};

    $scope.sel = function() {
        RegistroService.Cliente.get({ id: $stateParams.id }, function(r) {
            $scope.cliente = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.cliente.id) {
            RegistroService.Clienter.update({ id: $scope.cliente.id }, $scope.cliente, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó cliente ' + r.nombre, 'Cliente');
                $state.go('Registro.Registro.cliente');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            RegistroService.Cliente.save($scope.cliente, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó cliente ' + r.nombre, 'Cliente');
                $state.go('Registro.Registro.Cliente');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('Registro.Registro.cliente');


        
    };
});
