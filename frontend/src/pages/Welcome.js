import React, { useState } from 'react';
import { auth } from '../firebase.js';

import { useNavigate } from "react-router-dom";
import { Button } from '@chakra-ui/react';
import medicina from "../assets/droga-de-la-medicina.png";
import leer from "../assets/leer.png";
import meditar from "../assets/meditacion.png";
import trotar from "../assets/trotar.png";
import blob from "../assets/blob01.png";
import Header from "../components/Header";
import rana from "../assets/rana.png";
import planta from "../assets/planta.png";
import "../CSS/welcome.css"
import {
	Image,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { updateUserInfo } from '../services/users.service.js';
import { insertGoal } from '../services/goals.service.js';
import { useAuthState } from 'react-firebase-hooks/auth';

function Welcome() {
	const [user, loadingUser] = useAuthState(auth);
	const [pet, setPet] = useState(''); // State for pet picker
	const [goals, setGoals] = useState([]); // State for goals picker
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	/**
	 * Add or remove a goal from the array
	 * @param {string} goal 
	 */
	const toggleGoal = (goal) => {
		if (goals.includes(goal)) {
			// remove the goal from the array
			setGoals(goals.filter(goalF => goalF !== goal));
		} else {
			// add the goal from the array
			setGoals([...goals, goal]);
		}
	}

	/**
	 * Save the user configuration
	 */
	const saveConfiguration = async () => {
		await updateUserInfo(user.uid, { configured: true, pet });
		console.log('sdfsd')
		for (const goal of goals) {
			let title = '';
			switch (goal) {
				case 'health':
					title = 'Tomar mis medicinas';
					break;
				case 'mentalhealth':
					title = 'Meditar'
					break;
				case 'exercise':
					title = 'Hacer Ejercicio'
					break;
				case 'learn':
					title = 'Estudiar';
					break;
			}

			await insertGoal(title, goal);
			setLoading(false);
			navigate('/home');
		}
	}

	return (
		<div className='welcome'>
			<header>
				<Header title="Personaliza" subtitle={"Configura tus metas"}></Header>
			</header>
			<br />
			<span className='subtitulos'>Selecciona al menos dos</span>
			<p></p>

			<button data-testid="exerciseButton" className='botonesnow' onClick={() => { toggleGoal('exercise') }}>
				{goals.includes('exercise') ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={trotar} height="40" width="60" alt='ejercicio' />Ejercicio </button>
			<button data-testid="meditarButton" className='botonesnow' onClick={() => { toggleGoal('mentalhealth') }} >
				{goals.includes('mentalhealth') ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={meditar} alt="meditar" height="40" width="60" />Meditar </button>
			<p></p>
			<button className='botonesnow' onClick={() => { toggleGoal('learn') }} >
				{goals.includes('learn') ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={leer} alt="leer" height="40" width="60" />Leer </button>
			<button className='botonesnow' onClick={() => { toggleGoal('health') }} >
				{goals.includes('health') ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={medicina} alt="medicina" height="40" width="60" />Medicina </button>


			<p></p>

			<span className='subtitulos'>Escoge tu nueva mascota</span>
			<p></p>
			<button data-testid="frogButton" className='botonesnow' onClick={() => {
				setPet('frog');
			}} >
				{pet === 'frog' ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={rana} height="40" width="60" />
			</button>
			<button data-testid="plantButton" className='botonesnow' onClick={() => {
				setPet('plant');
			}} >{pet === 'plant' ? <FaCheckCircle className='botonesnow__icon' /> : ''}
				<img src={planta} height="40" width="60" />
			</button>
			<p></p>

			<Button className='botones' display={"inline-block"}
				backgroundColor="primary"
				textColor="textLight"
				onClick={saveConfiguration}
				data-testid="startButton"
				disabled={!pet || goals.length < 2}>Comenzar</Button>
			<Image
				position={"absolute"}
				right="0"
				top="0"
				className="header__image"
				zIndex={-1}
				src={blob}
			/>

		</div>
	)
}

export default Welcome