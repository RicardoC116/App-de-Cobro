import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import Swal from "sweetalert2";
import { useClients } from "../components/clientcontext"; // Importar el hook
import { IconosPagos } from "../components/iconos";
import { formatearMonto } from "../components/dinero";

const SemanalScreen = ({ navigation }) => {
  const { clientsSemanales } = useClients();

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
      <Text style={styles.title}>Deudores Semanales</Text>
      <FlatList
        data={clientsSemanales}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.balance === 0) {
                mostrarAlerta(); // Cambia Alert() a mostrarAlerta()
              }
              navigation.navigate("DetallesDeudorSemanal", {
                client: item,
                tipoPago: "semanal",
              });
            }}
            style={[
              styles.item,
              item.balance === 0 ? styles.itemCompleto : null,
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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  itemCompleto: {
    backgroundColor: "#B4E380",
  },
});

export default SemanalScreen;
