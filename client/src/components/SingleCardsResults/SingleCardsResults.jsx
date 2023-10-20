import SearchResultCard from '../SearchResultCard/SearchResultCard';
import SingleCardsHeader from '../SingleCardsHeader/SingleCardsHeader';
import './SingleCardsResults.scss';

const SingleCardsResults = ({ content }) => {
  return (
    <div className="SingleCardsResults">
      <SingleCardsHeader />
      <div className="single-cards-results-wrapper">
        {content.data
          .sort((a, b) => {
            const dateComparison =
              new Date(a.set.releaseDate) - new Date(b.set.releaseDate);

            if (dateComparison !== 0) {
              return dateComparison;
            }

            const idA = a.id;
            const idB = b.id;

            const aParts = idA.split('-');
            const bParts = idB.split('-');

            const aAlpha = aParts[0];
            const bAlpha = bParts[0];
            const alphaComparison = aAlpha.localeCompare(bAlpha);

            if (alphaComparison !== 0) {
              return alphaComparison;
            }

            const aNum = parseInt(aParts[1]);
            const bNum = parseInt(bParts[1]);

            return aNum - bNum;
          })

          .map((result, index) => {
            return <SearchResultCard key={index} content={result} />;
          })}
      </div>
    </div>
  );
};

export default SingleCardsResults;
