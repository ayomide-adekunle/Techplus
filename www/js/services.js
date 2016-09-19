/**
 * Created by USER on 5/5/16.
 */
angular.module('starter.services', [])

    .factory('Events', function($q,$cordovaCalendar) {

        //kind of a hack
        var incrementDate = function (date, amount) {
            var tmpDate = new Date(date);
            tmpDate.setDate(tmpDate.getDate() + amount);
            tmpDate.setHours(13);
            tmpDate.setMinutes(0);
            tmpDate.setSeconds(0);
            tmpDate.setMilliseconds(0);
            return tmpDate;
        };

        var incrementHour = function(date, amount) {
            var tmpDate = new Date(date);
            tmpDate.setHours(tmpDate.getHours() + amount);
            return tmpDate;
        };

        //create fake events, but make it dynamic so they are in the next week
        var fakeEvents = [];
        // fakeEvents.push(
        //     {
        //         "title":"MTN TechPlus Conference",
        //         "description":"Eko Hotel Conference & Exhibition Center, Plot 1415 Adetokunbo Ademola Street, PMB 12724, Victoria Island, Lagos Nigeria",
        //         "date":new Date(2016, 07, 20, 01, 00, 00, 00)
        //     }
        // );


        var getEvents = function() {
            var deferred = $q.defer();

            /*
             Logic is:
             For each, see if it exists an event.
             */
            var promises = [];
            fakeEvents.forEach(function(ev) {
                //add enddate as 1 hour plus
                ev.enddate = incrementHour(ev.date, 1);
                console.log('try to find '+JSON.stringify(ev));
                promises.push($cordovaCalendar.findEvent({
                    title:ev.title,
                    startDate:ev.date
                }));
            });

            $q.all(promises).then(function(results) {
                console.log("in the all done");
                //should be the same len as events
                for(var i=0;i<results.length;i++) {
                    fakeEvents[i].status = results[i].length === 1;
                }
                deferred.resolve(fakeEvents);
            });

            return deferred.promise;
        }

        var addEvent = function(event) {
            var deferred = $q.defer();

            $cordovaCalendar.createEvent({
                title: event.title,
                notes: event.description,
                startDate: new Date(2018, 07, 20, 01, 00, 00, 00),
                endDate:new Date(2018, 07, 23, 03, 00, 00, 00)
            }).then(function (result) {
                console.log('success');console.dir(result);
                deferred.resolve(1);
            }, function (err) {
                console.log('error');console.dir(err);
                deferred.resolve(0);
            });

            return deferred.promise;

        }

        return {
            get:getEvents,
            add:addEvent
        };

    });