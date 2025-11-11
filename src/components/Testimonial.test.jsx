import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; 

import Testimonial from './Testimonial.jsx'; 

describe('Componente Testimonial', () => {

    it('muestra correctamente los datos completos del testimonio', () => {
        const mockData = {
            nombre: 'Juan Pérez', 
            cargo: 'Desarrollador Frontend', 
            texto: 'React me ayudó a mejorar la estructura de mis proyectos.', 
            foto: 'https://i.pravatar.cc/150?img=50'
        };

        render(<Testimonial item={mockData} />);
        expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
        expect(screen.getByText('Desarrollador Frontend')).toBeInTheDocument();
        expect(screen.getByText(`"React me ayudó a mejorar la estructura de mis proyectos."`)).toBeInTheDocument(); 
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', mockData.foto);
        expect(img).toHaveAttribute('alt', mockData.nombre);
    });

});