import './SearchResultCard.scss';

const SearchResultCard = ({ content }) => {
  return (
    <div className="SearchResultCard">
      <img src={content.images.small} alt={content.id} />
    </div>
  );
};

export default SearchResultCard;
