import React, {Component} from 'react';

class CreateEvents extends Component {

    async postData() {

        try {

            let result = await fetch('http://webhook.site/dd95ba80-341f-48d9-8530-8d5c533849c3', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    id: 'Event ID',
                    eventName: 'Climate March',
                    location: 'Texas Capitol, 1100 Congress Ave, Austin, TX, 78701',
                    date: '03/01/2020',
                    time: '10:00AM'
                })

            });

            console.log('Result: ' + result)

        } catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="CreateEvents">
                <button onClick={ () => this.postData() }>Create event!</button>
            </div>
        );
    }
}

export default CreateEvents;