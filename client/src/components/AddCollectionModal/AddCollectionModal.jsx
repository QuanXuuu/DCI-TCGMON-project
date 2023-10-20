import React, { useState } from 'react';
import AddCollectionButton from '../AddCollectionButton/AddCollectionButton';
import CloseButton from '../CloseButton/CloseButton';
import './AddCollectionModal.scss';

const AddCollectionModal = ({ isAddCollectionModalOpen, toggleAddCollectionModal }) => {

    return (
        <div className='AddCollectionModal'>
            <div className='close'>
                <CloseButton
                isAddCollectionModalOpen={isAddCollectionModalOpen} toggleAddCollectionModal={toggleAddCollectionModal}/>
            </div>    
            <div className='AddCollectionModalContent'>
                <p>Create New Collection</p>
                <input
                    className='CollectionNameInput'
                    type="text"
                    placeholder='Collection Name'    
                />
                <select name="TCGs" id="TCGname">
                    <option value="">Pokemon</option>
                </select>
                <AddCollectionButton text={'Create new collection'} />
            </div>
        </div>
    );
};

export default AddCollectionModal;