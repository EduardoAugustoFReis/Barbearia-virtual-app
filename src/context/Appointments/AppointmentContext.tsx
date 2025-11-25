import { IAppointment } from "@/src/types";
import { createContext } from "react";

type CreateAppointmentDTO = {
  barberId: number;
  serviceId: number;
  startTime: string;
};


type AppointmentContextProps = {
  clientAppointments: IAppointment[];
  setClientAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;

  barberAppointments: IAppointment[];
  setBarberAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;

  addAppointment: (appointment: IAppointment) => void;
  removeAppointment: (id: number, role: "client" | "barber") => void;
  createAppointment: (data: CreateAppointmentDTO) => Promise<IAppointment | undefined>;
};

export const AppointmentContext = createContext<
  AppointmentContextProps | undefined
>(undefined);
