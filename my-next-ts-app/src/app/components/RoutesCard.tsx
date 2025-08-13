const RoutesCard = () => {
  return (
    <div className="card card-border-yellow">
      <h2 className="text-title text-center">Rutas Automáticas</h2>
      <p className="mb-4 text-body text-center">
        Crea los siguientes archivos para tener estas rutas funcionales:
      </p>
      <ul className="list-disc list-inside space-y-2 text-center">
        <li>
          Para la página 'About': crea un archivo en <code className="text-code">src/app/about/page.tsx</code>
        </li>
        <li>
          Para la ruta de API: crea un archivo en <code className="text-code">src/app/api/hola/route.ts</code>
        </li>
      </ul>
      <div className="flex justify-center space-x-4 mt-6">
        <a href="/about" className="button-link">
          Ir a About
        </a>
        <a href="/api/hola" target="_blank" rel="noopener noreferrer" className="button-link">
          Probar API
        </a>
      </div>
    </div>
  );
};

export default RoutesCard;
