import './ErrorAndSuccessModal.scss';

const ErrorAndSuccessModal = ({ customClassName, easmText }) => {
  return (
    <div className={`ErrorAndSuccessModal ${customClassName}`}>
      <div className="easm-text">{easmText}</div>
    </div>
  );
};

export default ErrorAndSuccessModal;
