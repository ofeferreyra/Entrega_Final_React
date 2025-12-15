import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

function productForm({ onSubmit, productToEdit, onCancel }) {
  const [nombre, setname] = useState('');
  const [precio, setprice] = useState('');
  const [errors, seterrors] = useState([]);

  useEffect(() => {
    if (productToEdit) 
        {
      setname(productToEdit.nombre);
      setprice(productToEdit.precio.toString());
      seterrors([]);
    } 
    else 
        {
      setname('');
      setprice('');
      seterrors([]);
    }
  }, [productoToEdit]);


    const validar = () => {
    const errorsValidacion = [];
    if (!nombre.trim()) {
      errorsValidacion.push('El nombre no puede estar vacío.');
    }
    if (precio === '' || isNaN(precio) || Number(precio) <= 0) {
      errorsValidacion.push('El precio debe ser un número mayor a 0.');
    }
    seterrors(errorsValidacion);
    return errorsValidacion.length === 0;
  };


    const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const product = {
      nombre: nombre.trim(),
      precio: Number(precio),
    };

    if (productToEdit) {
      product.id = productToEdit.id; 
    }

    onSubmit(product);

    if (!productToEdit) {
      setname('');
      setprice('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group as={Row} className="mb-3" controlId="nombre">
        <Form.Label column sm={2}>nombre</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="text"
            placeholder="nombre del producto"
            value={nombre}
            onChange={(e) => setname(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="precio">
        <Form.Label column sm={2}>precio</Form.Label>
        <Col sm={10}>
          <Form.Control
            type="number"
            placeholder="precio"
            value={precio}
            onChange={(e) => setprice(e.target.value)}
            min="0"
            step="0.01"
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit" className="me-2">
        {productToEdit ? 'Actualizar' : 'Agregar'}
      </Button>

      {productToEdit && (
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </Form>
  );
}

export default productForm;