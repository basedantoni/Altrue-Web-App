//import//

class Eventbrite {
    constructor() {
        this.auth_token = 'JH4X56DFIYOXW3FZ55OU';
        this.orderby = 'date';
    }

    async queryAPI(eventName, category) {
        const eventsResponse = await fetch('https://www.eventbriteapi.com/v3/events/search/?q=$(eventName)'&sort_by=${this.orderby}&categories=${category}token=${this.auth_token});


        const events = await eventsResponse.json();

        return {
            events
        }
    }


    async getCategoriesAPI() {

        const categoriesResponse = await fetch('https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}');
    }


}
