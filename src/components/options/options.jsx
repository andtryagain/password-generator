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

    getCharset = () => {
        const { symbols, numbers, l, U } = this.state;
        const charNum = '0123456789',
            charL = 'abcdefghijklmnopqrstuvwxyz',
            charU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            charSym = ",.-{}+!\"#$%/<>()=?"
        const charset =
            (symbols ? charSym : '') +
            (l ? charL : '') +
            (U ? charU : '') +
            (numbers ? charNum : '');
        return charset;
    }

    passGen = () => {
        const { length } = this.state,
            validChars = this.getCharset();
        let generatedPassword = '';
        for (var i = 0; i < length; i++) {
            let randomNumber = crypto.getRandomValues(new Uint32Array(1))[0];
            randomNumber = randomNumber / 0x100000000;

            randomNumber = Math.floor(randomNumber * validChars.length);
            generatedPassword += validChars[randomNumber];
        }
        return generatedPassword;
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
