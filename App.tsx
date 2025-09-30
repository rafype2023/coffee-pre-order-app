
import React, { useState, useCallback } from 'react';
import { OrderStage } from './types';
import type { OrderDetails } from './types';
import { createOrder, verifyOrder } from './services/apiService';

import OrderForm from './components/OrderForm';
import VerificationForm from './components/VerificationForm';
import ConfirmationScreen from './components/ConfirmationScreen';
import { CoffeeIcon } from './components/icons/CoffeeIcon';

const App: React.FC = () => {
  const [stage, setStage] = useState<OrderStage>(OrderStage.FORM);
  const [currentOrder, setCurrentOrder] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOrderSubmit = useCallback(async (orderDetails: OrderDetails) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await createOrder(orderDetails);
      if (response.success) {
        setCurrentOrder(orderDetails);
        setOrderId(response.orderId);
        setStage(OrderStage.VERIFICATION);
      } else {
        setError(response.message || 'Ocurrió un error al crear el pedido.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleVerificationSubmit = useCallback(async (code: string) => {
    if (!orderId) {
        setError("No se encontró el ID del pedido.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOrder(orderId, code);
      if (response.success) {
        setStage(OrderStage.CONFIRMED);
      } else {
        setError(response.message || 'El código de verificación es incorrecto.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  const handleStartNewOrder = useCallback(() => {
    setStage(OrderStage.FORM);
    setCurrentOrder(null);
    setOrderId(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const renderStage = () => {
    switch (stage) {
      case OrderStage.FORM:
        return <OrderForm onSubmit={handleOrderSubmit} isLoading={isLoading} />;
      case OrderStage.VERIFICATION:
        return (
          <VerificationForm
            onSubmit={handleVerificationSubmit}
            isLoading={isLoading}
            email={currentOrder?.employeeEmail || ''}
            onBack={handleStartNewOrder}
          />
        );
      case OrderStage.CONFIRMED:
        return (
          <ConfirmationScreen
            orderDetails={currentOrder!}
            onNewOrder={handleStartNewOrder}
          />
        );
      default:
        return <OrderForm onSubmit={handleOrderSubmit} isLoading={isLoading} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-coffee-100">
       <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
            <CoffeeIcon className="w-16 h-16 text-coffee-800" />
            <div>
              <h1 className="text-5xl font-serif font-bold text-coffee-900">Café R&P</h1>
              <p className="text-coffee-500 text-lg">Tu pre-pedido de café diario</p>
            </div>
          </div>
        </header>
      
      <main className="w-full max-w-md">
        {renderStage()}
        {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
      </main>

      <footer className="text-center mt-12 text-coffee-500">
        <p>&copy; {new Date().getFullYear()} Café R&P. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
