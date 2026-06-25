'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('E-commerce error details:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 space-y-6 animate-in fade-in duration-300">
      <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
        <AlertCircle className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
          Error en la Tienda
        </h2>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Ha ocurrido un error al cargar la información de FakeStoreAPI o procesar la UI. Por favor,
          reintenta la operación.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-md hover:bg-primary/95 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 active:scale-95"
      >
        <RefreshCcw className="w-4 h-4" />
        Reintentar Carga
      </button>
    </div>
  );
}
