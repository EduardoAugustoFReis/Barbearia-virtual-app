export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "barbeiro" | "cliente";
  avatar: string | null;
}

export interface IService {
  id: number;
  name: string;
  duration: number;
  price: number;
}

export interface IBaber {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}
export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: string;
} 
export interface IAppointment {
  id: number;
  barberId: number;
  clientId: number;
  serviceId: number;
  barber: IBaber | null;
  service: IService | null;
  client: IClient | null;
  startTime: string; 
  endTime: string;
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
  updatedAt: string;
}
export interface ISlot {
  start: string;
  end: string;
}
