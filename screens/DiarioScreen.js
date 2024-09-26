import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform, // Asegúrate de importar Platform
} from "react-native";
import Swal from "sweetalert2"; // Asegúrate de importar Swal
import { useClients } from "../components/clientcontext";
import { IconosPagos } from "../components/iconos";
import { formatearMonto } from "../components/dinero";

const DiarioScreen = ({ navigation }) => {
  const { clientsDiarios } = useClients();

  const mostrarAlerta = () => {
    // Renombrar la función
    if (Platform.OS === "web") {
      Swal.fire({
        text: "El cliente dio todos sus pagos",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    } else {
      Alert.alert("Alerta", "El cliente dio todos sus pagos");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Deudores Diarios</Text> */}
      <FlatList
        data={clientsDiarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.balance === 0) {
                mostrarAlerta(); // Cambia Alert() a mostrarAlerta()
              }

              navigation.navigate("DetallesDeudorDiario", {
                client: item,
                tipoPago: "diario",
              });
            }}
            style={[
              styles.item,
              item.balance === 0 ? styles.itemCompleto : null,
              // item.balance >= 1000 ? styles.itemSuperior : null,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {IconosPagos(item.balance)}
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                {item.name} - {formatearMonto(item.balance)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  itemCompleto: {
    backgroundColor: "#B4E380",
  },
  itemSuperior: {
    backgroundColor: "#FFEB55",
  },
});

export default DiarioScreen;
