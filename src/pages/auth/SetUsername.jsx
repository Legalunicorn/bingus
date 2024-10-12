//specfic for OAuth
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import "./auth.scss";
import { useEffect, useState } from "react";
import { IconAlertOctagon } from "@tabler/icons-react";
import { myFetch } from "../../utils/myFetch";
import { useAuthContext } from "../../hooks/useAuthContext";
import Loader from "../../components/Loaders/Loader";

const SetUsername = () => {
  const { user, dispatch } = useAuthContext();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const paramToken = searchParams.get("token");
    if (paramToken == null && user) {
      setToken(user.token);
    } else if (paramToken) {
      setToken(paramToken);
    } else {
      navigate("/auth/login");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    if (value.length < 2) {
      setError("username must be at least 2 characters");
    } else if (value.length >= 35) {
      setError("username cannot exceed 35 characters.");
    } else if (!/^[a-zA-Z0-9_.]*$/.test(value)) {
      setError("Must be alphanumeric, '-', '_', or '.' ");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const temp = {};
      temp.token = token;
      const data = await myFetch(
        "/auth/oauth/username",
        {
          method: "PATCH",
          body: JSON.stringify({
            username: e.target.username.value,
          }),
        },
        temp,
      );

      setDisabled(false);
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/p/home");

      //success
    } catch (err) {
      setDisabled(false);
      setError(err.message);
    }
  };

  return (
    <>
      <p>Almost Done!</p>
      <p>Choose a username:</p>
      <p className="error-box">
        {error ? (
          <>
            <IconAlertOctagon size="22px" />
            <span>{error}</span>
          </>
        ) : (
          ""
        )}
      </p>
      <Form className="form-general" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          required
          minLength="2"
          maxLength="35"
          placeholder="Eg. JohnDoe"
        />
        <button disabled={disabled} type="submit">
          Submit
        </button>
        <Loader loading={disabled} color={"black"} />
      </Form>

      <p>
        Back to login page{" "}
        <a className="redirect" onClick={() => navigate("/auth/login")}>
          here
        </a>
      </p>
    </>
  );
};

export default SetUsername;
