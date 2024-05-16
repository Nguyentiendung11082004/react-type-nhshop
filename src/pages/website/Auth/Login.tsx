import { useForm } from "react-hook-form";
import instance from "../../../config/axios";
import { IUser } from "../../../commons/interfaces/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();
  const onsubmit = (user: IUser) => {
    try {
      (async () => {
        const { data } = await instance.post(`/login`, user);
        localStorage.setItem("User", JSON.stringify(data));
        const cf = confirm(
          "Login done!Do you want to switch to the admin page?"
        );
        if (cf) {
          navigate("/admin");
        }
      })();
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
      <div className="container">
        <section className="login">
          <div className="login__heading">
            <p>Login</p>
          </div>

          <div className="login__form">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div>
                <label>Username: </label> <br />
                <input
                  type="text"
                  className="form-control"
                  {...register("email")}
                />
              </div>
              <div>
                <label>Password: </label> <br />
                <input
                  type="password"
                  className="form-control"
                  {...register("password")}
                />
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

export default Login;
