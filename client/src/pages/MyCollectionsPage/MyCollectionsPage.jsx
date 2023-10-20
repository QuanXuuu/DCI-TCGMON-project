import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import CollectionSummary from '../../components/CollectionSummary/CollectionSummary';
import Button from '../../components/Button/Button';
import AddCollectionButton from '../../components/AddCollectionButton/AddCollectionButton';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import './MyCollectionsPage.scss';

const MyCollectionsPage = () => {
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] = useState(false); 
    
  const toggleAddCollectionModal = () => {                   
  setIsAddCollectionModalOpen(!isAddCollectionModalOpen);                       
  }; 

  useEffect(() => { 
    if (isAddCollectionModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddCollectionModalOpen]);

  return (
    <div className="MyCollectionsPage">
      <Header />
      <div className="page-wrapper">
        <h1>My Collections</h1>
        <div className="collection-wrapper">
          <CollectionSummary />
          <CollectionSummary />
          <CollectionSummary />
        </div>
        <div className="button-wrapper">
          <AddCollectionButton
            text={'Add new collection'}
            toggleAddCollectionModal={toggleAddCollectionModal}
          />
          {isAddCollectionModalOpen && <AddCollectionModal isAddCollectionModalOpen={isAddCollectionModalOpen} toggleAddCollectionModal={toggleAddCollectionModal}
          />}
          <Button text={'Search'} link={'search'} />
        </div>
      </div>
    </div>
  );
};

export default MyCollectionsPage;
