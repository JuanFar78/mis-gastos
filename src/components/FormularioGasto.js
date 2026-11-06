import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../models/Gasto';

// onAgregar(descripcion, monto, categoria) debe devolver { ok, error }
export default function FormularioGasto({ onAgregar }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [error, setError] = useState('');

  const manejarAgregar = () => {
    const resultado = onAgregar(descripcion, monto, categoria);
    if (resultado.ok) {
      setDescripcion('');
      setMonto('');
      setError('');
    } else {
      setError(resultado.error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Agregar gasto</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción (ej: Supermercado)"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto (ej: 15000)"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      <Text style={styles.etiqueta}>Categoría</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipActivo]}
          >
            <Text style={categoria === cat ? styles.textoChipActivo : styles.textoChip}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <Button title="Agregar gasto" onPress={manejarAgregar} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  etiqueta: { fontSize: 14, color: '#555', marginBottom: 4 },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  chip: {
    borderWidth: 1,
    borderColor: '#2196f3',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  chipActivo: { backgroundColor: '#2196f3' },
  textoChip: { color: '#2196f3' },
  textoChipActivo: { color: '#fff' },
  error: { color: '#d9534f', marginBottom: 8 },
});
