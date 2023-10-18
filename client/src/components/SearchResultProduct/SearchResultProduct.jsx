import './SearchResultProduct.scss';

const SearchResultProduct = ({ content }) => {
  return (
    <div className="SearchResultProduct">
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
  );
};

export default SearchResultProduct;
