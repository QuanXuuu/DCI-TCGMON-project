import SealedProductsHeader from '../SealedProductsHeader/SealedProductsHeader';
import CollectionDetailsSealedProduct from '../CollectionDetailsSealedProduct/CollectionDetailsSealedProduct';
import './CollectionDetailsSealedProductsContent.scss';

const CollectionDetailsSealedProductsContent = ({
  content,
  sealedProductData,
  marketTotal,
  collectionNameProp
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
              collectionNameProp={collectionNameProp}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CollectionDetailsSealedProductsContent;
