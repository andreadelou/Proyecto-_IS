import { useEffect, useState } from 'react';

import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase.js";

import { fetchAllGoalsAndGroupByCategory } from "../services/goals.service";


ChartJs.register(
	Tooltip, Title, ArcElement, Legend
);


function PieCharts({
	goals
}) {
	const [ejercicioT, setEjercicioT] = useState(0);
	const [apredizajeT, setApredizajeT] = useState(0);
	const [saludT, setSaludT] = useState(0);
	const [saludMental, setsaludMental] = useState(0);

	const [lista, setLista] = useState([]);


	const [user, loading, error] = useAuthState(auth);

	useEffect(() => {
		createGoalsChart()
	});


	const createGoalsChart = async () => {

		setEjercicioT(goals.exercise?.length);
		setApredizajeT(goals.learn?.length);
		setSaludT(goals.health?.length);
		setsaludMental(goals.mentalhealth?.length);


	};


	const num = [];
	let total = 0;

	num.push(ejercicioT);

	num.push(apredizajeT);

	num.push(saludT);

	num.push(saludMental);

	total = num[0] + num[1] + num[2] + num[3];

	let exer = 0;
	let apren = 0;
	let salu = 0;
	let saludM = 0;

	exer = (ejercicioT * 100) / total;
	apren = (apredizajeT * 100) / total;
	salu = (saludT * 100) / total;
	saludM = (saludMental * 100) / total;

	const data = {
		datasets: [
			{
				data: [exer, apren, salu, saludM],

				backgroundColor: [
					'#ffabab',
					'#fff78a',
					'#ace7ff',
					'#a79aff',
				]
			}

		],

		labels: [
			'Exercise',
			'Learn',
			'Health',
			'Mental-Health'
		]
	};


	return (
		<div style={{ width: '25%', height: '25%' }}>
			<Pie data={data} />

		</div>

	);
}

export default PieCharts;