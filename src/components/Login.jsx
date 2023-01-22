import Title from "./styled/Title";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "./utils/globalStateContext";

const InputWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    width: 40%;
    max-width: 400px;
    margin-bottom: 0.6rem;
`;

function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const [validateMessage, setMessage] = useState({
        username: null,
        password: null,
        api: null,
    });

    const { store, dispatch } = useGlobalContext();

    const loginHandler = (e) => {
        e.preventDefault();

        let hasError = false;

        if (!user.username) {
            setMessage((prevState) => {
                return {
                    ...prevState,
                    username: "Username should not be empty.",
                };
            });
            hasError = true;
        }

        if (!user.password) {
            setMessage((prevState) => {
                return {
                    ...prevState,
                    password: "Password should not be empty.",
                };
            });
            hasError = true;
        }

        if (!hasError) {
            setMessage({
                username: null,
                password: null,
                api: null,
            });
            axios
                .post("/auth/login", user)
                .then((res) => res.data)
                .then((json) => {
                    console.log(json);
                    dispatch({
                        type: "setToken",
                        data: json.token,
                    });

                    dispatch({
                        type: "setUser",
                        data: user.username,
                    });
                })
                .catch((error) => {
                    setMessage((prevState) => {
                        return {
                            ...prevState,
                            api: "Username/password invalid.",
                        };
                    });
                });
        }
    };

    const formChangeHandler = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setUser((prevState) => {
            return {
                ...prevState,
                [key]: value,
            };
        });
    };

    return (
        <div className="login">
            {!store.loggedInUserName ? (
                <div>
                    <Title>Login</Title>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        onSubmit={loginHandler}
                    >
                        <InputWrapper>
                            <label htmlFor="username">User Name:</label>
                            <input
                                type="text"
                                name="username"
                                value={user.userName}
                                onChange={formChangeHandler}
                            />
                        </InputWrapper>
                        {validateMessage.username && (
                            <div style={{ color: "red", fontSize: "0.7rem" }}>
                                {validateMessage.username}
                            </div>
                        )}
                        <InputWrapper>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={formChangeHandler}
                            />
                        </InputWrapper>
                        {validateMessage.password && (
                            <div style={{ color: "red", fontSize: "0.7rem" }}>
                                {validateMessage.password}
                            </div>
                        )}
                        <InputWrapper>
                            <div></div>
                            <input type="submit" value="Login" />
                        </InputWrapper>
                        {validateMessage.api && (
                            <div style={{ color: "red", fontSize: "0.8rem" }}>
                                {validateMessage.api}
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <Title>Welcome back!</Title>
            )}
        </div>
    );
}

export default Login;
