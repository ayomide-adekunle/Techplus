appControllers.controller('regCtrl2', function ($scope,$rootScope, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,$ionicLoading,$http,$mdToast) {
    
    $scope.register2 = function (user) {


        console.log($rootScope.userType);
       
        
        
        if($rootScope.userType==1)
        {
            $scope.url='http://techplus.com.ng/TechPlusApi/Attendees.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&occupation='+user.occupation+'&phone='+user.phone+'&state='+user.state+'&country='+user.country+'&type=Attendees';

           
           if(!user.fname || !user.lname||!user.occupation||!user.phone||!user.state||!user.country)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }

           if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }
           
        }
        if($rootScope.userType==2)
        {
            $scope.url='http://techplus.com.ng/TechPlusApi/Startup.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&company='+user.company+'&phone='+user.phone+'&type=Startups';
           

           if(!user.fname || !user.lname||!user.company||!user.phone)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }

           if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }

        }
        if($rootScope.userType==3)
        {
            $scope.url='http://techplus.com.ng/TechPlusApi/Kids.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&phone='+user.phone+'&state='+user.state+'&country='+user.country+'&type=Kids';
           
            
            if(!user.fname || !user.lname||!user.phone||!user.state||!user.country)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }
          

          if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }




        }
        if($rootScope.userType==4)
        {
            $scope.url='http://techplus.com.ng/TechPlusApi/Press.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&company='+user.company+'&phone='+user.phone+'&type=Press';
           

           if(!user.fname || !user.lname||!user.company||!user.phone)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }

           if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }

        }
        if($rootScope.userType==5)
        {
            $scope.url='http://techplus.com.ng/TechPlusApi/Exhibitors.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&company='+user.company+'&phone='+user.phone+'&type=Exhibitors'+'&sector='+user.sector+'&booth_stand='+user.booth_stand;
           

            if(!user.fname || !user.lname||!user.company||!user.phone||!user.sector||!user.booth_stand)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }

           if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }

        }
         if($rootScope.userType==6)

        {
             $game_type=user.game_type_1+','+user.game_type_2+','+user.game_type_3;

      

            $scope.url='http://techplus.com.ng/TechPlusApi/Gamers.php?fname='+user.fname+'&lname='+user.lname+'&email='+user.email+'&phone='+user.phone+'&state='+user.state+'&country='+user.country+'&game_type='+$game_type+'&type=Gamers';
           
           

            
           if(!user.fname || !user.lname||!user.phone||!user.state||!user.country)
           {

             $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'All fields are required'
                        }
                    }
                     });

               System.exit(0);
           }

           if(user.email!=user.confirmEmail)

           {
                $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Those emails don\'t match'
                        }
                    }
                     });

               System.exit(0);

           }


        }
        

        
        $ionicLoading.show({
                    template: 'Loading...please wait',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 500
                });
                $http.post($scope.url).
                success(function(data, status) {
                    
                     
                    if(data==0)
                    {
                    $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'The Email address is already used. Please use another email'
                        }
                    }
                     });
                   
                    }
                    else if(data==1)
                    {
                        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Registration completed. Please follow the link sent to your email address to complete your registration'
                        }
                    }
                     });
                    $scope.navigateTo('app.registration');
                    }

                    else if(data==2)
                    {
                        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Phone Number must be intergers ranging between 11 and 16'
                        }
                    }
                     });
                    
                    }

                    else if(data==3)
                    {
                        $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'Email address is not valid'
                        }
                    }
                     });
                    
                    }


                    $ionicLoading.hide();
                    
                    
                })
                .error(function(data, status) {

                 alert('service is down check your internet connection and try again');
                 $ionicLoading.hide();
                 });
       


    };// End navigateTo.
    
    $scope.navigateTo = function (stateName) {
       
        $timeout(function () {
            $mdSidenav('left').close();
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: false
                });
                $state.go(stateName);
            }
        }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    

});// End of controller menu dashboard.