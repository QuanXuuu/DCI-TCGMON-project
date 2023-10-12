import "./Button.scss";

const Button = ({ text, uppercase }) => {    
    // const buttonText = text;
    // const uppercaseBoolean = uppercase;
    
    return (
        <>
            <button className="Button">{ uppercase ? text.toUpperCase() : text }</button>
        </>
    );
};

export default Button;
