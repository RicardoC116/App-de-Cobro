import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

const MensualScreen = ({ navigation }) => {
  const [clients, setClients] = useState([
    { id: "1", name: "Juan Pérez", amount: 500 },
    { id: "2", name: "Luisa Gómez", amount: 600 },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientAmount, setNewClientAmount] = useState("");

  const addClient = () => {
    if (newClientName.trim() === "" || newClientAmount.trim() === "") {
      alert("Por favor, completa todos los campos");
      return;
    }
    const newClient = {
      id: (clients.length + 1).toString(),
      name: newClientName,
      amount: parseFloat(newClientAmount),
      paid: false,
    };
    setClients([...clients, newClient]);
    setNewClientName("");
    setNewClientAmount("");
    setModalVisible(false);
  };

  const markAsPaid = (id) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, paid: !client.paid } : client
      )
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deudores </Text>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => markAsPaid(item.id)}
            style={[
              styles.item,
              { backgroundColor: item.paid ? "lightgreen" : "white" },
            ]}
          >
            <Text
              style={{
                textDecorationLine: item.paid ? "line-through" : "none",
              }}
            >
              {item.name} - ${item.amount}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Pressable style={styles.boton} onPress={() => setModalVisible(true)}>
        <Text style={styles.texto}>Agregar Cliente</Text>
      </Pressable>
      <Button
        title="Ver Cobros Semanales"
        onPress={() => navigation.navigate("Semanal")}
      />

      {/* Modal para agregar cliente  */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Nuevo Cliente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del cliente"
              value={newClientName}
              onChangeText={setNewClientName}
            />
            <TextInput
              style={styles.input}
              placeholder="Monto adeudado"
              value={newClientAmount}
              onChangeText={setNewClientAmount}
              keyboardType="numeric"
            />
            <Button title="Agregar" onPress={addClient} />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  boton: {
    backgroundColor: "#55903B",
    padding: 7,
    marginBottom: 4,
    borderRadius: 5,
  },
  texto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default MensualScreen;
