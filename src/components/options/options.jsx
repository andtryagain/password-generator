import React, { Component } from 'react';

import './options.css'

export default class Options extends Component {

    state = {
        length: 8,
        symbols: true,
        numbers: true,
        l: true,
        U: true
    }

    getOption = (e) => {
        switch (e.target.id) {
            case 'length':
                return this.setState({ length: e.target.value })
            case 'symbols':
                return this.setState({ symbols: !this.state.symbols })
            case 'numbers':
                return this.setState({ numbers: !this.state.numbers })
            case 'l-case chars':
                return this.setState({ l: !this.state.l })
            case 'U-case chars':
                return this.setState({ U: !this.state.U })
            default:
                return 0;
        }
    }

    setCharset = () => {
        const { symbols, numbers, l, U } = this.state;
        const charNum = '1234567890',
            charL = 'abcdefghijklmnopqrstuvwxyz',
            charU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            charSym = "(){}<>,.!?:;//'|'`~@#$'%^&*+-_="
        const charset = 
            (symbols ? charSym : '') +
            (l ? charL : '' ) +
            (U ? charU : '') + 
            (numbers ? charNum : '');
        return charset;
    }

    passGen = () => {
        const {length} = this.state;
        let res = '';
        for (var i = 0, n = this.setCharset().length; i < length; ++i) {
            res += this.setCharset().charAt(Math.floor(Math.random() * n));
        }
        return res;
    }

    optionButton = (optionName, option) => {
        return <div className="form-check form-check-inline">
            <input
                className="form-check-input position-static"
                type="checkbox"
                id={optionName}
                defaultChecked={option}
                onChange={this.getOption}
                aria-label="...">
            </input>
            <label className="form-check-label"
                htmlFor="inlineRadio1">
                {optionName}
            </label>
        </div>
    }

    generatePassword = (e) => {
        e.preventDefault();
        this.props.formedPass(this.passGen())
    }

    render() {

        const { getOption, generatePassword, optionButton, state } = this;
        const { length, symbols, numbers, l, U } = state;

        return (
            <form onSubmit={generatePassword}>
                <ul className='list-unstyled mb-0'>
                    <li>
                        <div
                            className="input-group input-group-sm mb-1 lngth">
                            <span
                                className="input-group-text"
                                id="inputGroup-sizing-sm">length:</span>
                            <input
                                type="number"
                                className="form-control"
                                id='length'
                                defaultValue={length}
                                onChange={getOption}
                            >
                            </input>
                        </div>
                    </li>
                    <li>
                        {optionButton('symbols', symbols)}
                    </li>
                    <li>
                        {optionButton('numbers', numbers)}
                    </li>
                    <li>
                        {optionButton('l-case chars', l)}
                    </li>
                    <li>
                        {optionButton('U-case chars', U)}
                    </li>
                </ul>
                <button type="submit"
                    className="btn btn-primary btn-sm">
                    generate
                </button>
            </form>
        );
    }
}
