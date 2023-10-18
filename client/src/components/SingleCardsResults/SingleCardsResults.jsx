import SearchResultCard from '../SearchResultCard/SearchResultCard';
import SingleCardsHeader from '../SingleCardsHeader/SingleCardsHeader';
import './SingleCardsResults.scss';

const SingleCardsResults = ({ content }) => {
  return (
    <div className="SingleCardsResults">
      <SingleCardsHeader />
      <div className="single-cards-results-wrapper">
        {content.data.map((result, index) => {
          return <SearchResultCard key={index} content={result} />;
        })}
      </div>
    </div>
  );
};

export default SingleCardsResults;
