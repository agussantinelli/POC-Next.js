'use client';

import { useState, useEffect } from 'react';
// Se corrigen las rutas de importación. El compilador de Next.js normalmente
// no requiere la extensión del archivo para los componentes en TypeScript.
import DataCard from './components/DataCard';
import ImageCard from './components/ImageCard';
import RoutesCard from './components/RoutesCard';
import Footer from './components/Footer';

// Función de reintento con retroceso exponencial para las llamadas a la API
const fetchWithRetry = async (prompt: string, options = {}, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: prompt }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Respuesta de la API inesperada o sin contenido.");
      }
    } catch (error) {
      if (i < retries - 1) {
        const delay = Math.pow(2, i) * 1000; // Retroceso exponencial: 1s, 2s, 4s
        console.log(`Fallo al obtener datos. Reintentando en ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Lanza el error si es el último intento
      }
    }
  }
};

export default function Home() {
  const [staticData, setStaticData] = useState<string | null>(null);
  const [serverData, setServerData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect para realizar las llamadas a la API en el lado del cliente.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const staticPrompt = 'Generate a date and time in the format YYYY-MM-DD HH:mm:ss, without any additional text. For example: "2024-05-22 10:30:00"';
        const staticJson = await fetchWithRetry(staticPrompt);
        setStaticData(staticJson);

        const serverPrompt = 'Generate the current date and time in the format YYYY-MM-DD HH:mm:ss, without any additional text. For example: "2024-05-22 10:30:00"';
        const serverJson = await fetchWithRetry(serverPrompt);
        setServerData(serverJson);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="main-container">
        <p className="text-2xl font-semibold">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="main-container">
      <main className="card-container">
        <h1 className="title-main">
          Next.js Prototipo Integrado
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <DataCard
            title="Renderizado Estático (SSG)"
            description="Esta sección se generó una sola vez en el build. La fecha no cambiará con cada recarga de página."
            date={staticData}
            borderColor="card-border-blue"
          />

          <DataCard
            title="Renderizado en el Servidor (SSR)"
            description="Esta sección se genera en cada petición. La fecha se actualizará al recargar la página."
            date={serverData}
            borderColor="card-border-purple"
          />
        </div>

        <ImageCard />

        <RoutesCard />
      </main>

      <Footer />
    </div>
  );
}
