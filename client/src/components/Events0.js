import React, { Component } from "react";

class Events extends React.Component {
    
    //Collect event data from API
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            isLoaded: false,
        }
    }
    
    componentDidMount() {
        fetch('http://webhook.site/0faa726d-4980-48cc-85ce-ef0404acd4b3')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            }).catch((err) => {
                console.log(err);
            });
    }
    
    //Display events
    render() {

        const { isLoaded, items } = this.state;

        if (!isLoaded) {
            return <div>Loading events...</div>;
        }
        return (
            <div className="Events">
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                               Event Name: {item.eventName}
                               <br/>Location: {item.location}
                               <br/>Date: {item.date}
                               <br/>Time: {item.time}
                           </li>
                       ))}
                   </ul>
                </div>
        );
    }
}

export default Events0;