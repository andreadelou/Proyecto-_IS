import React from 'react'
const { render } = require("@testing-library/react")
const { default: Header } = require("../components/NavBar")


describe('Test para <Navbar/>', () => {
	test('Navbar renderiza correctamente', () => {
		const { container } = render(<Header title={"Hola"} subtitle={"Mundo"} />)	
		expect(container).toMatchSnapshot()	// El snapshot es una fotografia del componente
	})
})