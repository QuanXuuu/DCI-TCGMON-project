import { useState, useContext, useEffect } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import Header from '../../components/Header/Header';
import CollectionSummary from '../../components/CollectionSummary/CollectionSummary';
import Button from '../../components/Button/Button';
import AddCollectionButton from '../../components/AddCollectionButton/AddCollectionButton';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import './MyCollectionsPage.scss';

const MyCollectionsPage = () => {
  const { userData, setUserData } = useContext(UserDataContext);

  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);

  const toggleAddCollectionModal = () => {
    setIsAddCollectionModalOpen(!isAddCollectionModalOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/testuserololo`, {
        method: 'GET',
      });
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();

    if (isAddCollectionModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [setUserData, isAddCollectionModalOpen]);

  return !userData ? null : (
    <div className="MyCollectionsPage">
      <Header />
      <div className="page-wrapper">
        <h1>My Collections</h1>
        <div className="collection-wrapper">
          {userData.collections.map((collection, index) => {
            return <CollectionSummary key={index} content={collection} />;
          })}
        </div>
        <div className="button-wrapper">
          <AddCollectionButton
            text={'Create new collection'}
            toggleAddCollectionModal={toggleAddCollectionModal}
          />
          {isAddCollectionModalOpen && (
            <AddCollectionModal
              isAddCollectionModalOpen={isAddCollectionModalOpen}
              toggleAddCollectionModal={toggleAddCollectionModal}
            />
          )}
          <Button text={'Search'} link={'search'} />
        </div>
      </div>
    </div>
  );
};

export default MyCollectionsPage;
