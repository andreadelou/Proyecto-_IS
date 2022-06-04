import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import "../CSS/navbar.css";
import { logout } from '../firebase';



function Header({ title, subtitle, Bandera=false }) {

    async function LogOut(){
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
                        <li><a href="home">Home</a></li>
                        <li><a href="goals">Metas</a></li>
                        <li><a href="health">Bienestar</a></li>
                        <li><a href="calendar">Calendario</a></li>
                        <li><a onClick={LogOut}>Log Out</a></li>
                    </ul>
                </nav> 
                : ''
            }
            
        </div>
    )
}

export default Header