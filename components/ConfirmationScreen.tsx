import React from 'react';
import type { OrderDetails } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ConfirmationScreenProps {
  orderDetails: OrderDetails;
  onNewOrder: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ orderDetails, onNewOrder }) => {
  return (
    <Card className="animate-fade-in-up">
      <div className="text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-coffee-800 font-serif">¡Pedido Confirmado!</h2>
        <p className="text-coffee-500 mb-6">Gracias, {orderDetails.employeeName}. Tu café estará listo para ti.</p>
        
        <div className="text-left bg-coffee-100 p-4 rounded-lg border border-coffee-300 space-y-2">
            <p><strong>Café:</strong> {orderDetails.coffeeType}</p>
            <p><strong>Tamaño:</strong> {orderDetails.size}</p>
            <p><strong>Leche:</strong> {orderDetails.milk}</p>
            <p><strong>Hora de Recogida:</strong> {orderDetails.pickupTime}</p>
        </div>

        <Button onClick={onNewOrder} className="mt-8" fullWidth>
          Hacer un Nuevo Pedido
        </Button>
      </div>
    </Card>
  );
};

export default ConfirmationScreen;