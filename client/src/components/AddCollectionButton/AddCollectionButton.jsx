import './../Button/Button.scss';

const AddCollectionButton = ({ text, toggleAddCollectionModal }) => {
  return (
    <>
      <button className="Button" onClick={toggleAddCollectionModal}>
        {text}
      </button>
    </>
  );
};

export default AddCollectionButton;
