// Controller of menu toggle.
// Learn more about Sidenav directive of angular material
// https://material.angularjs.org/latest/#/demo/material.components.sidenav
appControllers.controller('menuCtrl', function ($mdToast,$ionicLoading,$http,$ionicPopup,$ionicPlatform,$ionicSideMenuDelegate,$scope, $stateParams,$timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state,$rootScope,$window) {
    
    $scope.toggleLeft = buildToggler('left');

    // buildToggler is for create menu toggle.
    // Parameter :  
    // navID = id of navigation bar.
    function buildToggler(navID) {
        var debounceFn = $mdUtil.debounce(function () {
            $mdSidenav(navID).toggle();
        }, 0);
        return debounceFn;
    };// End buildToggler.

    $scope.speakers =function()
    {
         $ionicLoading.show({
        template: 'Loading Speakers...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500
    });

        $http.get("http://techplus.com.ng/TechPlusApi/speakers.php").success(function (response) {
        $scope.raw_data= response;
   
       console.log($scope.raw_data);
       $rootScope.speakers_infos=$scope.raw_data;

       console.log($rootScope.speakers_infos);

      $scope.navigateTo('app.speakers-page');
     $ionicLoading.hide();

    })
    .error(function(data, status) {
            $ionicLoading.hide();

        alert('Please check your internet connection');
          
     });
    }

    $scope.speakers_details=function(image_url,name,url)
    {
        $rootScope.less=false;
       
        $ionicLoading.show({
        template: 'Loading'+'  '+name+'  '+'information...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500
    });


     $http.get("http://techplus.com.ng/TechPlusApi/speakers_info.php?url="+url).success(function (response) {
        $scope.details= response;

        if($scope.details=='0')
        {
           
            $mdToast.show({
                    controller: 'toastController',
                    templateUrl: 'toast.html',
                    hideDelay: 1500,
                    position: 'top',
                    locals: {
                        displayOption: {
                            title: 'No information about '+' '+name
                        }
                    }
                     });
            $ionicLoading.hide();
           throw new Error("end");
           
        }

        $rootScope.speaker_name=name;
        $rootScope.speaker_title=name;
        $rootScope.speaker_pic=image_url;
        $rootScope.info1= $scope.details.substring(0,200);
        $rootScope.info2= $scope.details.substring(201); 
        $rootScope.more=true; 
      

       console.log($scope.details);

      $state.go('app.speaker-info');
     $ionicLoading.hide();

    })
     .error(function(data, status) {
            $ionicLoading.hide();
            alert('Please check your internet connection');
          
     });


    }

    $scope.Reglink = function (url){
            $window.open(url);
            
        }

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


    $scope.isAnimated =  $stateParams.isAnimated;
   $scope.back=true; // Handles hidding/showing of back button

    $scope.navigateTo_menu = function (stateName,id) {
        
        if (id==1) //Attendees
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=true;
            $scope.back=false; $rootScope.userType=1; $rootScope.viewGameType=false;
            $rootScope.Type="Attendees";
            $rootScope.viewConfirmEmail=true;



        }
        else if (id==2) // Startups
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
           $scope.back=false; $rootScope.userType=2; $rootScope.viewGameType=false;
           $rootScope.Type="Startups";
           $rootScope.viewConfirmEmail=true;
        }

        else if (id==3)  //Kids
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=false;
            $scope.back=false;$rootScope.userType=3; $rootScope.viewGameType=false;
            $rootScope.Type="Students";
            $rootScope.viewConfirmEmail=true;
        }

        else if (id==4)  //Press
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
            $scope.back=false;$rootScope.userType=4; $rootScope.viewGameType=false;
            $rootScope.Type="Press";
            $rootScope.viewConfirmEmail=true;
        }

        else if (id==5)  //Exihibitors
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=false; $rootScope.viewCountry=false;
            $rootScope.viewSector=true; $rootScope.viewBoothStand=true;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=true;
            $scope.back=false; $rootScope.userType=5; $rootScope.viewGameType=false;
            $rootScope.Type="Exihibitors";
            $rootScope.viewConfirmEmail=true;
        }

        else if (id==6)  //Gamers
        {
            $rootScope.viewName=true; $rootScope.viewLastname=true;
            $rootScope.viewEmail=true; $rootScope.viewPhone=true;
            $rootScope.viewState=true; $rootScope.viewCountry=true;
            $rootScope.viewSector=false; $rootScope.viewBoothStand=false;
            $rootScope.viewOccupation=false; $rootScope.viewCompany=false;
            $scope.back=false; $rootScope.userType=6; $rootScope.viewGameType=true;
            $rootScope.Type="Gamers";
            $rootScope.viewConfirmEmail=true;

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
       
        
    };
    // End navigateTo.

 // $scope.Speaker_info = function (name){
     //        $rootScope.more=true;
     //        if(name=='juan')
     //        {
     //            $rootScope.speaker_name='Prof. Juan Enric Ricart';
     //            $rootScope.speaker_title='Fellow of the SMS and EURAM';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Professor-Juan-Enric-Ricart.jpg';
     //            $rootScope.info1='He is the Carl Schrøder Professor of Strategic Management and Chairman of the Strategic Management Department at the IESE Business School, University of Navarra. In this school he has been Director of the Doctoral Program (1995-2006), Associate Dean for Research (2001-2006), and Associate Director for Faculty  and Research (2006-2014).';
     //            $rootScope.info2='He is also Vice-president of the Iberoamerican Academy of Management. He was the Founding president of the European Academy of Management (EURAM) and President of the Strategic Management Society (SMS). He was the academic director of the EIASM and member of the research committee of the EFMD. Joan E. Ricart holds a Ph.D in Managerial Economics, Northwestern University; Ph.D. in Industrial Engineering, Universitat Politècnica de Catalunya; and Ph.D. in Economics and Business Administration, Universitat Autònoma de Barcelona. Joan E. Ricart has a wide and recognized international experience as lecturer. Before joining IESE he was Professor in Universitat Politècnica de Catalunya and in Universidad Autònoma de Barcelona. Throughout his career he has been visiting Professor in many Business Schools around the world: IPADE (Mexico); IAE (Argentina); IDE (Ecuador); UNISA (South Africa)...  He has also supervised several doctoral theses and research projects. He has published several books and articles in leading journals as Strategic Management Journal, Harvard Business Review, Journal of International Business Studies, Econometrica or Quarterly Journal of Economics. He is co-academic director of IESE Cities in Motion and academic director of the UN center of excellence of PPP for Cities. He is also a member of the Advisory Board of the Future of Urban Development and Service Initiative of the World Economic Forum. His current work focuses on cities, business models, and offshoring';
               
                
     //        }

     //        if(name=='josep')
     //        {
     //            $rootScope.speaker_name='Josep Ramon Ferrer';
     //            $rootScope.speaker_title='Engineer in Telecoms and engineer in Electronics';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Josep-Ramon-Ferrer.jpg';
     //            $rootScope.info1='He holds a Master Degree in Digital Broadcast. He is former Deputy CIO and former Smart City Director of the Barcelona City Council (2012-2105). At the same time was CEO of the Barcelona Institute of Technology (BIT).  In this time Barcelona had been  one of the most award cities in the world for Smartcity and Innovation programs.';
     //            $rootScope.info2='Previously he held various executive positions at the Government of Catalonia, all related to Telecommunications and Information Society, where he was appointed Director-General of Telecommunications and Director-General of Information Society. He has participated in the Barcelona Committee for the Mobile World Capital application and in country-wide transformational and strategic projects such as the development of the fibre optic, the internet wide band & TV digitalisation in rural areas. He has been president of the Association of Telecommunication Engineers of Catalonia and has participated in expert consultation processes and advisory boards of the European Commission, the Spanish Ministry of Industry and the National Telecommunications Market Commission. He is member of the jury of various international prizes, namely the Smart City Expo & World Congress Awards; and lectures in various universities. Actually he is beginning in DoxaInnova&Smart Consultancy as a Director of Institutional Business Development. And he is now Institucional Vice-Dean of Telecom Engineer Association (COETTC - Col.legi Oficial EnginyersTecnicsTelecomunicacions)';
               
                

     //        }
     //        if(name=='rodney')
     //        {
     //            $rootScope.speaker_name='Rodney Williams';
     //            $rootScope.speaker_title='Founder/CEO of LISNR';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Rodney-Williams.jpg';
     //            $rootScope.info1='Rodney Williams, Founder/CEO of LISNR, leads one of the most disruptive companies in the IoT space and the world of mobile connectivity. He is the 2016 Black Enterprise Tech Entrepreneur of the Year and been honored by Ad Age\'s Top 40 under 40 and the Upstart100. Rodney is a P&G brand management alumnus, known for being the first marketer there to co-write digital patents. ';
     //            $rootScope.info2='He is also a former Lockheed Martin and Department of Energy disruptor. He achieved those honors after earning four degrees by the age of 24.';
               

     //        }
     //        if(name=='omobola')
     //        {
     //            $rootScope.speaker_name='Omobola Johnson';
     //            $rootScope.speaker_title='co-founder and CEO, Six to Start';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/omobola-johnson.jpg';
     //            $rootScope.info1='sdgfdhgfhdgfjgxfhvbhjxhfxfhb';
     //            $rootScope.info2='hsdfsddzgvcghsvcgcvgcvhgd';
               
               

     //        }
     //        if(name=='karthik')
     //        {
     //            $rootScope.speaker_name='Karthik Noornie';
     //            $rootScope.speaker_title='information';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Karthik-Noornie.jpg';
     //            $rootScope.info1='sdgfdhgfhdgfjgxfhvbhjxhfxfhb';
     //            $rootScope.info2='hsdfsddzgvcghsvcgcvgcvhgd';
                
                

     //        }
     //        if(name=='monique')
     //        {
     //            $rootScope.speaker_name='Monique Woodard';
     //            $rootScope.speaker_title='Venture Partner at 500 Startups';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Monique-Woodard.jpg';
     //            $rootScope.info1='She invests in early stage startups. She believes that the current $2.5 trillion in combined black and Latino purchasing power is creating the next big emerging market. She invests in startups led by black and Latino founders and the companies that serve those markets. Monique is also the Founder and Executive Director of Black Founders a nonprofit startup started by four tech friends in a San Francisco restaurant over shrimp and grits and jazz music.';
     //            $rootScope.info2='Their hackathons at historically black colleges and universities and workshops and conferences for founders are designed to move entrepreneurs from idea to execution. With a mission to increase the number of successful black entrepreneurs in tech, the organization has cultivated a new generation of tech founders from Silicon Valley to New York City, Atlanta, Austin, and several HBCU campuses. Previously, Monique served as one of the first Innovation Fellows for the San Francisco Mayor’s Office where she worked on the many ways that a city at the epicenter of innovation can use technology to transform workforce and other government services. During her fellowship term, she wrote the resolution on broadband and unlicensed spectrum which was adopted at the US Conference of Mayors and contributed to the City’s early strategy around community internet access and closing the digital divide in low income and minority communities. Monique was an entrepreneur before entrepreneurship was the new normal. She has built things big and small, including Speak Chic – a mobile app that teaches you how to correctly pronounce fashion brands. Speak Chic was featured in Harper’s Bazaar UK , Cosmopolitan, Essence, and In Style. Monique has been an advisor to for proft startups and technology focused philanthropic organizations including EveryoneOn.org and Startup Policy Lab. She regularly speaks, writes, and advises in the areas of consumer technology, diversity, and civic technology. She has been interviewed around entrepreneurship and diversity for MSNBC, The Daily Beast, New York Times, Buzzfeed, NPR, TheRoot, and Essence Magazine.';
               
                

     //        }
     //         if(name=='kamran')
     //        {
     //            $rootScope.speaker_name='Kamran Elahain';
     //            $rootScope.speaker_title='Chairman  BIT-AMENA';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Kamran-Elahain.jpg';
     //            $rootScope.info1='As an entrepreneur, Mr. Elahian co-founded ten companies, three of them failed (e.g. Momenta), six of them produced a total market cap of over $8B (e.g. Cirrus Logic). As a VC, Mr. Elahian co-founded Global Catalyst Partners with investments in the U.S., Japan, China, India, Israel and Singapore. Underlying Mr. Elahian’s global vision is the conviction that modern Information and Communication Technologies (ICT) can be instrumental in dissolving barriers between nations and bridging the social and political differences among people.';
     //            $rootScope.info2='This vision is reflected in Schools-Online, a nonprofit he co-founded in 1996 to connect the world, one school at a time (6400 schools in 36 countries were provided with computers and access to the Internet) and merged with Relief International in 2003; Global Catalyst Foundation, co- founded in 2000 to improve lives through the effective application of ICT, and UN-GAID, a United Nations global forum that promotes ICT in developing countries where Mr. Elahian served as Co- Chairman (2009-2011). As an innovation catalyst, Mr. Elahian advises various governments on the needed transition from fossil based economies to sustainable innovation economies.';

               

     //        }

     //        if(name=='tony')
     //        {
     //            $rootScope.speaker_name='Tony Scott';
     //            $rootScope.speaker_title='U.S. Chief Information Officer. White House Office of Management and Budget';
     //            $rootScope.speaker_pic='http://techplus.com.ng/app_images/Tony-Scott.jpg';
     //            $rootScope.info1='As an entrepreneur, Mr. Elahian co-founded ten companies, three of them failed (e.g. Momenta), six of them produced a total market cap of over $8B (e.g. Cirrus Logic). As a VC, Mr. Elahian co-founded Global Catalyst Partners with investments in the U.S., Japan, China, India, Israel and Singapore. Underlying Mr. Elahian’s global vision is the conviction that modern Information and Communication Technologies (ICT) can be instrumental in dissolving barriers between nations and bridging the social and political differences among people.';
     //            $rootScope.info2='This vision is reflected in Schools-Online, a nonprofit he co-founded in 1996 to connect the world, one school at a time (6400 schools in 36 countries were provided with computers and access to the Internet) and merged with Relief International in 2003; Global Catalyst Foundation, co- founded in 2000 to improve lives through the effective application of ICT, and UN-GAID, a United Nations global forum that promotes ICT in developing countries where Mr. Elahian served as Co- Chairman (2009-2011). As an innovation catalyst, Mr. Elahian advises various governments on the needed transition from fossil based economies to sustainable innovation economies.';

               

     //        }
     //        $state.go('app.speaker-info');
     //    }

        $scope.show_more = function (){
            $rootScope.more=false;
            $rootScope.less=true;
            
        }
         $scope.show_less = function (){
            $rootScope.more=true;
            $rootScope.less=false;
            
        }

$scope.showVideo = function() {

      var alertPopup = $ionicPopup.alert({

      title: 'TechPlus 2017',

      templateUrl: 'templates/video.html',

   });

   alertPopup.then(function(res) {

      console.log('Thanks');

   });

};





}); // End of menu toggle controller.
