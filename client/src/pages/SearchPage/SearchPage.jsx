import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import SearchByCard from '../../components/SearchByCard/SearchByCard';
import SearchBySet from '../../components/SearchBySet/SearchBySet';
import './SearchPage.scss';

const SearchPage = () => {

  const [selectedOption, setSelectedOption] = useState('set');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  }

  return (
    <div className='SearchPage'>
      <Header />
      <div className='SearchPageWrapper'>
        <h1>Search</h1>
        <div className='SearchSwitchButtons'>
          <button
            className={`SwitchButton ${selectedOption === 'set' ? 'active' : ''}`}
            onClick={() => handleOptionChange('set')}
          >
            Search by set
          </button>
          <button
            className={`SwitchButton ${selectedOption === 'card' ? 'active' : ''}`}
            onClick={() => handleOptionChange('card')}
          >
            Search by card
          </button>
        </div>
        {selectedOption === 'set' && <SearchBySet />}
        {selectedOption === 'card' && <SearchByCard />}
      </div>
    </div>
  )
}

export default SearchPage;
