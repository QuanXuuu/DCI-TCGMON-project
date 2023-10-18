import React, { useState } from 'react';
import Button from "../../components/Button/Button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './SearchBySet.scss'; 

const SearchBySet = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    }

    return (
        <div className={`SearchBySet ${isDropdownVisible ? 'dropdown-visible' : ''}`}>
            <div className="SearchBySetDropdown">
                <div className="SearchBySetDropdownBox" onClick={toggleDropdown}>
                    <p>
                        Choose set
                        <FontAwesomeIcon icon={faArrowDown} className="DropdownArrow"/>
                    </p>
                </div>
                {isDropdownVisible && (
                    <div className="dropdown-content">
                        <p className='SetName'>Set 1</p>
                        <p className='SetName'>Set 2</p>
                        <p className='SetName'>Set 3</p>
                        <p className='SetName'>Set 4</p>
                    </div>
                )}
           </div>
            <Button text={ "Show results" } />
        </div>
    )
}

export default SearchBySet;
