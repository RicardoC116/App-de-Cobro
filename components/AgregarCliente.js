import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const AgregarClienteScreen = () => {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = () => {
    if (nombre && contraseña) {
      // Lógica para agregar cliente
      alert("Cliente agregado.");
      setNombre("");
      setContraseña("");
    } else {
      alert("Por favor, ingresa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
      />
      <TextInput
        style={styles.input}
        value={contraseña}
        onChangeText={setContraseña}
        placeholder="Contraseña"
        secureTextEntry
      />
      <Button title="Agregar Cliente" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default AgregarClienteScreen;
