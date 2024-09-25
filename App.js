import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SemanalIcon, DiarioIcon } from "./components/iconos";
import { ClientProvider } from "./components/clientcontext";

// Pantallas importadas
import DiarioScreen from "./screens/DiarioScreen";
import SemanalScreen from "./screens/SemanalScreen";
import DetallesDeudorScreen from "./screens/DetallesDeudoresScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DiarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Deudores" component={DiarioScreen} />
      <Stack.Screen
        name="DetallesDeudorDiario"
        component={DetallesDeudorScreen}
        options={{ title: "Detalles del Deudor" }}
        initialParams={{ tipoPago: "diario" }}
      />
    </Stack.Navigator>
  );
}

function SemanalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Deudores" component={SemanalScreen} />
      <Stack.Screen
        name="DetallesDeudorSemanal"
        component={DetallesDeudorScreen}
        options={{ title: "Detalles del Deudor" }}
        initialParams={{ tipoPago: "semanal" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ClientProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Semanales") {
                return (
                  <SemanalIcon focused={focused} color={color} size={size} />
                );
              } else if (route.name === "Diarios") {
                return (
                  <DiarioIcon focused={focused} color={color} size={size} />
                );
              }
            },
            tabBarActiveTintColor: "purple",
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="Diarios"
            component={DiarioStack}
            options={{ title: "Cobros Diarios" }}
          />
          <Tab.Screen
            name="Semanales"
            component={SemanalStack}
            options={{ title: "Cobros Semanales" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ClientProvider>
  );
}
