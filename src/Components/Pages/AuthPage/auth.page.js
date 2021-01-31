import React, { useContext, useEffect, useMemo, useRef } from "react";
import AuthContext from "../../../Context/authContext";
import Toast from "../../../Toast/toast";
import AuthForm from "../../Forms/AuthForm/authForm";
import { usePostRequest } from "../../Hooks/ServerRequestHooks/serverRequestHooks";
import Tabs from "../../Tabs/tabs";


function AuthPage(props) {
    const { isLoading, result, error, request } = usePostRequest({ url: "api/auth/register" });
    const { isLoading: isLoginRequestLoading, result: loginResult, error: loginError, request: loginRequest } = usePostRequest({ url: "api/auth/login" });
    const authContext = useContext(AuthContext);
    const loginEmailInputRef = useRef();

    const authToast = useMemo(() => {
        return Toast.Init({
            title: "Error",
            toastStyleClass: "toast--green",
            position: "left-bottom",
            direction: "from-bottom"
        });
    }, []);

    useEffect(() => {
        loginEmailInputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (error || loginError) {
            debugger;
            authToast.options.message = error || loginError;
            authToast.Show();
        }
    }, [error, loginError]);

    useEffect(() => {
        if (result || loginResult) {
            debugger;
            authToast.options.title = "Success";
            authToast.options.message = (result || loginResult).message;
            authToast.Show();
        }
    }, [result, loginResult]);

    async function handleLoginSubmit({ email, password }) {
        try {
            debugger;
            const resultData = await loginRequest({ body: JSON.stringify({ email, password }) });
            debugger;
            authContext.login(resultData.token, resultData.userID);
        } catch (e) {
            debugger;
        }
    }

    async function handleSigninSubmit({ email, password }) {
        try {
            debugger;
            await request({ body: JSON.stringify({ email, password }) });
            debugger;
        }
        catch (e) {
            debugger;
        }
        debugger;
    }

    return (
        <section className="c-authentication" id="authPage">
            <h1 className="c-authentication__title">Authentication</h1>
            {(isLoading || isLoginRequestLoading) ? <p>Loading...</p> : undefined}
            <Tabs customClassesStr="c-authentication__tabs" items={[{
                title: "Login",
                content: <AuthForm forwardedEmailRef={loginEmailInputRef} handleSubmit={handleLoginSubmit} buttonTitle="login" isLoading={isLoading}></AuthForm>
            }, {
                title: "Sign in",
                content: <AuthForm handleSubmit={handleSigninSubmit} buttonTitle="sign in" isLoading={isLoading}></AuthForm>
            }]} />
        </section>
    )
};

export default AuthPage; 