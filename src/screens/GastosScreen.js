import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import FormularioGasto from '../components/FormularioGasto';
import ListaGastos from '../components/ListaGastos';
import GastosController from '../controllers/GastosController';
import { CATEGORIAS, formatearMonto } from '../models/Gasto';

export default function GastosScreen() {
  const [gastos, setGastos] = useState(GastosController.obtenerGastos());
  const [filtro, setFiltro] = useState('Todas');

  const agregarGasto = (descripcion, monto, categoria) => {
    const resultado = GastosController.agregarGasto(descripcion, monto, categoria);
    if (resultado.ok) {
      setGastos(GastosController.obtenerGastos());
    }
    return resultado;
  };

  const eliminarGasto = (id) => {
    GastosController.eliminarGasto(id);
    setGastos(GastosController.obtenerGastos());
  };

  // Todo se calcula a partir de los datos
  const total = GastosController.calcularTotal(gastos);
  const gastosFiltrados = GastosController.filtrarPorCategoria(gastos, filtro);
  const totalFiltrado = GastosController.calcularTotal(gastosFiltrados);
  const porCategoria = GastosController.totalPorCategoria(gastos);
  const masAlto = GastosController.gastoMasAlto(gastos);
  const cantidad = GastosController.cantidadGastos(gastos);

  return (
    <View style={styles.pantalla}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Gestor de gastos</Text>

        <View style={styles.totalBox}>
          <Text style={styles.totalTexto}>Total gastado: {formatearMonto(total)}</Text>
          <Text style={styles.subTotal}>Cantidad de gastos: {cantidad}</Text>
          {masAlto !== null && (
            <Text style={styles.subTotal}>
              Gasto más alto: {masAlto.descripcion} ({formatearMonto(masAlto.monto)})
            </Text>
          )}
        </View>

        <FormularioGasto onAgregar={agregarGasto} />

        <Text style={styles.seccion}>Gastos por categoría</Text>
        <View style={styles.resumen}>
          {porCategoria.length === 0 ? (
            <Text style={styles.vacio}>Sin datos todavía.</Text>
          ) : (
            porCategoria.map((item) => (
              <View key={item.categoria} style={styles.filaResumen}>
                <Text>{item.categoria}</Text>
                <Text style={styles.montoResumen}>{formatearMonto(item.total)}</Text>
              </View>
            ))
          )}
        </View>

        <Text style={styles.seccion}>Mis gastos</Text>
        <View style={styles.filtros}>
          {['Todas', ...CATEGORIAS].map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setFiltro(cat)}
              style={[styles.chip, filtro === cat && styles.chipActivo]}
            >
              <Text style={filtro === cat ? styles.textoChipActivo : styles.textoChip}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>

        {filtro !== 'Todas' && (
          <Text style={styles.subTotalFiltro}>
            Total en {filtro}: {formatearMonto(totalFiltrado)}
          </Text>
        )}

        <ListaGastos gastos={gastosFiltrados} onEliminar={eliminarGasto} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  contenido: { padding: 16, paddingBottom: 40 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  totalBox: {
    backgroundColor: '#2196f3',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  },
  totalTexto: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  subTotal: { color: '#e3f2fd', fontSize: 14, marginTop: 4 },
  seccion: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  resumen: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filaResumen: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  montoResumen: { fontWeight: 'bold' },
  vacio: { color: '#777' },
  filtros: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
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
  subTotalFiltro: { marginBottom: 8, color: '#333', fontWeight: 'bold' },
});
