if(eventName != '') {

    Eventbrite.queryAPI(eventName, category)
        .then(events => {
            const eventsList = events.events.events;
            if(eventList.length > 0) {
                ui.displayEvents(eventsList);
            }
            else {
                ui.printMessage('No Results Found', 'text-center alert alert-danger mt-4');
            }
        })

} else {
    ui.printMessage('Add an Event or City', 'text-center alert alert-danger mt-4');
}

})