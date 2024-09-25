// DiarioScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useClients } from "../components/clientcontext";
import { IconosPagos } from "../components/iconos";
import { Alert } from "react-native";
import { formatearMonto } from "../components/dinero";

const DiarioScreen = ({ navigation }) => {
  const { clientsDiarios } = useClients();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deudores Diarios</Text>
      <FlatList
        data={clientsDiarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.balance === 0) {
                Alert.alert("Alerta", "El cliente dio todos sus pagos");
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
