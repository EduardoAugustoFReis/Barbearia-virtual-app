import { ReactNode, useEffect, useState } from "react";
import { AppointmentContext } from "./AppointmentContext";
import { IAppointment } from "@/src/types";
import { api } from "@/src/services/api";

type AppointmentProviderProps = {
  children: ReactNode;
};

type CreateAppointmentDTO = {
  barberId: number;
  serviceId: number;
  startTime: string;
};

export default function AppointmentProvider({
  children,
}: AppointmentProviderProps) {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const fetchAppointments = async () => {
    try {
      const response = await api.get<IAppointment[]>(`/appointments/client`);

      setAppointments(response.data);
    } catch (error) {
      console.log("Erro ao buscar compromissos", error);
    }
  };

  const removeAppointment = (id: number) => {
    setAppointments((prev) => prev.filter((appoint) => appoint.id !== id));
  };

  const addAppointment = (appointment: IAppointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const createAppointment = async ({ barberId, serviceId, startTime }: CreateAppointmentDTO) => {
    try {
      const response = await api.post(
        `/appointments/barbers/${barberId}/services/${serviceId}`,
        { startTime }
      );
      return response.data.appointment;
    } catch (error) {
      console.log("Erro ao agendar horário", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        fetchAppointments,
        removeAppointment,
        addAppointment,
        createAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
