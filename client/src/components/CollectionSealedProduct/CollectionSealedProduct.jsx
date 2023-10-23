import './CollectionSealedProduct.scss';
import productImageExample from '../../assets/images/productImageExample.png';

const CollectionSealedProduct = () => {
  return (
    <div className="CollectionSealedProduct">
      <div className="collection-product-image-wrapper">
        <img src={productImageExample} />
      </div>
    </div>
  );
};

export default CollectionSealedProduct;
