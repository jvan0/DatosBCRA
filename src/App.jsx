import { useEffect, useState } from "react";
import Chart from "./components/Chart";
import "./App.css";

const App = (props) => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const today = new Date();

  function startDate() {
    const year = today.getFullYear() - 1;
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month}-${day}`;
  }

  function endDate() {
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month}-${day}`;
  }

  console.log(startDate());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `https://api.bcra.gob.ar/estadisticas/v2.0/datosvariable/1/${startDate()}/${endDate()}`
        );
        const result = await resp.json();

        setDatos(result.results);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const valores =
    datos && datos.map((item) => ({ time: item.fecha, value: item.valor }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const valors1 = [
    { time: "2024-06-10", value: 2 },
    { time: "2024-06-11", value: 3 },
    { time: "2024-06-12", value: 1 },
    { time: "2024-06-13", value: 5 },
  ];

  return (
    <>
      <div className="items-center flex justify-center">
        <h1>Datos BCRA</h1>
        <div>
          <div className="flex justify-center items-center">
            <Chart {...props} data={valores} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
