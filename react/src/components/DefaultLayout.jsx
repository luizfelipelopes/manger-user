import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const { token, user, setUser, setToken, notification } = useStateContext();

    if(!token) {
        return <Navigate to={'/login'} />
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setToken(null);
        })
        
    }

    useEffect(() => {
        axiosClient.get('/user')
        .then(({ data }) => {
            setUser(data)
        })
    }, [])
    
    return(
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                <div>
                    Header
                </div>

                <div>
                    {user.name} &nbsp; &nbsp;
                    <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                </div>
                </header>
                <main>
                <Outlet/>
                </main>
                {notification &&
                <div className="notification">
                    {notification}
                </div>
                }
            </div>
        </div>
    );
}