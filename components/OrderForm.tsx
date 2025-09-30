
import React, { useState } from 'react';
import type { OrderDetails, CoffeeSize, MilkOption } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';

interface OrderFormProps {
  onSubmit: (orderDetails: OrderDetails) => void;
  isLoading: boolean;
}

const coffeeTypes = ["Espresso", "Americano", "Latte", "Cappuccino", "Mocha"];
const sizes: CoffeeSize[] = ["Pequeño", "Mediano", "Grande"];
const milkOptions: MilkOption[] = ["Ninguna", "Entera", "Avena", "Almendra"];

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<OrderDetails>({
    employeeName: '',
    employeeEmail: '',
    coffeeType: coffeeTypes[0],
    size: 'Mediano',
    milk: 'Entera',
    pickupTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-6 text-coffee-800 font-serif">Crea tu pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nombre del Empleado"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          required
        />
        <Input
          label="Email del Empleado"
          name="employeeEmail"
          type="email"
          value={formData.employeeEmail}
          onChange={handleChange}
          required
        />
        <Select
          label="Tipo de Café"
          name="coffeeType"
          value={formData.coffeeType}
          onChange={handleChange}
        >
          {coffeeTypes.map(type => <option key={type} value={type}>{type}</option>)}
        </Select>
        <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tamaño"
              name="size"
              value={formData.size}
              onChange={handleChange}
            >
              {sizes.map(size => <option key={size} value={size}>{size}</option>)}
            </Select>
            <Select
              label="Leche"
              name="milk"
              value={formData.milk}
              onChange={handleChange}
            >
              {milkOptions.map(milk => <option key={milk} value={milk}>{milk}</option>)}
            </Select>
        </div>
        <Input
          label="Hora de Recogida"
          name="pickupTime"
          type="time"
          value={formData.pickupTime}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Enviando...' : 'Enviar Pedido'}
        </Button>
      </form>
    </Card>
  );
};

export default OrderForm;
