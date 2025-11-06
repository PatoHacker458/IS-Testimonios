import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Controls from './Controls.jsx';

describe('Componente Controls', () => {

  it('debería renderizar los tres botones correctamente', () => {
    render(<Controls />);
    const prevButton = screen.getByRole('button', { name: /anterior/i });
    const nextButton = screen.getByRole('button', { name: /siguiente/i });
    const randomButton = screen.getByRole('button', { name: /aleatorio/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(randomButton).toBeInTheDocument();
  });

  it('debería llamar a la función onNext cuando se hace clic en "Siguiente"', async () => {
    const user = userEvent.setup();
    const mockOnNext = vi.fn();
    render(<Controls onNext={mockOnNext} />);
    const nextButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(nextButton);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('debería llamar a la función onPrev cuando se hace clic en "Anterior"', async () => {
    const user = userEvent.setup();
    const mockOnPrev = vi.fn();
    render(<Controls onPrev={mockOnPrev} />);
    const prevButton = screen.getByRole('button', { name: /anterior/i });
    await user.click(prevButton);

    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });

  it('debería llamar a la función onRandom cuando se hace clic en "Aleatorio"', async () => {
    const user = userEvent.setup();
    const mockOnRandom = vi.fn();
    render(<Controls onRandom={mockOnRandom} />);
    const randomButton = screen.getByRole('button', { name: /aleatorio/i });
    await user.click(randomButton);

    expect(mockOnRandom).toHaveBeenCalledTimes(1);
  });

});