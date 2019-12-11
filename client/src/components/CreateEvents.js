import React, {Component} from 'react';
import axios from 'axios';

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
                    id: 'dd95ba80',
                    eventName: 'Climate March',
                    location: 'Texas Capitol, Austin, TX',
                    date: 'March 1st 2020',
                    time: '10:00AM'
                })

            });

            console.log('Result: ' + result)

        } catch(e) {
            console.log(e)
        }
    }

    constructor() {
        super();
        this.state = {
          eventName: '',
          location: '',
          date: '',
          time: '',
        };
    } 

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { eventName, location, date, time } = this.state;

        axios.post('/events', { eventName, location, date, time })
          .then((result) => {
            //access the results here....
          });
    }

    render() {
        const { eventName, location, date, time } = this.state;

        return (
            <div className="CreateEvents">
                <form onSubmit = {this.onSubmit}>
                    <label>Event Name: </label>
                    <input
                        type="text"
                        name="eventName"
                        value={eventName}
                        onChange={this.onChange}
                    />
                    <br/>
                    <label>Event Location: </label>
                    <input 
                        type="text"
                        name="location"
                        value={location}
                        onChange={this.onChange}
                    />
                    <br/>
                    <label>Date: </label>
                    <input 
                        type="text"
                        name="date"
                        value={date}
                        onChange={this.onChange}
                    />
                    <br/>
                    <label>Time: </label>
                    <input 
                        type="text"
                        name="time"
                        value={time}
                        onChange={this.onChange}
                    />
                    <br/>
                    <button onClick={ () => this.postData() }>Create event!</button>
                </form>
            </div>
        );
    }

}

export default CreateEvents;