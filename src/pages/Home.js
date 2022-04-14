import React, { useEffect } from 'react';
import { auth, logout } from '../firebase.js';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';


function Home() {
    const navigate = useNavigate(); // navigate

    // Auth State
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
    }, [user, loading]);
    return (
        <>
            <div>Home</div>
            <Button onClick={logout}>Logout</Button>
        </>
    )
}

export default Home