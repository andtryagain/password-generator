import React, { useState } from 'react';

import Options from '../options';
import Out from '../out';

const App = () => {

    const [password, setPassword] = useState('');

    const sendPassword = (password) => {
        setPassword(password)
        return password;
    }

    return (
        <div className='mt-5 ms-5'>
            <h2>password-generator</h2>
            <Options formedPass={sendPassword}/>
            <Out password={password}/>
        </div>
    );
}

export default App;
