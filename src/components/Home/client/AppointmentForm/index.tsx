import { theme } from "@/src/Theme";
import { IBaber, IService, ISlot } from "@/src/types";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { api } from "@/src/services/api";
import useAppointment from "@/src/context/Appointments/useAppointment";
import { Picker } from "@react-native-picker/picker";

const AppointmentForm = () => {
  const { createAppointment, addAppointment } = useAppointment();

  const [barbers, setBarbers] = useState<IBaber[]>([]);
  const [services, setServices] = useState<IService[]>([]);
  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);

  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [barberId, setBarberId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleButtonDate = (_event: any, selectedDate?: Date) => {
    setOpenDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  useEffect(() => {
    const fetchBarbersAndServices = async () => {
      try {
        const resBarbers = await api.get("/users/barbers");
        setBarbers(resBarbers.data);

        const resServices = await api.get("/services");
        setServices(resServices.data);
      } catch (error) {
        console.log("Erro ao buscar serviços e barbeiros", error);
      }
    };
    fetchBarbersAndServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!date || !barberId || !serviceId) return;

      try {
        const response = await api.get(
          `appointments/barbers/${barberId}/available`,
          { params: { date, serviceId } }
        );

        setAvailableSlots(response.data.availableSlots);
      } catch (error) {
        console.log("Erro ao buscar slots dos compromissos", error);
      }
    };

    fetchSlots();
  }, [barberId, date, serviceId]);

  const handleSubmit = async () => {
    if (!barberId || !serviceId || !startTime) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const dateFormat = new Date(startTime).toISOString();

      const appointment = await createAppointment({
        barberId: Number(barberId),
        serviceId: Number(serviceId),
        startTime: dateFormat,
      });

      addAppointment(appointment);

      if (appointment) addAppointment(appointment);

      alert("Agendamento marcado");
    } catch (error) {
      console.log("Erro ao cadastrar horário", error);
    }
  };

  return (
    <View style={styles.appointmentFormContainer}>
      <Pressable
        style={styles.buttonDate}
        onPress={() => setOpenDatePicker(true)}
      >
        <Text style={styles.buttonDateText}>Selecione a data</Text>
      </Pressable>

      {openDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleButtonDate}
        />
      )}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={barberId}
          onValueChange={(value) => setBarberId(value)}
          style={styles.picker}
          dropdownIconColor={theme.colors.grey}
        >
          <Picker.Item label="Selecione o barbeiro" value="" />
          {barbers.map((barber) => {
            return (
              <Picker.Item
                key={barber.id}
                label={`${barber.name}`}
                value={`${barber.id}`}
              />
            );
          })}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={serviceId}
          onValueChange={(value) => setServiceId(value)}
          style={styles.picker}
          dropdownIconColor={theme.colors.grey}
        >
          <Picker.Item label="Selecione o serviço" value="" />
          {services.map((service) => {
            return (
              <Picker.Item
                key={service.id}
                label={`${service.name}`}
                value={`${service.id}`}
              />
            );
          })}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={startTime}
          onValueChange={(value) => setStartTime(value)}
          style={styles.picker}
          dropdownIconColor={theme.colors.grey}
        >
          <Picker.Item label="Selecione o horário" value="" />
          {availableSlots.map((slot, index) => {
            const hourStart = new Date(slot.start).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });

            const hourEnd = new Date(slot.end).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <Picker.Item
                key={index}
                label={`${hourStart}-${hourEnd}`}
                value={slot.start}
              />
            );
          })}
        </Picker>
      </View>

      <Pressable style={styles.buttonFormSubmit} onPress={handleSubmit}>
        <Text style={styles.buttonFormSubmitText}>Agendar</Text>
      </Pressable>
    </View>
  );
};

export default AppointmentForm;

const styles = StyleSheet.create({
  appointmentFormContainer: {
    maxWidth: "90%",
    width: 350,
    marginVertical: 10,
    padding: 18,
    borderRadius: 8,
    gap: 10,
    backgroundColor: theme.colors.backgroundColorForm,
  },
  buttonDate: {
    backgroundColor: theme.colors.red,
    padding: 12,
    borderRadius: 8,
  },
  buttonDateText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonFormSubmit: {
    backgroundColor: theme.colors.green,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonFormSubmitText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 10,
  },
  picker: {
    color: theme.colors.grey,
    backgroundColor: theme.colors.backgroundColorForm,
  },
});
