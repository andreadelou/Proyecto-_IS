import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../components/Header";
import "../CSS/Calendario.css";
import blob from "../assets/blob01.png";
import { Image } from "@chakra-ui/react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchAllGoals, fetchGoalsByDate } from "../services/goals.service";
import { auth } from "../firebase.js";
import moment from "moment";



function NuevasMetas({ startDate, endDate }) {
    const [user, loading, error] = useAuthState(auth);

    const [goals, setMetas] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [fecha, setFecha] = useState([]);

    //fetch goals
    const fetchGoals = async () => {
        const metas = await fetchAllGoals();
        setMetas(metas);
    };
    const filterGoalsByDate = async (start, end) => {
        const g = await fetchGoalsByDate(start, end);
        setMetas(g);
    }
    useEffect(() => {
        if (auth.currentUser) {
            fetchGoals();
        }
        if (startDate && endDate) {
            filterGoalsByDate(startDate, endDate)
        }
    }, [user, startDate, endDate]);

    const metasCard = goals.map((meta, idx) => <div key={idx}>
        <h1>{(new Date(meta.reminder.seconds * 1000)).toLocaleDateString()} - {meta.title}</h1>

    </div>);

    //fetch categorias
    const fetchCategoria = async () => {
        const metas = await fetchAllGoals();

        setCategoria(metas);
    };
    useEffect(() => {
        if (auth.currentUser) {
            fetchCategoria();
        }
    }, [user]);



    useEffect(() => {
        if (auth.currentUser) {
        }
    }, [user]);

    const metasFecha = fecha.map((fechar, idx) => <h1 key={idx}>{fechar}</h1>);

    const fechafinal = [];

    var a = 0;


    var i = -1;

    //empieza el for
    for (i in metasCard) {
        return (
            <div>
                <Card className="cartas">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Tareas
                        </Typography>


                        {metasCard}



                    </CardContent>
                </Card>
            </div>
        );
    }
}

function Calendario() {
    const [date, setDate] = useState(new Date()); //date que sale abajo del calendario
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [user, loading, error] = useAuthState(auth);

    const [goals, setMetas] = useState([]);

    useEffect(() => {
        if (auth.currentUser) {
            // fetchGoals();
        }
    }, [user]);


    return (
        <div className="principal">
            <header className="header">
                <Header
                    title="Calendario"
                    subtitle="Organiza tu tiempo"
                    Bandera={true}
                ></Header>
                <Image
                    position={"absolute"}
                    right="0"
                    top="0"
                    className="header__image"
                    src={blob}
                />
            </header>

            <div className="calendar">
                <div className="calendar-container">
                    <Calendar onChange={(e) => {
                        setStartDate(moment(e).startOf('day').toDate());
                        setEndDate(moment(e).endOf('day').toDate());
                        setDate(e);
                    }} value={date} locale="es" />
                </div>
                <p className="text-center">
                    <span className="bold">Dia seleccionado:</span>
                    {""}
                    {date.toDateString()}
                </p>
            </div>

            <div className="tareas">
                <h1>{NuevasMetas({ startDate: startDate, endDate: endDate })}</h1>
            </div>
        </div>
    );
}

export default Calendario;
