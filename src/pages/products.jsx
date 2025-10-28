import { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";

function RandomCart() {
  const [carts, setCarts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [page, setPage] = useState(0);
  const cartsPerPage = 3;

  useEffect(() => {
    fetch("https://dummyjson.com/carts")
      .then((res) => res.json())
      .then((data) => setCarts(data.carts))
      .catch((err) => console.error(err));
  }, []);

  if (carts.length === 0) return <div>Loading...</div>;

  const start = page * cartsPerPage;
  const visibleCarts = carts.slice(start, start + cartsPerPage);

  const handleAddToCart = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleNext = () => {
    if ((page + 1) * cartsPerPage < carts.length) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {showAlert && (
        <Alert
          variant="warning"
          className="text-center mx-auto"
          style={{ width: "60%" }}
        >
          🚧 ¡¡¡Esta función aún está en desarrollo!!! 🚧
        </Alert>
      )}

      <h2 style={{ textAlign: "center", margin: "1rem" }}>Productos:</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {visibleCarts.map((cart) =>
          cart.products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                width: "200px",
                textAlign: "center",
              }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", borderRadius: "6px" }}
              />
              <h3>{product.title}</h3>
              <p>Disponibles: {product.quantity} Unidades</p>
              <Button variant="primary" onClick={handleAddToCart}>
                Agregar carrito 🛒
              </Button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button
          variant="primary"
          onClick={handlePrev}
          disabled={page === 0}
          style={{ marginRight: "10px" }}
        >
         Anterior
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={(page + 1) * cartsPerPage >= carts.length}
        >
          Siguiente 
        </Button>
      </div>
    </div>
  );
}

export default RandomCart;
