// MODELO: define qué es un gasto y las categorías disponibles.

export const CATEGORIAS = [
  'Alimentación',
  'Transporte',
  'Entretenimiento',
  'Salud',
  'Otros',
];

export default class Gasto {
  constructor(id, descripcion, monto, categoria) {
    this.id = id;
    this.descripcion = descripcion;
    this.monto = monto;
    this.categoria = categoria;
  }
}

// Formatea un número como pesos argentinos: 15000 -> "$15.000"
export function formatearMonto(valor) {
  const entero = Math.round(valor).toString();
  const conPuntos = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return '$' + conPuntos;
}
