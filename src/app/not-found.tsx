import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 space-y-6 animate-in fade-in duration-300">
      <div className="p-4 rounded-full bg-muted/30">
        <ShoppingCart className="w-12 h-12 text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">
          Recurso No Encontrado
        </h2>
        <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
          El producto o página que estás intentando buscar no existe, ha sido trasladado o no está
          disponible.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-md hover:bg-primary/95 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Catálogo
      </Link>
    </div>
  );
}
