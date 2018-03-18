
import React, { Component } from 'react';

export default class MyTickets extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
               
            }

    }

    cancelBooking = (id) =>
    {
        console.log(id);
        this.props.cancel(id)
    }

    trip = (o, id) => {
        console.log(o);
        return (

            <div className="trip">
                <div className="row">
                    <div className="col-md-4">
                        {o.startPoint} - {o.endPoint}
                    </div>

                    <div className="col-md-4">
                        {o.date}
                    </div>

                    <div className="col-md-4">
                        <button
                            className="btn btn_s"
                            onClick={w => this.cancelBooking(o.id)}
                        >Отменить</button>
                    </div>

                </div>
            </div>

        )
    }

    render() {
        return (
            <div>
                {this.props.data.map((o, a) => this.trip(o, a))}

            </div>
        )
    }

}

