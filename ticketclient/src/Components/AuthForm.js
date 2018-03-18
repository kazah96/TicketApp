import React, { Component } from 'react';

export default class AuthForm extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                Email: "",
                Pass: ""
            }
    }
    onSubmit = () => {
        this.props.onSubmit(this.state);
    }
    handler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    getform = () => {
        return (
            <div class="modal fade"
                id="authModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Войти</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>

                        </div>

                        <div className="modal-body">
                            <form className="" method="post">
                                <div className="formid">
                                    <label for="">Еmail</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={this.state.Email}
                                        onChange={this.handler}
                                    />
                                </div>
                                <div className="formid">
                                    <label for="">Пароль</label>
                                    <input
                                        type="text"
                                        name="Pass"
                                        value={this.state.Pass}
                                        onChange={this.handler}
                                    />
                                </div>


                            </form>
                            <span>Нет аккаунта?
                                <a href="#"
                                    className="lk wd"
                                    data-toggle="modal"
                                    data-target="#regModal"
                                    data-dismiss="modal"
                                >Зарегестрироваться</a></span>

                        </div>

                        <div className="modal-footer">

                            <button type="button"
                                onClick={this.onSubmit}
                                className="btn btn-default"
                                data-dismiss="modal">Отправить</button>
                            <button type="button" data-dismiss="modal" className="btn ">Отмена</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            this.getform()

        )
    }

}
