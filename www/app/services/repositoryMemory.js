/**
 * Created by ejimenez on 5/26/2014.
 */

app.factory('repoMemory', function() {

//    var dataSource = new kendo.data.DataSource({
//        transport: {
//            read: {
//                url: "events.json",
//                dataType: "json"
//            }
//        }
//    });

    var volunteerEvent = kendo.data.Model.define( {
        id: "event", // the identifier of the model
        fields: {
            "name": {
                type: "string",
                validation: {
                    required: true
                },
                defaultValue: ''
            },
            "date": {
                type: "date",
                validation: {
                    required: true
                },
                defaultValue: new Date()
            },
            "hours": {
                type: "number",
                validation: {
                    required: true
                },
                defaultValue: 1
            }
        }
    });

    var dataSource = new kendo.data.DataSource({
        schema: {
            model: volunteerEvent
        }
    });


//    dataSource.read();
//    dataSource.fetch(function(){
//        //var dataItem = dataSource.at(0);
//       // console.log(dataItem.name); // displays "Jane Doe"
//        //var dataItemWhichDoesNotExist = dataSource.at(3);
//        //console.log(dataItemWhichDoesNotExist); // displays "undefined"
//    });

    return {

        getEvent: function (id) {
            return dataSource.getByUid(id);
        },

        getNewEvent: function (options) {
            return new volunteerEvent(options);
        },

        getEvents: function () {
            return dataSource;
        },

        getEventNames: function () {
            var events = [];
            dataSource.data().forEach(function (item) {
                if (events.indexOf(item.name) == -1)
                    events.push(item.name);
            });

            return events.sort();
        },

        addEvent: function (event) {
            return dataSource.add(event);
        },

        removeEvent: function (event) {
            dataSource.remove(event);
//            var index = null;
//            data.forEach(function(item, i) {
//                if (item.id == event.id)
//                    index = i;
//            });
//
//            if (index != null)
//                return data.splice(index,1);
//
//            return null;
        },

        updateEvent: function (event) {
            data.forEach(function(item, i) {
                if (item.id == event.id) {
                    item.hours = event.hours;
                    item.event = event.event;
                }
            });
        }

    };
});