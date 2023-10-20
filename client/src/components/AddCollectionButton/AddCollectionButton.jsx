import './../Button/Button.scss'

const AddCollectionButton = ({text,  toggleAddCollectionModal}) => {

  return (
    <>
          <button
              onClick={toggleAddCollectionModal}
              className="Button"
            >
            {text}   
        </button>
    </>
  );
};

export default AddCollectionButton;
