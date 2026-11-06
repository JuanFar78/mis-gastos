import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { formatearMonto } from '../models/Gasto';

export default function TarjetaGasto({ gasto, onEliminar }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.info}>
        <Text style={styles.descripcion}>{gasto.descripcion}</Text>
        <Text style={styles.detalle}>
          {formatearMonto(gasto.monto)} - {gasto.categoria}
        </Text>
      </View>
      <Button title="Eliminar" color="#d9534f" onPress={() => onEliminar(gasto.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  info: { flex: 1, marginRight: 8 },
  descripcion: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  detalle: { fontSize: 14, color: '#555', marginTop: 2 },
});
