// DetallesDeudorScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
} from "react-native";

import { formatearMonto } from "../components/dinero";
import { useClients } from "../components/clientcontext";
import Swal from "sweetalert2";

const DetallesDeudorScreen = ({ route, navigation }) => {
  const { client, tipoPago } = route.params;
  const {
    clientsDiarios,
    setClientsDiarios,
    clientsSemanales,
    setClientsSemanales,
  } = useClients(); // Obtener el contexto
  const [pago, setPago] = useState("");

  const handlePayment = () => {
    const montoPago = parseFloat(pago);

    if (!montoPago || montoPago <= 0) {
      alert("Ingresa un monto válido.");
      return;
    }

    if (montoPago > client.balance) {
      alert("El pago no puede ser mayor que el saldo pendiente.");
      return;
    }

    const newBalance = client.balance - montoPago;
    const newPayment = {
      date: new Date().toLocaleDateString(),
      amount: montoPago,
    };

    const updatedClient = {
      ...client,
      balance: newBalance,
      payments: [...client.payments, newPayment],
    };

    // Usar la función updateClient dependiendo del tipo de pago
    if (tipoPago === "diario") {
      setClientsDiarios((prevClients) =>
        prevClients.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
    } else {
      setClientsSemanales((prevClients) =>
        prevClients.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
    }

    setPago(""); // Limpiar el campo de pago
    navigation.goBack(); // Volver a la lista de clientes
  };

  const Alertas = () => {
    if (Platform.OS === "web") {
      Swal.fire({
        title: "Alerta",
        text: "¿Estás seguro de introducir este monto?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          handlePayment();
        }
      });
    } else {
      Alert.alert(
        "Alerta",
        "¿Estás seguro de introducir este monto?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancelar"),
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: () => handlePayment(),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Detalles de {client.name}{" "}
        {client.balance === 0 && (
          <Text style={styles.PagpsaldadoText}>Deuda saldada</Text>
        )}
      </Text>
      <Text>
        Tipo de pago:{" "}
        {tipoPago === "diario" ? "Pagos Diarios" : "Pagos Semanales"}
      </Text>
      <Text>Total Deuda: {formatearMonto(client.amount)}</Text>
      <Text>Saldo Pendiente: {formatearMonto(client.balance)}</Text>

      <Text style={styles.subtitle}>Historial de Pagos</Text>

      <FlatList
        data={client.payments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.date} - ${item.amount}
          </Text>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto del Pago"
        value={pago}
        onChangeText={setPago}
        keyboardType="numeric"
      />
      <Button title="Registrar Pago" onPress={() => Alertas()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  PagpsaldadoText: {
    color: "green",
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default DetallesDeudorScreen;
