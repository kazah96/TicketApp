import React, { Component } from 'react';
import { NetworkManager } from '../NetworkManager';


export default class Editor extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                currentState: 'loading',
                 data: this.props.data
                // data: [
                //     { hui: 123, pizda: 132, asd: "asdasd" },
                //     { hui: 123, pizda: 132, asd: "EBALA" }

                // ]


            }

    }

    handler = (e) => {
        console.log(e.target.value)
        let r = this.state.data;
        r[e.target.id][e.target.name] = e.target.value
 
        this.setState({ data : r })

       
    }

    onSaved = () =>
    {
        this.props.onSubmit(this.state.data)
    }

    makeTable = () => {

        if (this.state.data === undefined) return <h2>no info</h2>;
        if (this.state.data.length == 0) return <h2>no info</h2>;

        return (
            <div className="editor">
                <table>
                    <thead>
                        {

                            <tr>
                                {
                                    Object.keys(this.state.data[0]).map(o => <td>{o}</td>)
                                }
                            </tr>
                        }
                    </thead>

                    <div className="form-row">
                        {this.state.data.map(
                            (a, id) => <tr id={id}>{Object.keys(a).map((o) =>

                                <td> <input id={id} 
                                className="form-control" 
                                name={o} 
                                value={a[o]} 
                                onChange={this.handler} 
                                readOnly={o == 'id' ? true : false}
                                />
                                </td>

                            )}</tr>)
                        }
                    </div>
                </table>
                <button className="btn" onClick={this.onSaved}>Save</button>
            </div>
        )

    }

    render() {
        return (
            <div>
                <h1>{this.props.header}</h1>
                {this.makeTable()}
            </div>
        )
    }


}
