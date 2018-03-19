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
        
        this.setState({data:this.shuffle(j)})
    }

    onClickCallback = (f) => {
        this.props.onClickCallback(f);
       
    }

    shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {


        return (

            <div className="population">
                <h2>Популярные направления</h2>
                <div class="row">

                    {this.state.data.slice(0,6).map((o, a) =>

                        <RandomTripBlock data={o} onClickCallback={this.onClickCallback} />)}


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
                onClick={o => this.clicked({ start: this.props.data.startPoint, end: this.props.data.endPoint })}
            >
                <img src={bus} alt="" />
                <div class="text_city">
                    {this.props.data.startPoint} – {this.props.data.endPoint} </div>
                <div class="price">от 1 500 ₽</div>
            </div>
        )
    }

}