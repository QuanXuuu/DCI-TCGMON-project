import { useState, useEffect } from 'react';
import AddSealedProductModal from '../AddSealedProductModal/AddSealedProductModal';
import './SearchResultProduct.scss';

const SearchResultProduct = ({ content, toggleSuccessModal }) => {
  const [isAddSealedProductModalOpen, setIsAddSealedProductModalOpen] =
    useState(false);

  const toggleAddSealedProductModal = () => {
    setIsAddSealedProductModalOpen(!isAddSealedProductModalOpen);
  };

  useEffect(() => {
    if (isAddSealedProductModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddSealedProductModalOpen]);

  return (
    <div className="SearchResultProduct">
      <div onClick={toggleAddSealedProductModal} className="srp-wrapper">
        <div className="product-image-wrapper">
          <img src={content.images.small} alt={content.id} />
        </div>
        <div className="product-info-wrapper">
          <h3>{content.name}</h3>
          <p>{content.set.name}</p>
          <div className="product-type-set-wrapper">
            <p>{content.type}</p>
            <p>{content.set.id.toUpperCase()}</p>
          </div>
        </div>
      </div>
      {isAddSealedProductModalOpen && (
        <AddSealedProductModal
          content={content}
          isAddSealedProductModalOpen={isAddSealedProductModalOpen}
          toggleAddSealedProductModal={toggleAddSealedProductModal}
          toggleSuccessModal={toggleSuccessModal}
        />
      )}
    </div>
  );
};

export default SearchResultProduct;
