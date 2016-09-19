// Controller of expense dashboard page.
appControllers.controller('expenseDashboardCtrl', function ($rootScope,$scope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,$stateParams) {

    //$scope.isAnimated is the variable that use for receive object data from state params.
    //For enable/disable row animation.

    $scope.isAnimated =  $stateParams.isAnimated;
    $scope.back=true; // Handles hidding/showing of back button

    $scope.navigateTo = function (stateName,id) {
        
        if (id==1) //Attendees
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=true;
            $scope.back=false;

        }
        else if (id==2) // Startups
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
           $scope.back=false;
        }

        else if (id==3)  //Kids
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=false;
            $scope.back=false;
        }

        else if (id==4)  //Press
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
            $scope.back=false;
        }

        else if (id==5)  //Exihibitors
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=true; $rootScope.viewBoothStand=true;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
            $scope.back=false;
        }

        else if (id==6)  //Gamers
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=false;
            $scope.back=false; 

        }
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: $scope.back


                   
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
        
    };// End navigateTo.

    // doSomeThing is for do something when user click on a button
    $scope.doSomeThing = function () {
        // You can put any function here.
    } // End doSomeThing.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.goToSetting = function () {
        $state.go("app.expenseSetting");
    };// End goToSetting.

});// End of controller expense dashboard.

// Controller of expense dashboard setting.
// appControllers.controller('expenseDashboardSettingCtrl', function ($scope, $state,$ionicHistory,$ionicViewSwitcher) {

//     // navigateTo is for navigate to other page
//     // by using targetPage to be the destination state.
//     // Parameter :
//     // stateNames = target state to go.
//     // objectData = Object data will send to destination state.
//     $scope.navigateTo = function (stateName,objectData) {
//         if ($ionicHistory.currentStateName() != stateName) {
//             $ionicHistory.nextViewOptions({
//                 disableAnimate: false,
//                 disableBack: true
//             });

//             //Next view animate will display in back direction
//             $ionicViewSwitcher.nextDirection('back');

//             $state.go(stateName, {
//                 isAnimated: objectData,
//             });
//         }
//     }; // End of navigateTo.
// }); // End of controller expense dashboard setting.
