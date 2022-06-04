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
import { fetchAllGoals } from "../services/goals.service";
import { auth } from "../firebase.js";

function NuevasMetas() {
    const [user, loading, error] = useAuthState(auth);

    const [goals, setMetas] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [fecha, setFecha] = useState([]);

    //fetch goals
    const fetchGoals = async () => {
        const metas = await fetchAllGoals();
        console.log(metas);
        setMetas(metas);
    };
    useEffect(() => {
        if (auth.currentUser) {
            fetchGoals();
        }
    }, [user]);

    const metasCard = goals.map((meta, index) => <h1 key={index}>{meta.title}</h1>);

    //fetch categorias
    const fetchCategoria = async () => {
        const metas = await fetchAllGoals();
        console.log(metas);
        setCategoria(metas);
    };
    useEffect(() => {
        if (auth.currentUser) {
            fetchCategoria();
        }
    }, [user]);

    const categoryCard = categoria.map((cate) => (
        <h1 key={cate}>{cate.category}</h1>
    ));

    //fetch fecha
    const fetchFecha = async () => {
        const metas = await fetchAllGoals();
        setFecha(metas.map(meta => (new Date(meta.reminder.seconds * 1000).toLocaleDateString())));
    };
    useEffect(() => {
        if (auth.currentUser) {
            fetchFecha();
        }
    }, [user]);

    const metasFecha = fecha.map((fechar, index) => (
        <h1 key={index}>{fechar}</h1>
    ));

    console.log("sale");

    var i = -1;

    //empieza el for
    for (i in metasCard) {
        console.log("sigue");
        i++;
        return (
            <div>
                <Card className="cartas">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Tareas
                        </Typography>
                        <Typography>
                            <span className="infoytiempo">
                                {metasCard}
                                {metasFecha}
                            </span>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

function Calendario() {
    const [date, setDate] = useState(new Date()); //date que sale abajo del calendario
    const [user, loading, error] = useAuthState(auth);

    const [goals, setMetas] = useState([]);

    useEffect(() => {
        if (auth.currentUser) {
            fetchGoals();
        }
    }, [user]);
    const fetchGoals = async () => {
        const metas = await fetchAllGoals();
        // console.log(metas)
        setMetas(metas);
    };

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
                    <Calendar onChange={setDate} value={date} locale="es" />
                </div>
                <p className="text-center">
                    <span className="bold">Dia seleccionado:</span>
                    {""}
                    {date.toDateString()}
                </p>
            </div>

            <div className="tareas">
                <h1>{NuevasMetas()}</h1>
            </div>
        </div>
    );
}

export default Calendario;
