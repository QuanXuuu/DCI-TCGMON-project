import Header from "../../components/Header/Header";
import SearchByCard from "../../components/SearchByCard/SearchByCard";
import './SearchPage.scss'; 

const SearchPage = () => {
    return (
        <div className="SearchPage">
            <Header />
            <div className="SearchPageWrapper">
                <h1>Search</h1>
            <div className="SearchSwitchButtons">
                <button className="SwitchButton">Search by set</button>
                <button className="SwitchButton">Search by card</button>
            </div>
            <SearchByCard/>
            </div>
        </div>
        
    )
}

export default SearchPage;