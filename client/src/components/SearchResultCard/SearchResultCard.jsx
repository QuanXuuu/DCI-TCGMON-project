import { useState, useEffect } from 'react';
import AddSingleCardModal from '../AddSingleCardModal/AddSingleCardModal';
import './SearchResultCard.scss';

const SearchResultCard = ({ content }) => {
  const [isAddSingleCardModalOpen, setIsAddSingleCardModalOpen] =
  useState(false);

const toggleAddSingleCardModal = () => {
  setIsAddSingleCardModalOpen(!isAddSingleCardModalOpen);
  }; 
  
  useEffect(() => { 
    if (isAddSingleCardModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddSingleCardModalOpen]);

  return (
    <div className="SearchResultCard">
      <img  onClick={toggleAddSingleCardModal}
            src={content.images.small} alt={content.id} />
            {isAddSingleCardModalOpen && (
            <AddSingleCardModal 
            content={content}
            isAddSingleCardModalOpen={isAddSingleCardModalOpen}
            toggleAddSingleCardModal={toggleAddSingleCardModal}
        />
      )}
    </div>
  );
};

export default SearchResultCard;
