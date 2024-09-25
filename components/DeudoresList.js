import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const DeudoresList = ({ data, navigation, tipoPago }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(`DetallesDeudor${tipoPago}`, {
              client: item,
              tipoPago,
            })
          }
          style={[
            styles.item,
            { backgroundColor: item.balance === 0 ? "lightgreen" : "white" },
          ]}
        >
          <Text
            style={{
              textDecorationLine: item.balance === 0 ? "line-through" : "none",
            }}
          >
            {item.name} - ${item.balance}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});

export default DeudoresList;
