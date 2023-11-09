import { useState, useContext, useEffect } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import SuccessModalTextContext from '../../contexts/SuccessModalTextContext';
import TriggerSuccessModalContext from '../../contexts/TriggerSuccessModal';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import CollectionSummaryContainer from '../../components/CollectionSummaryContainer/CollectionSummaryContainer';
import AddCollectionButton from '../../components/AddCollectionButton/AddCollectionButton';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import ErrorAndSuccessModal from '../../components/ErrorAndSuccessModal/ErrorAndSuccessModal';
import './MyCollectionsPage.scss';

const MyCollectionsPage = () => {
  const { userData, setUserData } = useContext(UserDataContext);
  const { successModalText } = useContext(SuccessModalTextContext);
  const { isMyCollectionsSuccessModalOpen } = useContext(
    TriggerSuccessModalContext
  );
  const { triggerSuccessModal } = useContext(TriggerSuccessModalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDataSingleCards, setPokemonDataSingleCards] = useState({});
  const [pokemonDataSealedProducts, setPokemonDataSealedProducts] = useState(
    {}
  );

  const { user } = useAuthContext();
  const userLoggedIn = user.data.user;

  const [isAddCollectionModalOpen, setIsAddCollectionModalOpen] =
    useState(false);

  const toggleAddCollectionModal = () => {
    setIsAddCollectionModalOpen(!isAddCollectionModalOpen);
  };

  useEffect(() => {
    const generateCollectionsData = async () => {
      const fetchUserData = await fetch(`/api/users/${userLoggedIn.email}`, {
        method: 'GET',
      });
      const userData = await fetchUserData.json();
      setUserData(userData);
      console.log('updatedUserData', userData);

      const singleCardsQueryStringArray = [];
      const sealedProductsQueryStringArray = [];

      userData.collections.map((collection) => {
        return collection.collectionContent.singleCards.map((entry) => {
          return singleCardsQueryStringArray.push(`id:"${entry.id}"`);
        });
      });

      userData.collections.map((collection) => {
        return collection.collectionContent.sealedProducts.map((entry) => {
          return sealedProductsQueryStringArray.push(`id:"${entry.id}"`);
        });
      });

      const singleCardsQueryString = singleCardsQueryStringArray.join(' OR ');
      const sealedProductsQueryString =
        sealedProductsQueryStringArray.join(' OR ');

      if (!singleCardsQueryString && !sealedProductsQueryString) {
        return;
      }

      if (singleCardsQueryString) {
        const fetchPokemonDataSingleCards = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=(${singleCardsQueryString})`,
          {
            method: 'GET',
          }
        );
        const pokemonDataSingleCards = await fetchPokemonDataSingleCards.json();
        setPokemonDataSingleCards(pokemonDataSingleCards);
      }

      if (sealedProductsQueryString) {
        const fetchPokemonDataSealedProducts = await fetch(
          `https://api.pokemontcg.io/v2/sealed?q=(${sealedProductsQueryString})`,
          {
            method: 'GET',
          }
        );
        const pokemonDataSealedProducts =
          await fetchPokemonDataSealedProducts.json();
        setPokemonDataSealedProducts(pokemonDataSealedProducts);
      }

      setIsLoading(false);
    };

    generateCollectionsData();
  }, []);

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

  return isLoading ? null : (
    <div className="MyCollectionsPage">
      <Header />
      <div className="page-wrapper">
        <h1>My Collections</h1>
        <CollectionSummaryContainer
          data={{ userData, pokemonDataSingleCards, pokemonDataSealedProducts }}
        />
        <div className="button-wrapper">
          <AddCollectionButton
            text={'Create new collection'}
            toggleAddCollectionModal={toggleAddCollectionModal}
          />
          {isAddCollectionModalOpen && (
            <AddCollectionModal
              isAddCollectionModalOpen={isAddCollectionModalOpen}
              toggleAddCollectionModal={toggleAddCollectionModal}
              toggleSuccessModal={triggerSuccessModal}
            />
          )}
          <Button text={'Search'} link={'search'} />
        </div>
      </div>
      {isMyCollectionsSuccessModalOpen ? (
        <ErrorAndSuccessModal
          customClassName="floating-success-modal"
          easmText={successModalText}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyCollectionsPage;
