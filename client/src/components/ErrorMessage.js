import React from 'react';;

function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null;
    return (

        <div>
            <p className='text-red-700'>{error}</p>
        </div>
    );
}


export default ErrorMessage;