import { useState, useContext } from 'react';
import { Container, Table, Button, Card, Image, Alert, Badge } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { 
    carrito, 
    eliminarDelCarrito, 
    vaciarCarrito, 
    agregarAlCarrito, 
    disminuirCantidad,
    totalGeneral 
  } = useContext(CartContext);

  const [showAlert, setShowAlert] = useState(false);

  const handleCheckout = () => {
    setShowAlert(true); 
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // const handleCheckout = () => {
  //   alert("¡Próximamente! En proceso de construcción.👨‍💻");
  // };

  if (carrito.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>Tu carrito está vacío 😢</h3>
        <p className="text-muted">Agrega productos!</p>
        <Link to="/products">
          <Button variant="primary">Ir a comprar</Button>
        </Link>
      </Container>
    );
  }

  return (
    <>
      {showAlert && (
        <Alert
          variant="success"
          className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
          style={{ zIndex: 9999, width: "auto" }}
        >
          ¡Próximamente! En proceso de construcción. 👨‍💻
        </Alert>
      )}

      <Container className="mt-5 mb-5">
        <h2 className="mb-4">Carrito de Compras 🛒 </h2>
        
        <div className="row">
          <div className="col-lg-8">
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="d-none d-md-table-cell">Precio</th>
                    <th className="text-center">Cant.</th>
                    <th className="d-none d-md-table-cell">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((prod) => (
                    <tr key={prod.id}>
                      <td>
                        <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                          <Image 
                            src={prod.imagen} 
                            alt={prod.nombre} 
                            rounded 
                            className="mb-2 mb-md-0 me-md-3"
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = "https://placehold.co/60?text=?"; }}
                          />
                          <div>
                            <span className="fw-bold d-block">{prod.nombre}</span>
                            <small className="text-muted d-none d-md-block">Stock: {prod.stock}</small>
                            <div className="d-md-none text-success fw-bold mt-1">
                                ${Number(prod.precio).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="d-none d-md-table-cell">${Number(prod.precio).toFixed(2)}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={() => disminuirCantidad(prod.id)}
                            style={{padding: '0.25rem 0.5rem'}}
                          >
                            -
                          </Button>
                          <span className="fw-bold">{prod.cantidad}</span>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            disabled={prod.cantidad >= prod.stock} 
                            onClick={() => agregarAlCarrito(prod)}
                            style={{padding: '0.25rem 0.5rem'}}
                          >
                            +
                          </Button>
                        </div>
                        {prod.cantidad >= prod.stock && (
                            <div className="text-danger text-center" style={{ fontSize: '0.6rem', marginTop: '2px' }}>
                                Max
                            </div>
                        )}
                      </td>
                      <td className="fw-bold d-none d-md-table-cell">
                        ${(Number(prod.precio) * prod.cantidad).toFixed(2)}
                      </td>
                      
                      <td>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => eliminarDelCarrito(prod.id)}
                        >
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            
            <Button variant="outline-danger" size="sm" onClick={vaciarCarrito} className="mb-3">
              Vaciar Carrito
            </Button>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
             <Card className="shadow-sm border-0 bg-light">
                <Card.Body>
                  <Card.Title className="mb-4">Resumen</Card.Title>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal</span>
                    <span>${totalGeneral.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Envío</span>
                    <span className="text-success">Gratis</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4 fs-5 fw-bold">
                    <span>Total</span>
                    <span>${totalGeneral.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    variant="success" 
                    size="lg" 
                    className="w-100 mb-2" 
                    onClick={handleCheckout}
                  >
                    Continuar Compra
                  </Button>
                  <Link to="/products">
                    <Button variant="outline-secondary" className="w-100">
                      Seguir mirando
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
          </div>

        </div>
      </Container>
    </>
  );
};

export default Cart;