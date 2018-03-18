import React, { Component } from 'react';
import TripBlock from './TripBlock.js'

export default class FoundTrips extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                start: 'Оренбург',
                end: '',
                date: ''
            }
    };

    onItemClick = (data) => {
        this.props.onClick(data);
    }

    render() {
        return (
            
            <div>
                
            <div className="row tripheader">
                    <div className="col-md-4">
                        Направление
                    </div>

                    <div className="col-md-4">
                        Дата
                    </div>

                    <div className="col-md-4">
                        Осталось мест
                    </div>

                </div>
                <hr/>

                {this.props.data.map((o, a) => <TripBlock data={o} onClick={this.onItemClick} />)}
            <hr/>
            </div>
            

        )
    }
}


