import React, { Component } from 'react';

export default class Trip extends Component {
    constructor(props) {
        super(props);

        this.state =
            {
                start: 'Оренбург',
                end: '',
                date: ''
            }
    };

    switchFields = () => {
        let temp = this.state.start;
        this.setState({ start: this.state.end });
        this.setState({ end: temp });
    }

    inputHandler = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    submit = () => {
        this.props.onRequest(
            {
                start: this.state.start,
                end: this.state.end,
                date: this.state.date
            })
    }

    render() {
        const tbl =
            (
                <div>
                <h1>Поиск и продажа билетов на автобусы по России и СНГ</h1>
                <form action="">
                    <div class="seach">
                        <div class="point-input">
                            <div class="y-input__box">
                                <input type="search"
                                    id="from-name"
                                    value={this.state.start}
                                    placeholder="Откуда"
                                    name="start"
                                    autocomplete="off"
                                    cols="10"
                                    class="y-input__control"
                                    onInput={this.inputHandler} />

                            </div>
                        </div>

                        <button
                            tabindex="-1"
                            type="button"
                            class="y-button y-button_theme_normal y-button_size_m y-button_type_button search-form__switch"
                            role="button"
                            aria-haspopup="true"
                            onClick={this.switchFields}
                        >

                            <span class="y-button__text">
                                <i class="search-form__switch-icon"></i>
                            </span>
                        </button>

                        <div class="point-input">
                            <div class="y-input__box">
                                <input type="search"
                                    id="to-name"
                                    value={this.state.end}
                                    onInput={this.inputHandler}
                                    placeholder="Куда"
                                    name="end"
                                    autocomplete="off"
                                    cols="10"
                                    class="y-input__control"
                                />
                            </div>
                        </div>

                        <div class="point-input date-input">
                            <div class="y-input__box">
                                <input type="date"
                                    placeholder="Когда"
                                    name="date"
                                    id="date-text"
                                    autocomplete="off"
                                    value={this.state.date}
                                    onInput={this.inputHandler}
                                    cols="10"
                                    class="y-input__control"
                                />
                            </div>

                        </div>
                        <button
                            type="button"
                            class="y-button btn"
                            role="button"
                            onClick={this.submit}
                        >
                            <span class="y-button__text">Найти</span>
                        </button>
                    </div>

                </form>
                </div>
            )




        return (
            tbl
        );
    }

}