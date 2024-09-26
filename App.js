import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SemanalIcon, DiarioIcon, PanelIcon } from "./components/iconos";
import { ClientProvider } from "./components/clientcontext";
import { Text, StyleSheet } from "react-native"; // Asegúrate de importar Text y StyleSheet

// Pantallas importadas
import DiarioScreen from "./screens/DiarioScreen";
import SemanalScreen from "./screens/SemanalScreen";
import DetallesDeudorScreen from "./screens/DetallesDeudoresScreen";
import PanelControlScreen from "./screens/PanelControlScreen";
import LoginScreen from "./screens/LoginScreen"; // Nueva pantalla de login

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DiarioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Deudores Diarios"
        component={DiarioScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Deudores Diarios</Text>
          ),
        }}
      />
      <Stack.Screen
        name="DetallesDeudorDiario"
        component={DetallesDeudorScreen}
        options={{
          title: "Detalles del Deudor",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            // color: "purple",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function SemanalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Deudores Semanales"
        component={SemanalScreen}
        options={{
          headerTitle: () => (
            <Text style={styles.headerTitle}>Deudores Semanales</Text>
          ),
        }}
      />
      <Stack.Screen
        name="DetallesDeudorSemanal"
        component={DetallesDeudorScreen}
        options={{
          title: "Detalles del Deudor",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            // color: "purple",
          },
        }}
        initialParams={{ tipoPago: "semanal" }}
      />
    </Stack.Navigator>
  );
}

function PanelControlStack({ isAuthenticated, setIsAuthenticated }) {
  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name="Panel de Control"
          component={PanelControlScreen}
          options={{
            headerTitle: () => (
              <Text style={styles.headerTitle}>Panel de Control</Text>
            ),
          }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          options={{
            headerTitle: () => (
              <Text style={styles.headerTitle}>Iniciar Sesión</Text>
            ),
          }}
        >
          {(props) => (
            <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <ClientProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === "Diarios") {
                return (
                  <DiarioIcon focused={focused} color={color} size={size} />
                );
              } else if (route.name === "Semanales") {
                return (
                  <SemanalIcon focused={focused} color={color} size={size} />
                );
              } else if (route.name === "PanelControlTab") {
                return (
                  <PanelIcon focused={focused} color={color} size={size} />
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
            options={{ title: "Cobros Diarios", headerShown: false }}
          />
          <Tab.Screen
            name="Semanales"
            component={SemanalStack}
            options={{ title: "Cobros Semanales", headerShown: false }}
          />
          <Tab.Screen
            name="PanelControlTab"
            options={{ title: "Panel de Control", headerShown: false }}
          >
            {() => (
              <PanelControlStack
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ClientProvider>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24, // Tamaño del texto
    fontWeight: "bold", // Negrita
    // color: "purple", // Color del texto
  },
});
