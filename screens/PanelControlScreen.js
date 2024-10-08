import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ClienteIcono, DeudoresIcono } from "../components/iconos";

const PanelDeControl = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AgregarClienteScreen")}
      >
        <ClienteIcono size={25} color="#AD49E1" />
        <Text style={styles.buttonText}>Agregar Usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AgregarDeudorScreen")}
      >
        <DeudoresIcono size={25} color="#AD49E1" />
        <Text style={styles.buttonText}>Agregar Cliente</Text>
      </TouchableOpacity>

      {/* Más botones de navegación si es necesario */}
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 3, // para sombra en Android
    shadowColor: "#000", // para sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
});

export default PanelDeControl;
