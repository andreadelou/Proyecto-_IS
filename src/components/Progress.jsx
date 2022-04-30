import React from 'react';
import PropTypes from 'prop-types';
//hacer npm install prop-types
import Styled from 'styled-components';
//hacer npm install styled-components


const Container = Styled.div`
    progress[value]{
        width: ${props => props.width};

        -webkit-appearance: none;
        appearance: none;
        
    }

    progress[value]::-webkit-progress-bar{
        height: 32px;
        border-radius: 20px;
        background-color: #fef1b9;
    }

    progress[value]::-webkit-progress-value{
        height: 32px;
        border-radius: 20px;
        background-color: #6c8cbf;
    }


`;
const ProgressBar = ({value, max, color, width}) => {

    return(
        <Container color = {color} width={width}>
        <progress value = {value} max = {max}/>
        </Container>
    )

};


ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
    color: PropTypes.string,
    width: PropTypes.string,
}

ProgressBar.defaultProps = {
    max: 100,
    color: "lightBlue",
    width: "500px",
}

export default ProgressBar;

