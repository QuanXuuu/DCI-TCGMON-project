import { useEffect, useState, useContext } from 'react';
import ProductDataContext from '../../contexts/ProductDataContext';
import SealedProductsHeader from '../SealedProductsHeader/SealedProductsHeader';
import CollectionDetailsSealedProduct from '../CollectionDetailsSealedProduct/CollectionDetailsSealedProduct';
import './CollectionDetailsSealedProductsContent.scss';

const CollectionDetailsSealedProductsContent = ({
  marketTotal,
  toggleSuccessModal,
}) => {
  const { productContentData } = useContext(ProductDataContext);

  const [isLoading, setIsLoading] = useState(true);
  const [collectionContent, setCollectionContent] = useState([]);
  const [sealedProductData, setSealedProductData] = useState([]);

  useEffect(() => {
    setCollectionContent(
      productContentData.collectionDetailsData.collectionContent.sealedProducts
    );
    setSealedProductData(productContentData.pokemonDataSealedProducts);
    setIsLoading(false);
  }, [productContentData]);

  return isLoading ? null : (
    <div className="CollectionDetailsSealedProductsContent">
      <SealedProductsHeader />
      <div className="collection-details-sealed-products-content-wrapper">
        {collectionContent &&
          collectionContent.map((entry, index) => {
            return (
              <CollectionDetailsSealedProduct
                key={index}
                content={entry}
                sealedProductData={sealedProductData}
                marketTotal={marketTotal}
                toggleSuccessModal={toggleSuccessModal}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CollectionDetailsSealedProductsContent;
