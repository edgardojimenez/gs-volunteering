/**
 * Created by ejimenez on 5/26/2014.
 */

app.factory('volunteerService', ['repoMemory', function(repo) {

    return {

        getVolunteerEvents: function () {
            return repo.getEvents();
        },

        getVolunteerEventNames: function () {
            return repo.getEventNames();
        },

        getVolunteerEvent: function (id) {
            return repo.getEvent(id);
        },

        getNewVolunteerEvent: function (options) {
            return repo.getNewEvent(options);
        },

        addVolunteerEvent: function (volunteerEvent) {
            return repo.addEvent(volunteerEvent);
        },

        removeVolunteerEvents: function (volunteerEvent) {
            return repo.removeEvent(volunteerEvent);
        },

        updateVolunteerEvents: function (volunteerEvent) {
            return repo.updateEvent(volunteerEvent);
        }

    };
}]);