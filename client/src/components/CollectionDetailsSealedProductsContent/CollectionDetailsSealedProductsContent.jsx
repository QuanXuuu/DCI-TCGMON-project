import SealedProductsHeader from '../SealedProductsHeader/SealedProductsHeader';
import CollectionDetailsSealedProduct from '../CollectionDetailsSealedProduct/CollectionDetailsSealedProduct';
import './CollectionDetailsSealedProductsContent.scss';

const CollectionDetailsSealedProductsContent = ({
  content,
  sealedProductData,
  marketTotal,
  toggleSuccessModal,
}) => {
  return (
    <div className="CollectionDetailsSealedProductsContent">
      <SealedProductsHeader />
      <div className="collection-details-sealed-products-content-wrapper">
        {content.map((entry, index) => {
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
