import React from 'react';
const { render } = require("@testing-library/react")
const { default: ProgressBar } = require("../components/ProgressBar")

describe('Tests para <ProgressBar/>', () => {
	test('Renders a progress bar', () => {
		const { container } = render(<ProgressBar value={0} max={100} color={"blue"} />)
		expect(container).toMatchSnapshot()
	})
})