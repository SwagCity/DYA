App.Globals = function() {
    var createEvent = function(ident, eventType, f) {
        console.log("WHY THE FUCK IS THIS EVENT NOT BEING MADE")
        $(ident).on(eventType, f);
        jQuery._data( document.getElementById("content-toplevel2"), "events" );
    }


    return {
        createEvent : createEvent
    }
}();
