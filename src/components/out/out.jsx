import React from "react";

const Out = ({password}) => {
    const copyPassword = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(password)
    }

    return <form
        onSubmit={copyPassword}>
        <div
            className="input-group input-group-sm mt-2 lngth">
            <input
                type="text"
                className="form-control"
                defaultValue={password}
                disabled
            >
            </input>
            <button 
                type="submit"
                className="btn">
                <i className="fa-regular fa-copy"></i>
            </button>
        </div>
    </form>
}

export default Out;
