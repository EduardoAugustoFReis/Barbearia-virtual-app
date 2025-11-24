import { IAppointment } from "@/src/types";
import { createContext } from "react";

type CreateAppointmentDTO = {
  barberId: number;
  serviceId: number;
  startTime: string;
};

type AppointmentContextProps = {
  appointments: IAppointment[];
  setAppointments: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  fetchAppointments: () => Promise<void>;
  removeAppointment: (id: number) => void;
  addAppointment: (appointment: IAppointment) => void;
  createAppointment: (data: CreateAppointmentDTO) => Promise<IAppointment>;
};

export const AppointmentContext = createContext<
  AppointmentContextProps | undefined
>(undefined);
