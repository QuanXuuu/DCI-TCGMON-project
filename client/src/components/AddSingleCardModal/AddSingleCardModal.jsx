import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';

import './AddSingleCardModal.scss'

const AddSingleCardModal = ({ isAddSingleCardModalOpen, toggleAddSingleCardModal, content, collections }) => {
    const [condition, setCondition] = useState('');
    const [grade, setGrade] = useState('');
  
    const handleConditionChange = (event) => {
      const selectedCondition = event.target.value;
      setCondition(selectedCondition);
  
      if (selectedCondition !== '') {
        setGrade('');
      }
    };
  
    const handleGradeChange = (event) => {
      const selectedGrade = event.target.value;
        setGrade(selectedGrade);
        
      if (selectedGrade !== '') {
        setCondition('');
      }
    };

    const UserData = useContext(UserDataContext); // collections.collectionName
    
    return (
        <div className='AddSingleCardModal' style={{ overflowY: isAddSingleCardModalOpen ? 'scroll' : 'hidden' }}>
            <div className="close">
                <CloseButton
                isAddSingleCardModalOpen={isAddSingleCardModalOpen}
                toggleAddSingleCardModal={toggleAddSingleCardModal}
                />
            </div>

            <div className='content'>
                
                <p className='title'>{content.name}</p>
                
                <div className='img-and-info-wrapper'>
                    <img src={content.images.large} alt={content.id} />

                    <div className='info'>
                        <p className='cycle-name'>{content.set.series}</p>
                        
                        <p className='set-infos set-name'>{content.set.name}</p>

                        <p className='set-infos'>{content.number} / {content.set.total}</p>

                        <p className='set-infos'>{content.rarity}</p>
                    </div>
                </div>
                <div className='inputs'>
                    <div className='select-fields'>
                        <p>1st Edition</p>
                        <select className='select'>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p>Reverse Holo</p>
                        <select className='select'>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p>Language</p>
                        <select className='select'>
                            <option value="English">English</option>
                            <option value="German">German</option>
                            <option value="Japanese">Japanese</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Italian">Italian</option>
                            <option value="Korean">Korean</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Thai">Thai</option>
                            <option value="Traditional Chinese">Traditional Chinese</option>
                            <option value="Simplified Chinese">Simplified Chinese</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p
                            onChange={handleConditionChange}
                            style={{
                                color: grade ? 'rgb(66, 66, 66)' : '',
                            }}
                        >Condition</p>
                        <select
                            className='select'
                            value={condition}
                            onChange={handleConditionChange}
                            style={{
                                backgroundColor: grade ? 'rgb(66, 66, 66)' : '',
                              }}
                        >
                            <option value=""></option>
                            <option value="Mint">Mint</option>
                            <option value="Near Mint">Near Mint</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Light">Light Played</option>
                            <option value="Played">Played</option>
                            <option value="Poor">Poor</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p
                            onChange={handleGradeChange}
                            style={{
                                color: condition ? 'rgb(66, 66, 66)' : '',
                            }}
                        >Grade</p>
                        <select
                            className='select'
                            value={grade}
                            onChange={handleGradeChange}
                            style={{
                                backgroundColor: condition ? 'rgb(66, 66, 66)' : '',
                              }}
                        >
                        <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p>Purchase Price</p>
                        <form className='select' action="">
                        <input type="Text" placeholder="00.00" />€
                        </form>
                    </div>

                    <div className='select-fields'>
                        <p>Collection</p>
                        <select className='select'>
                            <option value="collection"></option>
                        </select>
                    </div>

                </div>
                <div className='button-div'>
                    <button className='add-button'>Add Card</button>
                </div>    
            </div>
        </div>
    )
}

export default AddSingleCardModal;
