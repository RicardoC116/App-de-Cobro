import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PanelDeControl = () => {
  console.log("Panel de Control renderizado"); // Para depuración
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola que hace</Text>
      {/* Aquí agregarás el contenido del panel, como la lista de deudores */}
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
});

export default PanelDeControl;
