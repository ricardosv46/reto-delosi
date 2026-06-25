export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/20 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
          © {new Date().getFullYear()} Delosi Ingeniería de Software. Todos los derechos reservados.
        </p>
        <p className="text-[10px] text-muted-foreground font-medium">
          Evaluación Técnica • Frontend Senior
        </p>
      </div>
    </footer>
  );
}
