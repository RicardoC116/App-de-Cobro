import React, { createContext, useContext, useState } from "react";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clientsDiarios, setClientsDiarios] = useState([
    { id: "1", name: "Juan Pérez", amount: 500, balance: 500, payments: [] },
    { id: "2", name: "Luisa Gómez", amount: 600, balance: 0, payments: [] },
    { id: "3", name: "Pedro Díaz", amount: 1000, balance: 1000, payments: [] },
    { id: "4", name: "Pedro Díaz", amount: 1500, balance: 1500, payments: [] },
  ]);

  const [clientsSemanales, setClientsSemanales] = useState([
    { id: "1", name: "Carlos López", amount: 300, balance: 300, payments: [] },
    { id: "2", name: "Ana Torres", amount: 400, balance: 400, payments: [] },
  ]);

  // Función para agregar un nuevo cliente
  const addClient = (tipo, newClient) => {
    if (tipo === "diario") {
      setClientsDiarios((prevClients) => [...prevClients, newClient]);
    } else if (tipo === "semanal") {
      setClientsSemanales((prevClients) => [...prevClients, newClient]);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        clientsDiarios,
        setClientsDiarios,
        clientsSemanales,
        setClientsSemanales,
        addClient, 
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => useContext(ClientContext);
