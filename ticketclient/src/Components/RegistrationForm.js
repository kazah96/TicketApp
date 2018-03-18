import React, { Component } from 'react';

export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                name: "",
                phone: "",
                email: "",
                password: ""
            }
    }

    handler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = () =>
    {
        this.props.onSubmit(this.state);
    }

    getform = () => {
        return (
            <div class="modal fade" id="regModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Регистрация</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>

                        </div>

                        <div className="modal-body">
                            <form className="" method="post">
                                <div className="formid">
                                    <label for="">Имя</label>
                                    <input type="text"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handler}
                                    />
                                </div>
                                <div className="formid">
                                    <label for="">Телефон</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={this.handler}
                                    />
                                </div>
                                <div className="formid">
                                    <label for="">Еmail</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handler}
                                    />
                                </div>
                                <div className="formid">
                                    <label for="">Пароль</label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handler}
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button"
                                className="btn btn-default"
                                data-dismiss="modal"
                                onClick={this.submit}>Отправить</button>
                            <button type="button" className="btn ">Отмена</button>
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
