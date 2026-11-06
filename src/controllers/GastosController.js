// CONTROLADOR: lógica de la aplicación (validaciones y cálculos).

import GastosRepository from '../repositories/GastosRepository';
import { CATEGORIAS } from '../models/Gasto';

const GastosController = {
  obtenerGastos() {
    return GastosRepository.obtenerTodos();
  },

  // Valida los datos y agrega el gasto. Devuelve { ok, error }.
  agregarGasto(descripcion, montoTexto, categoria) {
    const desc = descripcion.trim();
    // Acepta "15000", "15.000" o "15000,50"
    const limpio = montoTexto.trim().replace(/\./g, '').replace(',', '.');
    const monto = Number(limpio);

    if (desc === '') {
      return { ok: false, error: 'Ingresá una descripción.' };
    }
    if (limpio === '' || isNaN(monto) || monto <= 0) {
      return { ok: false, error: 'Ingresá un monto válido mayor a 0.' };
    }
    if (!CATEGORIAS.includes(categoria)) {
      return { ok: false, error: 'Elegí una categoría.' };
    }

    GastosRepository.agregar(desc, monto, categoria);
    return { ok: true, error: '' };
  },

  eliminarGasto(id) {
    GastosRepository.eliminar(id);
  },

  // Suma de todos los montos de la lista recibida.
  calcularTotal(gastos) {
    return gastos.reduce((acumulado, g) => acumulado + g.monto, 0);
  },

  // Devuelve [{ categoria, total }] solo de categorías con gastos.
  totalPorCategoria(gastos) {
    return CATEGORIAS.map((cat) => ({
      categoria: cat,
      total: gastos
        .filter((g) => g.categoria === cat)
        .reduce((acumulado, g) => acumulado + g.monto, 0),
    })).filter((item) => item.total > 0);
  },

  filtrarPorCategoria(gastos, categoria) {
    if (categoria === 'Todas') {
      return gastos;
    }
    return gastos.filter((g) => g.categoria === categoria);
  },

  // Devuelve el gasto de mayor monto, o null si no hay gastos.
  gastoMasAlto(gastos) {
    if (gastos.length === 0) {
      return null;
    }
    return gastos.reduce((mayor, g) => (g.monto > mayor.monto ? g : mayor));
  },

  cantidadGastos(gastos) {
    return gastos.length;
  },
};

export default GastosController;
