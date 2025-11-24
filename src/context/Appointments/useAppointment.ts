import { useContext } from "react";
import { AppointmentContext } from "./AppointmentContext";

export default function useAppointment() {
  const ctx = useContext(AppointmentContext);

  if (!ctx) {
    throw new Error("useAppointment deve estar dentro do AppointmentProvider");
  }

  return ctx;
}
