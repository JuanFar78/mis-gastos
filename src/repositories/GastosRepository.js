// REPOSITORIO: guarda los datos en memoria (un array). No hay base de datos.

import Gasto from '../models/Gasto';

let gastos = [
  new Gasto(1, 'Supermercado', 15000, 'Alimentación'),
  new Gasto(2, 'Nafta', 20000, 'Transporte'),
  new Gasto(3, 'Café', 3500, 'Alimentación'),
];

let proximoId = 4;

const GastosRepository = {
  obtenerTodos() {
    return [...gastos];
  },

  agregar(descripcion, monto, categoria) {
    const nuevo = new Gasto(proximoId, descripcion, monto, categoria);
    proximoId = proximoId + 1;
    gastos = [...gastos, nuevo];
    return nuevo;
  },

  eliminar(id) {
    gastos = gastos.filter((g) => g.id !== id);
  },
};

export default GastosRepository;
