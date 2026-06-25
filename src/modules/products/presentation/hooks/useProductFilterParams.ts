import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useProductFilterParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
    },
    [pathname, searchParams]
  );

  const setSearch = useCallback(
    (val: string) => {
      updateUrl({ search: val });
    },
    [updateUrl]
  );

  const setCategory = useCallback(
    (val: string) => {
      updateUrl({ category: val });
    },
    [updateUrl]
  );

  const setSortBy = useCallback(
    (val: string) => {
      updateUrl({ sortBy: val });
    },
    [updateUrl]
  );

  return {
    search,
    category,
    sortBy,
    setSearch,
    setCategory,
    setSortBy,
  };
}
