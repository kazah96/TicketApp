import React, { Component } from 'react';
import { NetworkManager } from '../NetworkManager.js'
import loading from '../loading.gif'


export default class Trip extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                data: []
            }
        this.callbackFn = this.callbackFn.bind(this);
        this.refreshData();

    };

    refreshData = () => {
        NetworkManager.getInfo("AllTrips", this.callbackFn);
    }

    callbackFn = (qw) => {
        this.setState({ data: qw });
    }

    buyTicket = (tripId) => {
        console.log("vi prikupili biletique" + tripId);
        NetworkManager.sendInfo('Booking', { id: 1, TripId: tripId, UserId: 8 }, this.refreshData);

    }

    render() {
        const { data } = this.state;

       

        return (
        <div></div>

        );
    }
}
