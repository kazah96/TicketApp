import React, { Component } from 'react';
import { NetworkManager } from '../NetworkManager';
import bus from './orig.jpg'


export default class RandomTrips extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                currentState: 'loading',
                data: []
            }
        this.getTrips();
    }

    getTrips = () => {

        NetworkManager.getInfo("Routes", this.onRecievedRequest);
    }

    onRecievedRequest = (q) => {

        if (q.status != 200) {
            this.setState({ currentState: 'error' });
            return;
        }
        q.json().then(w => this.onJson(w))
    }

    onJson = (j) => {
        this.setState({ currentState: 'active' });
        this.setState({ data: j });
    }

    onClickCallback = (f) => {
        this.props.onClickCallback(f);
    }

    render() {


        return (

            <div className="population">
                <h2>Популярные направления</h2>
                <div class="row">
                    <div className="card-deck">
                        {this.state.data.map((o, a) => 
 
                        <RandomTripBlock data={o} onClickCallback={this.onClickCallback} />)}
                    </div>

                </div>
            </div>
        )
    }
}

class RandomTripBlock extends Component {
    constructor(props) {
        super(props);

        this.state =
            {

            }
    }

    clicked = (f) => {
        this.props.onClickCallback(f);
    }

    render() {
        return (

            <div 
            class="col-md-4 p_b " 
            onClick={o=> this.clicked({start:this.props.data.startPoint, end:this.props.data.endPoint})}
            >
                <img src={bus} alt="" />
                <div class="text_city">
                    {this.props.data.startPoint} – {this.props.data.endPoint} </div>
                <div class="price">от 1 500 ₽</div>
            </div>
        )
    }

}