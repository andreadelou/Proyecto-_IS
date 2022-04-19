import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'

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
            <nav>Hola</nav>
        </div>
    )
}

export default Header