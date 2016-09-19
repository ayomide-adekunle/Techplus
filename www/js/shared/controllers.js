//This is Controller for Dialog box.
appControllers.controller('DialogController', function ($scope, $mdDialog, displayOption) {

    //This variable for display wording of dialog.
    //object schema:
    //displayOption: {
    //        title: "Confirm to remove all data?",
    //        content: "All data will remove from local storage.",
    //        ok: "Confirm",
    //        cancel: "Close"
    //}
    $scope.displayOption = displayOption;

    $scope.cancel = function () {
        $mdDialog.cancel(); //close dialog.
    };

    $scope.ok = function () {
        $mdDialog.hide();//hide dialog.
    };
});// End Controller for Dialog box.

//Controller for Toast.

appControllers.controller('toastController', function ($scope, displayOption) {

    //this variable for display wording of toast.
    //object schema:
    // displayOption: {
    //    title: "Data Saved !"
    //}

    $scope.displayOption = displayOption;
});// End Controller for Toast.

appControllers.controller('tryAppCtrl', function ($scope, $mdToast, Events, $ionicPlatform, $cordovaCalendar, $timeout) {
    //ShowToast for show toast when user press button.
    //$scope.showToast = function (menuName) {
    //    //Calling $mdToast.show to show toast.
    //    $mdToast.show({
    //        controller: 'toastController',
    //        templateUrl: 'toast.html',
    //        hideDelay: 800,
    //        position: 'top',
    //        locals: {
    //            displayOption: {
    //                title: 'Going to ' + menuName + " !!"
    //            }
    //        }
    //    });
    //}// End showToast.



    $ionicPlatform.ready(function() {
        Events.get().then(function(events) {
            console.log("events", JSON.stringify(events));
            $scope.events = events;
            
        });
    });

    $scope.addEvent = function(event,idx) {
       //alert("add ",event);

        Events.add(event).then(function(result) {
            //alert("done adding event, result is "+result);
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 800,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Date has been added to your phone calender'
                        }
                    }
                });
            if(result === 1) {
                //update the event
                $timeout(function() {
                    $scope.events[idx].status = true;
                    $scope.$apply();
                });
            } else {
                //For now... maybe just tell the user it didn't work?
            }
        });


    };
});// End of controller menu dashboard.
// Controller of menu dashboard page.
