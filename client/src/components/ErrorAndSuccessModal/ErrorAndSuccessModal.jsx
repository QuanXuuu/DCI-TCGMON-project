import './ErrorAndSuccessModal.scss';

const ErrorAndSuccessModal = ({ customClassName, easmText }) => {
  return (
      <div className={`ErrorAndSuccessModal ${customClassName}`}>
        <div className="srp-success-container">
            <p className="easm-text">{easmText}</p>
        </div>
    </div>
  );
};

export default ErrorAndSuccessModal;
