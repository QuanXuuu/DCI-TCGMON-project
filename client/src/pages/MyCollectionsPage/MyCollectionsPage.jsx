import { useState, useContext, useEffect } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import Header from '../../components/Header/Header';
import CollectionSummaryContainer from '../../components/CollectionSummaryContainer/CollectionSummaryContainer';
import Button from '../../components/Button/Button';
import AddCollectionButton from '../../components/AddCollectionButton/AddCollectionButton';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import './MyCollectionsPage.scss';

const MyCollectionsPage = () => {
  const { userData, setUserData } = useContext(UserDataContext);

  const [pokemonData, setPokemonData] = useState();
  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);

  const toggleAddCollectionModal = () => {
    setIsAddCollectionModalOpen(!isAddCollectionModalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await fetch(`/api/users/bob@bob.de`, {
        method: 'GET',
      });
      const dataUser = await responseUser.json();
      setUserData(dataUser);

      const collectionData = [];

      dataUser.collections.map((collection) => {
        return collection.collectionContent.singleCards.map((entry) => {
          return collectionData.push(`id:"${entry.id}"`);
        });
      });

      const queryString = collectionData.join(' OR ');

      const responsePokemon = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=(${queryString})`,
        {
          method: 'GET',
        }
      );
      const dataPokemon = await responsePokemon.json();
      setPokemonData(dataPokemon);
    };

    fetchData();

    if (isAddCollectionModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [setUserData, isAddCollectionModalOpen]);

  return !pokemonData ? null : (
    <div className="MyCollectionsPage">
      <Header />
      <div className="page-wrapper">
        <h1>My Collections</h1>
        <CollectionSummaryContainer data={{ userData, pokemonData }} />
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
