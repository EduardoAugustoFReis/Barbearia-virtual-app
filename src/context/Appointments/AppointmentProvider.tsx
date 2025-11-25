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
  const [clientAppointments, setClientAppointments] = useState<IAppointment[]>(
    []
  );
  const [barberAppointments, setBarberAppointments] = useState<IAppointment[]>(
    []
  );

  const fetchClientAppointments = async () => {
    try {
      const response = await api.get<IAppointment[]>(`/appointments/client`);
      setClientAppointments(response.data);
    } catch (error) {
      console.log("Erro ao buscar compromissos do cliente", error);
    }
  };

  const fetchBarberAppointments = async () => {
    try {
      const response = await api.get<IAppointment[]>(`/appointments/barbers`);
      setBarberAppointments(response.data);
    } catch (error) {
      console.log("Erro ao buscar compromissos do barbeiro", error);
    }
  };

  const createAppointment = async ({
    barberId,
    serviceId,
    startTime,
  }: CreateAppointmentDTO) => {
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

  const addAppointment = (appointment: IAppointment) => {
    setClientAppointments((prev) => [...prev, appointment]);
  };

  const removeAppointment = (id: number, role: "client" | "barber") => {
    if (role === "client") {
      setClientAppointments((prev) => prev.filter((a) => a.id !== id));
    } else {
      setBarberAppointments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  useEffect(() => {
    fetchClientAppointments();
    fetchBarberAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        clientAppointments,
        setClientAppointments,

        barberAppointments,
        setBarberAppointments,

        addAppointment,
        removeAppointment,
        createAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
