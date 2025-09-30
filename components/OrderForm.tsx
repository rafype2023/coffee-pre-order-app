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

interface FormErrors {
  employeeName?: string;
  employeeEmail?: string;
  pickupTime?: string;
}

const coffeeTypes = ["Espresso", "Americano", "Latte", "Cappuccino", "Mocha"];
const sizes: CoffeeSize[] = ["Pequeño", "Mediano", "Grande"];
const milkOptions: MilkOption[] = ["Ninguna", "Entera", "Avena", "Almendra"];

// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<OrderDetails>({
    employeeName: '',
    employeeEmail: '',
    coffeeType: coffeeTypes[0],
    size: 'Mediano',
    milk: 'Entera',
    pickupTime: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: keyof OrderDetails, value: string): string | undefined => {
    switch (name) {
      case 'employeeName':
        return value.trim() ? undefined : 'El nombre es obligatorio.';
      case 'employeeEmail':
        if (!value.trim()) return 'El email es obligatorio.';
        return emailRegex.test(value) ? undefined : 'Por favor, ingresa un email válido.';
      case 'pickupTime':
        return value ? undefined : 'La hora de recogida es obligatoria.';
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
        const error = validateField(name as keyof OrderDetails, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const error = validateField(name as keyof OrderDetails, value);
      setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof OrderDetails>).forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) {
            validationErrors[key as keyof FormErrors] = error;
        }
    });

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});
    onSubmit(formData);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-6 text-coffee-800 font-serif">Crea tu pedido</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Nombre del Empleado"
          name="employeeName"
          value={formData.employeeName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.employeeName}
          required
        />
        <Input
          label="Email del Empleado"
          name="employeeEmail"
          type="email"
          value={formData.employeeEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.employeeEmail}
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
          onBlur={handleBlur}
          error={errors.pickupTime}
          required
        />
        <Button type="submit" loading={isLoading} fullWidth>
          {isLoading ? 'Enviando...' : 'Enviar Pedido'}
        </Button>
      </form>
    </Card>
  );
};

export default OrderForm;