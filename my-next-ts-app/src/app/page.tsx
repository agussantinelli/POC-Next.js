'use client'; // Esto indica que el componente usa características del lado del cliente.

import { useState } from 'react';
import styles from './page.module.css';

// El componente principal de la aplicación.
export default function Home() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles.container}>
      <main className={styles.card}>
        <h1 className={styles.title}>Contador Next.js + TypeScript</h1>
        
        <div className={styles.pocLogo}>
          POC
        </div>
        
        <p className={styles.counterDisplay}>{count}</p>
        
        <div className={styles.buttonGroup}>
          <button
            onClick={handleIncrement}
            className={`${styles.button} ${styles.buttonIncrement}`}
          >
            Incrementar
          </button>
          <button
            onClick={handleDecrement}
            className={`${styles.button} ${styles.buttonDecrement}`}
          >
            Decrementar
          </button>
        </div>

        <p className={styles.description}>
          Este es un prototipo simple para demostrar la funcionalidad básica de un componente de React en Next.js.
        </p>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Visita la documentación oficial de Next.js para más información.
        </p>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.footerLink}
        >
          Documentación de Next.js
        </a>
      </footer>
    </div>
  );
}
