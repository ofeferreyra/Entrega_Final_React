import React from "react";

import {Container} from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='bg-dark text-white text-center py-3 mt-5'>
            <Container className='text-center' fluid>
                <p className='mb-0'>2025 Talento Tech. Entrega Final. Todos los derechos reservados.</p>
            </Container>
        </footer>
    );
};

export default Footer;