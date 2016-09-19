// Controller of menu dashboard page.
appControllers.controller('menuDashboardCtrl', function ($scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,$window) {
    //ShowToast for show toast when user press button.
    // $scope.showToast = function (menuName) {
    //     //Calling $mdToast.show to show toast.
    //     $mdToast.show({
    //         controller: 'toastController',
    //         templateUrl: 'toast.html',
    //         hideDelay: 800,
    //         position: 'top',
    //         locals: {
    //             displayOption: {
    //                 title: 'Going to ' + menuName + " !!"
    //             }
    //         }
    //     });
    // }// End showToast.
    
     
    // $scope.regurl='http://techplus.com.ng/agenda-2/';

    // $scope.Reglink = function (){
    //         $window.open($scope.regurl);
            
    //     }


    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: false
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.
});// End of controller menu dashboard.