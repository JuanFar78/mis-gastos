import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TarjetaGasto from './TarjetaGasto';

export default function ListaGastos({ gastos, onEliminar }) {
  if (gastos.length === 0) {
    return <Text style={styles.vacio}>No hay gastos para mostrar.</Text>;
  }

  return (
    <View>
      {gastos.map((gasto) => (
        <TarjetaGasto key={gasto.id} gasto={gasto} onEliminar={onEliminar} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  vacio: { textAlign: 'center', color: '#777', marginVertical: 16 },
});
