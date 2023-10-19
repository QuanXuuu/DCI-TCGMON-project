import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import './MyCollectionsPage.scss';

const MyCollectionsPage = () => {
  return (
    <div className="MyCollectionsPage">
      <Header />
      <div className="page-wrapper">
        <h1>My Collections</h1>
        <div className="button-wrapper">
          <Button text={'Create new collection'} />
          <Button text={'Search'} link={'search'} />
        </div>
      </div>
    </div>
  );
};

export default MyCollectionsPage;
