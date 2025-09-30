
export enum OrderStage {
  FORM,
  VERIFICATION,
  CONFIRMED,
}

export type CoffeeSize = 'Pequeño' | 'Mediano' | 'Grande';
export type MilkOption = 'Ninguna' | 'Entera' | 'Avena' | 'Almendra';

export interface OrderDetails {
  employeeName: string;
  employeeEmail: string;
  coffeeType: string;
  size: CoffeeSize;
  milk: MilkOption;
  pickupTime: string;
}

export interface Order extends OrderDetails {
  id: string;
  status: 'Pending' | 'Confirmed' | 'Ready' | 'Completed';
}
