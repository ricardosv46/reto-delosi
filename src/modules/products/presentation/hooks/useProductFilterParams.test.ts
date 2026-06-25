import { renderHook, act } from '@testing-library/react';
import { useProductFilterParams } from './useProductFilterParams';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams('category=electronics&search=watch'),
}));

describe('useProductFilterParams', () => {
  let replaceStateSpy: jest.SpyInstance;

  beforeEach(() => {
    replaceStateSpy = jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    replaceStateSpy.mockRestore();
  });

  it('should read search, category and sortBy from the URL', () => {
    const { result } = renderHook(() => useProductFilterParams());

    expect(result.current.search).toBe('watch');
    expect(result.current.category).toBe('electronics');
    expect(result.current.sortBy).toBe('');
  });

  it('should update the URL via the History API (shallow routing) when setCategory is called', () => {
    const { result } = renderHook(() => useProductFilterParams());

    act(() => {
      result.current.setCategory('accessories');
    });

    expect(replaceStateSpy).toHaveBeenCalledWith(
      null,
      '',
      expect.stringContaining('category=accessories')
    );
  });

  it('should remove the param from the URL when value is empty', () => {
    const { result } = renderHook(() => useProductFilterParams());

    act(() => {
      result.current.setCategory('');
    });

    const calledUrl = replaceStateSpy.mock.calls[0][2] as string;
    expect(calledUrl).not.toContain('category=');
  });
});
