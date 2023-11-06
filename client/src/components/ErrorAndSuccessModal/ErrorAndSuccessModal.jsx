import './ErrorAndSuccessModal.scss';

const ErrorAndSuccessModal = ({ customClassName, easmText }) => {
  return (
    <div className={`ErrorAndSuccessModal ${customClassName}`}>
      <div className="srp-success-container">
        <div className="easm-text">{easmText}</div>
      </div>
    </div>
  );
};

export default ErrorAndSuccessModal;
