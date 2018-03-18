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
            <ul class="nav">
                <li class="nav-item">
                    <h5 class="nav-link active">
                        <a href="#" onClick={this.props.routeEdit}>
                            Маршруты
                        </a>
                    </h5>
                </li>
                <li class="nav-item">
                    <h5 class="nav-link active">
                        <a href="#" onClick={this.props.busEdit}>
                            Автобусы
                        </a>
                    </h5>
                </li>
                <li class="nav-item">
                    <h5 class="nav-link active">Админ {this.props.user.name}</h5>
                </li>


            </ul>
        )
    }

    userPanel = () => {
        return (
            <ul class="nav">
                <li class="nav-item">
                    <h5 class="nav-link active"


                    >
                        <a href="#" onClick={this.props.myTickets}>
                            Мои билеты
                    </a>
                    </h5>
                </li>
                <li class="nav-item">
                    <h5 class="nav-link active">Пункт меню 2</h5>
                </li>
                <li class="nav-item">
                    <h5 class="nav-link active">{this.props.user.name}</h5>
                </li>


            </ul>
        )
    }

    driverPanel = () => {

        return (
            <ul class="nav">
                <li class="nav-item">
                    <h5 class="nav-link active">
                        <a href="#" onClick={this.props.schedule}>
                            Расписание
                    </a>
                    </h5>
                </li>
                <li class="nav-item">
                    <h5 class="nav-link active">Водила {this.props.user.name}</h5>
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
