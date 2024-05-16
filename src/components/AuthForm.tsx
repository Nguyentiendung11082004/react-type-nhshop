// AuthForm.tsx
import React from "react";

interface AuthFormProps {
//   title: string;
//   additionalText: String,
//   onSubmit: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = () => {
  return (
    <div>
      <div className="container">
        <section className="login">
          <div className="login__heading">
            <p></p>
          </div>
          <div className="login__form">
            <form >
              <div>
                <label>Username: </label> <br />
                <input type="text" className="form-control" />
              </div>
              <div>
                <label>Password: </label> <br />
                <input type="password" className="form-control" />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="login__btn">
            <button className="facebook">Facebook</button>
            <button className="google">Google</button>
          </div>
          <p className="mt-3"></p>
        </section>
      </div>
    </div>
  );
};

export default AuthForm;
