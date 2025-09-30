
import React, { useState } from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

interface VerificationFormProps {
  onSubmit: (code: string) => void;
  isLoading: boolean;
  email: string;
  onBack: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ onSubmit, isLoading, email, onBack }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(code);
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-2 text-coffee-800 font-serif">Verifica tu Pedido</h2>
      <p className="text-center text-coffee-500 mb-6">
        Hemos enviado un código de verificación a <br/><strong>{email}</strong>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Código de Verificación"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder="Ingresa el código"
          maxLength={6}
          className="text-center tracking-[0.5em]"
        />
        <Button type="submit" disabled={isLoading} fullWidth>
          {isLoading ? 'Verificando...' : 'Confirmar Pedido'}
        </Button>
      </form>
       <button onClick={onBack} className="text-sm text-coffee-500 hover:text-coffee-800 mt-4 text-center w-full">
            &larr; Volver al formulario
        </button>
    </Card>
  );
};

export default VerificationForm;
