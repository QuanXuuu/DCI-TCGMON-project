import "./RegisterForm.scss";

const RegisterForm = () => {
    return (
        <div className="RegisterForm">
               
                <form action="">
                    <input className="RegisterFormInputOne" type="email" placeholder="Email address"/>
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Repeat password"/>
                </form>
            </div>
        
    )
}

export default RegisterForm;