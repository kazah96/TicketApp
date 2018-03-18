import React, { Component } from 'react';
import { NetworkManager } from '../NetworkManager.js'

export default class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            login: '',
            pass: ''
        };
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    login = () => {

        NetworkManager.sendInfo("Login", {
            Email: this.state.login, Pass: this.state.pass
        }, this.onResponse);
    }

    onResponse = (ww) => {
        let we = '';
        if (ww.status == 200)
            ww.json().then(q =>
                this.props.onLogged(q)
            );

    }

    render() {
        return (
            <form>
                <label>Email</label>
                <input
                    name="login"
                    type="text"

                    onChange={this.handleChange} />

                <label>Pass</label>
                <input
                    name="pass"
                    type="text"

                    onChange={this.handleChange} />
                <input type="button" onClick={this.login} />
            </form>
        );
    }
}
