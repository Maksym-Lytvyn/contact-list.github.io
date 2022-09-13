import React from 'react';

const Button = ({isActive,clicked}) => {
    return (
        <div>
            <button onClick={clicked}>{isActive? "Вибрати іншого користувача" : "Отримати користувача"}</button>
        </div>
    )
}

export default Button