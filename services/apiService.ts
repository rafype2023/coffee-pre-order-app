
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

export const createOrder = async (orderDetails: OrderDetails): Promise<CreateOrderResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderDetails),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'No se pudo crear el pedido. Revisa los detalles e inténtalo de nuevo.' }));
    throw new Error(errorData.message || 'Error del servidor.');
  }

  return response.json();
};

export const verifyOrder = async (orderId: string, code: string): Promise<VerifyOrderResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/orders/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, code }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Código de verificación inválido o expirado.' }));
        throw new Error(errorData.message || 'Error del servidor al verificar.');
      }

      return response.json();
}
