import './Button.scss';

const Button = ({ text, uppercase = false }) => {
  return (
    <>
      <button className="Button">
        {uppercase ? text.toUpperCase() : text}
      </button>
    </>
  );
};

export default Button;
