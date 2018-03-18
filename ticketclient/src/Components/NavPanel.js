import React, { Component } from 'react';

import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';

import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { HelpBlock } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class NavPanel extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                selectedItem: "trip",
            }
    };

    changeSelectedItem = (item) => {
        this.props.callbackFn(item);
    }

    adminPanel = () => {
        return (
            <div className="col-md-6">
                <ul class="nav">
                    <li class="nav-item">

                        <a href="#" onClick={this.props.routeEdit}>
                            Маршруты
                        </a>

                    </li>
                    <li class="nav-item">

                        <a href="#" onClick={this.props.busEdit}>
                            Автобусы
                        </a>

                    </li>
                    <li class="nav-item">
                        Админ <span className="username">{this.props.user.name}</span>
                    </li>


                </ul>
            </div>

        )
    }

    userPanel = () => {
        return (
            <ul class="nav">
                <li class="nav-item">



                    <a href="#" onClick={this.props.myTickets}>
                        Мои билеты
                    </a>

                </li>

                <li class="nav-item">
                    <span className="username">{this.props.user.name}</span>
                </li>


            </ul>
        )
    }

    driverPanel = () => {

        return (
            <ul class="nav">
                <li class="nav-item">

                    <a href="#" onClick={this.props.schedule}>
                        Расписание
                    </a>

                </li>
                <li class="nav-item">
                    Водила <span className="username">{this.props.user.name}</span>

                </li>
            </ul>
        )
    }


    link = () => {
        console.log(this.props.status)
        switch (this.props.status) {
            case 3:
                return this.adminPanel();
            case 1:
                return this.userPanel();
            case 2:
                return this.driverPanel();
            case "notlogged":
                return (
                    <div className="col-md-6">

                        <a
                            className="lk"
                            data-toggle="modal"
                            data-target="#authModal"
                        >
                            ВОЙТИ
                            </a>
                    </div>
                )

        }

    }


    render() {
        return (

            <div id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="text">
                                <a href="/">Автобусы</a>
                            </div>
                        </div>

                        {this.link()}

                    </div>
                </div>
            </div>

        );
    }

}
