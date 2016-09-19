// LocalStorage service have ability to store data by HTML5 localStorage feature.
// 
// The data will store in a json format.
// object schema of note data is: 
// [{
//     id: id of note,
//     title: title of note,
//     detail: note detail,
//     createDate: note created date
// }]
appServices.factory('localStorage', function ($filter, $window) {
    return {
        // Get data from localStorage it will use data key for getting the data.
        // Parameter :  
        // key = reference of object in localStorage.
        get: function (key) {
            return JSON.parse($window.localStorage[key] || "null");
        },

        // Add data to localStorage it will use data key 
        // by input data key and value for setting data to localStorage.
        // Parameter :  
        // key = reference of object in localStorage.
        // value = data that will store in localStorage.
        set: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },

        //Remove all data from localStorage.
        removeAll: function () {
            $window.localStorage.clear();
        }

    };
});//End LocalStorage service.

// NoteDB service will call localStorage Services to present notes data to controller.
appServices.factory('NoteDB', function (localStorage) {
    console.log('Hello');
    return {
        //  Get all data from localStorage.
        selectAll: function () {
            //noteData is the key of object that store in localStorage.
            return localStorage.get("noteData");
        },

        // Add new note data to localStorage.
        // It will receive note data from controller to store in localStorage.
        // Parameter :  
        // note = data that will store in localStorage.
        insert: function (note) {
            var notesList = localStorage.get("noteData");
            if (notesList == null) {
                // For first value of data.
                var newNoteData = [{
                    id: 1,
                    title: note.title,
                    detail: note.detail,
                    createDate: note.createDate
                }];
                localStorage.set("noteData", newNoteData);
            } 
            else {
                // For up to second value of data.
                var newNoteData = {
                    id: (notesList.length + 1),
                    title: note.title,
                    detail: note.detail,
                    createDate: note.createDate
                };
                notesList.push(newNoteData);
                localStorage.set("noteData", notesList);
            }
        },

        // Update note data to localStorage.
        // It will receive note data from controller to store in localStorage.
        // Parameter :  
        // note = data that will update to localStorage.
        update: function (note) {
            var notesList = localStorage.get("noteData");

            for (var i = 0; i <= notesList.length; i++) {
                if (notesList[i].id == note.id) {
                    notesList[i] = note;
                    break;
                }
            }

            localStorage.set("noteData", notesList);
        },

        // Remove data from localStorage it will receive note data
        // from controller to remove data from localStorage.
        // Parameter :  
        // note = data that will delete from localStorage.
        delete: function (note) {
            var notesList = localStorage.get("noteData");

            for (var i = 0; i <= notesList.length; i++) {
                if (notesList[i].id == note.id) {
                    notesList.splice(i, 1);
                    break;
                }
            }

            localStorage.set("noteData", notesList);
        },

        // Remove All data from localStorage.
        clear: function () {
            localStorage.removeAll();
        },
        
        // Get number of notes.
        count: function () {
            var notesList = localStorage.get("noteData");
            return (notesList == null ? 0 : notesList.length);
        }
    };
});//End NoteDB service.


//Strat calender


/**
 * Created by USER on 5/5/16.
 */
   appServices.factory('Events', function($q,$cordovaCalendar) {

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
        fakeEvents.push(
            {
                "title":"MTN TechPlus Conference",
                "description":"Eko Hotel Conference & Exhibition Center, Plot 1415 Adetokunbo Ademola Street, PMB 12724, Victoria Island, Lagos Nigeria",
                "date":new Date(2016, 06, 21, 01, 00, 00, 00)
            }
        );


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
                startDate: new Date(2016, 06, 21, 01, 00, 00, 00),
                endDate:new Date(2016, 06, 23, 03, 00, 00, 00)
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



// end calender