import { useState } from "react";
import data from "./data"; // Importamos los datos de los tours

// Primer componente para mostrar el título y los tours destacados
function Titulo({ toursDestacados }) {
  // Si hay un tour lo muestra en singular y si hay más de 1 o 0 en plural
  return (
    <div className="title">
      <h2>nuestros tours</h2>
      <div className="underline"></div>
      <h3>
        tenemos {toursDestacados}{" "}
        {toursDestacados == 1 ? "tour destacado" : "tours destacados"}
      </h3>
    </div>
  );
}

// Segundo componente para mostrar la información de cada tour
function Tours({ tours }) {
  /* Recorremos array
    Indicamos que si el tour no tiene info no lo muestre
    Se realizan tres diferentes métodos, para probar cada una de ellas, en {destacado}, {imagen} y {precio}
        1. Precio:
            Realizamos condición if else, si el precio existe se muestra, sino se muestra un mensaje.
        2. Destacado
            Operador lógico, si destacado es true pondrá en el className 'destacado' para resaltarlo.
        3. Imágen
            Operador ternario, si existe la imagen la muestra, sino, muestra una imagen de no encontrado.
    */
  return (
    <>
      {tours.map((tour) => {
        if (!tour.info) return null;

        let precio;

        if (tour.price) {
          precio = tour.price + "€";
        } else {
          precio = "A consultar";
        }
        return (
          <article
            key={tour.id}
            className={`single-tour ${tour.destacado && "destacado"}`}
          >
            <img
              src={
                tour.image
                  ? tour.image
                  : "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
              }
              alt={tour.name}
            />
            <footer>
              <div className="tour-info">
                <h4>{tour.name}</h4>
                <h4 className="tour-price">{precio}</h4>
              </div>
              <p>{tour.info}</p>
            </footer>
          </article>
        );
      })}
    </>
  );
}

// Componente principal al que le pasamos los datos necesarios para el resto de componentes
export default function App() {
  const [tours] = useState(data);

  // Contamos los tours destacados que tenemos
  let toursDestacados = 0;

  // Recorremos los tours, verificamos cuales están destacados e incrementamos
  for (let i = 0; i < tours.length; i++) {
    if (tours[i].destacado) {
      toursDestacados++;
    }
  }

  return (
    <main>
      <section>
        <Titulo toursDestacados={toursDestacados} />
        <div>
          <Tours tours={tours} />
        </div>
      </section>
    </main>
  );
}
