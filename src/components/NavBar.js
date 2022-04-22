import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import "../CSS/navbar.css";

function Header({ title, subtitle }) {
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
            <nav>
                <ul className='nav_links'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Metas</a></li>
                    <li><a href="#">Salud</a></li>
                    <li><a href="#">Calendario</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header