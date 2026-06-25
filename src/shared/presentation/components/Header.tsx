import Link from 'next/link';
import { CartButton } from '@/modules/cart/presentation/components/CartButton';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black font-display tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            DELOSI
          </span>
          <span className="text-[10px] font-bold bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded uppercase tracking-wider">
            Store
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
