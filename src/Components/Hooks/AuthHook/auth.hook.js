import { useCallback, useEffect, useMemo, useState } from "react";
import useClientStorage from "../ClientStorage/clientStorage.hook";

const LOGIN_KEY = "userLoginData";

function useAuth() {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [ready, setReady] = useState(false);
    const [getData, setData, removeData] = useClientStorage();

    const login = useCallback((jwtToken, userId) => {
        setToken(jwtToken);
        setUserID(userId);
        setData(LOGIN_KEY, JSON.stringify({ token: jwtToken, userId }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserID(null);
        removeData(LOGIN_KEY);
    }, []);

    useEffect(() => {
        const loginData = getData(LOGIN_KEY);
        if (loginData) {
            const loginObjData = JSON.parse(loginData);
            if (loginObjData) {
                login(loginObjData.token, loginObjData.userId);
                setReady(true);
            }
        }
    }, [login]);

    return { login, logout, token, userID, ready };
}

function useAuthorizationHeader(token) {

    const authorizationHeader = useMemo(() => {
        return { authorization: `BEARER ${token}` };
    }, [token]);

    return authorizationHeader;
}

export { useAuth, useAuthorizationHeader };