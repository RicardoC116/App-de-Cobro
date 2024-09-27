import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useClients } from "../components/clientcontext";

const AgregarDeudor = () => {
  const { addClient } = useClients();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [tipo, setTipo] = useState("diario");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Diario", value: "diario" },
    { label: "Semanal", value: "semanal" },
  ]);

  const handleAddClient = () => {
    if (name && amount) {
      const newClient = {
        id: Date.now().toString(),
        name,
        amount: parseFloat(amount),
        balance: parseFloat(amount),
        payments: [],
      };

      addClient(tipo, newClient);

      setName("");
      setAmount("");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre del Deudor"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <DropDownPicker
        open={open}
        value={tipo}
        items={items}
        setOpen={setOpen}
        setValue={setTipo}
        setItems={setItems}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContent}
        labelStyle={styles.dropdownLabel}
        listItemLabelStyle={styles.dropdownItemLabel}
        arrowIconStyle={styles.dropdownArrow}
      />

      <Button title="Agregar Deudor" onPress={handleAddClient} color={'#AD49E1'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
    borderColor: "#ccc",
    // borderWidth: 1,
    zIndex: 2,
  },
  dropdown: {
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
  },
  dropdownContent: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
  },
  dropdownLabel: {
    color: "#000",
    fontSize: 16,
  },
  dropdownItemLabel: {
    color: "#000",
  },
  dropdownArrow: {
    tintColor: "#8967B3", // Color del icono de la flecha
  },
});

export default AgregarDeudor;
