import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import "../CSS/navbar.css";
import { logout } from '../firebase';


export let util = {
	logOut: null
}


export function Header({ title, subtitle, Bandera = false }) {
	util.logOut = async function logOut() {

			await logout()
		}
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start"
        }}>
            <VStack spacing={"38px"} alignItems={"start"}>
                <Heading as={"h1"} fontSize={"70px"} fontWeight={"300"}>
                    {title}
                </Heading>
                <Heading as={"h2"} fontSize={'25px'} >
                    {subtitle}
                </Heading>
            </VStack>
            {
                Bandera ?
                    <nav>
                        <ul className='nav_links'>
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/goals">Metas</Link></li>
                            <li><Link to="/health">Bienestar</Link></li>
                            <li><Link to="/calendar">Calendario</Link></li>
                            <li  ><a onClick={util.logOut} data-testid="logoutButton">Log Out</a></li>
                        </ul>
                    </nav>
                    : ''
            }

        </div>
    )
}

export default Header