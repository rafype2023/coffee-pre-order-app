import { API_BASE_URL } from '../constants';
import type { OrderDetails } from '../types';

interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  message: string;
}

interface VerifyOrderResponse {
    success: boolean;
    message: string;
    orderStatus?: 'Confirmed' | 'Failed';
}

/**
 * A reusable fetch wrapper to handle API requests and errors gracefully.
 * @param url The URL to fetch.
 * @param options The request options.
 * @returns The JSON response from the API.
 */
const handleFetch = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Try to parse a JSON error from the server, with a fallback.
      const errorData = await response.json().catch(() => ({ 
        message: `Error del servidor (código ${response.status}). Por favor, inténtalo de nuevo más tarde.` 
      }));
      throw new Error(errorData.message || 'Ocurrió un error inesperado en la respuesta del servidor.');
    }

    return response.json();
  } catch (error) {
    // This block catches network errors (e.g., "Load failed", CORS issues) and errors thrown above.
    if (error instanceof TypeError) { // "Failed to fetch" is a TypeError
        throw new Error(`No se pudo conectar con el servidor. Esto puede ser un problema de CORS o la API no está disponible en ${API_BASE_URL}.`);
    }
    
    // Re-throw custom errors from the !response.ok block.
    if (error instanceof Error) {
        throw error;
    }
    
    // Fallback for any other unexpected errors.
    throw new Error('Ha ocurrido un error de red desconocido.');
  }
};


export const createOrder = async (orderDetails: OrderDetails): Promise<CreateOrderResponse> => {
    return handleFetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
    });
};

export const verifyOrder = async (orderId: string, code: string): Promise<VerifyOrderResponse> => {
    return handleFetch(`${API_BASE_URL}/api/orders/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, code }),
    });
}