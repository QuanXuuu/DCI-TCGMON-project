import Button from "../../components/Button/Button"
import './SearchByCard.scss'; 

const SearchByCard = () => {
    return (
        <div className="SearchByCard">
            <div className="SearchByCardForm">
                <form action="">
                    <input type="text" placeholder='Card name' />
                </form>
           </div>
            <Button text={ "Show results" } />
        </div>
    )
}

export default SearchByCard;
