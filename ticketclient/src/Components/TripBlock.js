

import React, { Component } from 'react';

export default class TripBlock extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        this.props.onClick(this.props.data)
    }

    render() {
        console.log(this.props.data)
        return (
            <div 
            className={this.props.data.seats == 0 ? "tripalert" : "trip"} 
            role="alert" 
            onClick={this.onClick}
            >

                <div className="row">
                    <div className="col-md-4">
                        {this.props.data.startPoint} - {this.props.data.endPoint}
                    </div>

                    <div className="col-md-4">
                        {this.props.data.date}
                    </div>

                    <div className="col-md-4">
                        {this.props.data.seats == 0 ? "Мест нет" : this.props.data.seats}
                    </div>

                </div>
            </div>
        )
    }
}
