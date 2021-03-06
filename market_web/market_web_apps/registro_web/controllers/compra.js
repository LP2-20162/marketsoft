app
// =========================================================================
// Show View and Delete Colegio 
// =========================================================================
    .controller("CompraCtrl", function($scope, $state, $stateParams, registroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.fields = 'codename';
    var params = {};
    $scope.lista = [];
    $scope.compra= {};

    
    //$window.location = "#" + $location.path();

    $scope.list = function(params) {
        $scope.isLoading = true;
        registroService.Compra.query(params, function(r) {
            $scope.lista = r;
            //$scope.options = r.options;
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
        if ($window.confirm("¿Estas seguro de eliminar?")) {
            registroService.Compra.delete({ id: d.id }, function(r) {
                $log.log("Se eliminó la compra:" + JSON.stringify(d));
                toastr.success('Se eliminó el compra ' + d.trabajador, 'Compra');
                $scope.list(params);
            }, function(err) {
                $log.log("Error in delete:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

})

// =========================================================================
// Create and Update Colegio
// =========================================================================
.controller("CompraSaveCtrl", function($scope, $state, $stateParams, registroService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.compra = {};
    $scope.distribuidor = [];
    $scope.marca = [];
    $scope.producto = [];
    


    $scope.getData = function(){
        

        registroService.Distribuidor.query(function(r){
            $scope.distribuidor = r;
        });
        registroService.Marca.query(function(r){
            $scope.marca = r;
        });
        registroService.Producto.query(function(r){
            $scope.producto = r;
        });
    };



    $scope.sel = function() {
        registroService.Compra.get({ id: $stateParams.id }, function(r) {
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
        if ($scope.compra.id) {
            registroService.Compra.update({ id: $scope.compra.id }, $scope.compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó el compra ' + r.id, 'Compra');
                $state.go('registro.registro.compra');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            registroService.Compra.save($scope.compra, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó el compra ' + r.id, 'Comprar');
                $state.go('registro.registro.compra');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('registro.registro.compra');
    };
});