import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './styles.css';

const variants = {
  enter: (direction) => ({
    x: direction === 'next' ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === 'next' ? -100 : 100,
    opacity: 0,
  }),
};

export default function App() {
  const [index, setIndex] = useState(0);
  const length = testimonios.length;
  const [direction, setDirection] = useState('next');
  const autoplayRef = useRef(null);

  const next = () => {
    setIndex(prev => (prev + 1) % length);
  };

  const prev = () => {
    setIndex(prev => (prev - 1 + length) % length);
  };

  const random = () => {
    let r = Math.floor(Math.random() * length);
    if (r === index) {
      r = (r + 1) % length;
    }
    setIndex(r);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setDirection('next');
      next();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [length, index]);

  const handleUserAction = (actionFn) => {
    setDirection(dir);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    actionFn();
    autoplayRef.current = setInterval(() => {
      next();
    }, 5000);

    autoplayRef.current = setInterval(() => {
      setDirection('next');
      next();
    }, 5000);
  };

  return (
    <main className="app">
      <h1>Testimonios</h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="card-wrapper"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Testimonial item={testimonios[index]} />
        </motion.div>
      </AnimatePresence>

      <Controls
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />

      <p className="counter"> {index + 1} / {length} </p>
    </main>
  );
}