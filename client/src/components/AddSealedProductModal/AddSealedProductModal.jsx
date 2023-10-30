import { useState, useContext } from 'react';
import UserDataContext from '../../contexts/UserDataContext';
import CloseButton from '../CloseButton/CloseButton';

import './AddSealedProductModal.scss';

const AddSealedProductModal = ({ isAddSealedProductModalOpen, toggleAddSealedProductModal, content }) => {
    const [condition, setCondition] = useState('');
    const [grade, setGrade] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    
    return (
        <div className='AddSealedProductModal' style={{ overflowY: isAddSealedProductModalOpen ? 'scroll' : 'hidden' }}>
            <div className="close">
                <CloseButton
                isAddSealedProductModalOpen={isAddSealedProductModalOpen}
                toggleAddSealedProductModal={toggleAddSealedProductModal}
                />
            </div>

            <div className='content'>
                
                <p className='title'>{content.name}</p>
                
                <div className='img-and-info-wrapper-sealed'>
                    <div className="product-image-wrapper">
                        <img src={content.images.small} alt={content.id} />
                    </div>    

                    <div className='info'>
                        <p className='cycle-name'>{content.set.name}</p>
                        
                        <p className='set-infos set-name'>{content.type}</p>

                        <p className='set-infos set-name'>{content.set.id.toUpperCase()}</p>

                    </div>
                </div>
                <div className='inputs'>
                    <div className='select-fields'>
                        <p>1st Edition</p>
                        <select className='select'>
                            <option value=""></option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className='select-fields'>
                        <p>Language</p>
                        <select className='select'>
                            <option value=""></option>
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
                        <p>Purchase Price</p>
                        <form className='select' action="">
                            <input type="number" placeholder="00.00"/>€
                        </form>
                    </div>

                    <div className='select-fields'>
                        <p>Amount</p>
                        <form className='select' action="">
                            <input type="number" />
                        </form>
                    </div>

                    <div className='select-fields'>
                        <p>Collection</p>
                        <select className='select'>
                            <option value=""></option>
                        </select>
                    </div>

                    {/* <div className='select-fields'>
                        <p>Collection</p>
                        <select className='select'>
                        <option value=""></option>
                        {userData.collections.map((collection) => (
                        <option key={collection.collectionName} value={collection.collectionName}>
                        {collection.collectionName}
                        </option>
                        ))}
                        </select>
                    </div> */}

                </div>
                <div className='button-div'>
                    <button className='add-button'>Add Product</button>
                </div>    
            </div>
        </div>
    )
}

export default AddSealedProductModal;
