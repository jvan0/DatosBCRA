const Asd = async () => {
  try {
    const response = await fetch(
      `https://api.bcra.gob.ar//estadisticas/v2.0/DatosVariable/{1}/01-04-2024/${new Date()}`
    );
    const datos = response.JSON;
    const resp = datos.results;

    console.log(resp);
  } catch (error) {
    console.log(error);
  }
};
export default Asd;
