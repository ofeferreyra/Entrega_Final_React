import { useState, useEffect, useContext } from "react";
import { Button, Alert, Badge } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const API_URL = "https://69403477993d68afba6b5574.mockapi.io/products";

function RandomCart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  
  const { agregarAlCarrito } = useContext(CartContext);

  const [page, setPage] = useState(0);
  const productsPerPage = 8;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando productos...</div>;

  const start = page * productsPerPage;
  const visibleProducts = products.slice(start, start + productsPerPage);

  const handleAddToCart = (product) => {
    agregarAlCarrito(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleNext = () => {
    if ((page + 1) * productsPerPage < products.length) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "20px" }}>
      
      {showAlert && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{ zIndex: 9999, width: "auto" }}
        >
          ¡Producto agregado al carrito! ✅ 
        </Alert>
      )}

      <h2 className="text-center mb-4">Catálogo de Productos</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="card shadow-sm"
            style={{ width: "250px", padding: "10px" }}
          >
            <div style={{ height: "200px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                src={product.imagen}
                alt={product.nombre}
                onError={(e) => { e.target.src = "https://placehold.co/200x200?text=No+Image"; }} 
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
            </div>
            
            <div className="card-body">
                <h5 className="card-title">{product.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                    ${Number(product.precio).toFixed(2)}
                </h6>
                <p className="card-text">Stock: {product.stock}</p>
                
                <Button 
                    variant="primary" 
                    className="w-100"
                    onClick={() => handleAddToCart(product)}
                >
                    Agregar carrito 🛒
                </Button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <Button
          variant="secondary"
          onClick={handlePrev}
          disabled={page === 0}
          style={{ marginRight: "10px" }}
        >
         Anterior
        </Button>
        <span className="mx-2">Página {page + 1}</span>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={(page + 1) * productsPerPage >= products.length}
        >
          Siguiente 
        </Button>
      </div>
    </div>
  );
}

export default RandomCart;