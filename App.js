import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Pantallas importadas
import MensualScreen from "./screens/MensualScreen";
import SemanalScreen from "./screens/SemanalScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mensual">
        <Stack.Screen
          name="Mensual"
          component={MensualScreen}
          options={{ title: "Cobros Mensuales" }}
        />
        <Stack.Screen
          name="Semanal"
          component={SemanalScreen}
          options={{ title: "Cobros Semanales" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
