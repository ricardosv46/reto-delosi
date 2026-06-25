import { cache } from 'react';
import { ProductRepository } from '../../domain/ports/ProductRepository.interface';
import { Product } from '../../domain/models/Product.model';
import { apiClient } from '@/shared/infrastructure/api/apiClient';
import { ProductResponseDto } from '../dtos/ProductResponse.dto';

export class ApiProductRepository implements ProductRepository {
  getProducts = cache(async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<ProductResponseDto[]>('/products');
      return response.data;
    } catch (error) {
      console.error('Error in ApiProductRepository.getProducts:', error);
      throw new Error('No se pudieron cargar los productos desde FakeStoreAPI.');
    }
  });

  getProductById = cache(async (id: number): Promise<Product | null> => {
    try {
      const response = await apiClient.get<ProductResponseDto>(`/products/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Error in ApiProductRepository.getProductById(${id}):`, error);
      throw new Error(`No se pudo cargar el producto ${id} desde FakeStoreAPI.`);
    }
  });

  getCategories = cache(async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error in ApiProductRepository.getCategories:', error);
      throw new Error('No se pudieron cargar las categorías desde FakeStoreAPI.');
    }
  });
}
