import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buttons = ({ buttonText, route, icon, large }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (route) {
            navigate(route);
        }
    };
  
  
    return (
        <button onClick={handleClick} className={`Achronicle-buttonss ${large ? 'px-40 py-5 text-[2rem]' : 'px-24 py-3 text-xl uppercase'} `}>
            <span>
                <em className={`flex text-white  font-bold  items-center gap-1 lg:gap-1`}>
                    {buttonText}  {icon && icon}
                </em>
            </span>
            <span>
                <em className="flex text-white  items-center gap-1 lg:gap-1">
                    {buttonText} {icon && icon}
                </em>
            </span>

        </button>
    );
};

export default Buttons;