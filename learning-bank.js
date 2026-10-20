/* FarmaConta EDU · Banco docente de 100 preguntas académicas y sus justificaciones.
   Las cantidades y las operaciones representan simulaciones, no contabilidad oficial. */
window.FarmaQuestionBank = Object.freeze({
  "version": 1,
  "modules": {
    "finanzas": "Educación financiera · Sesión 09",
    "ventas": "Facturación · Sesión 10",
    "inventario": "Inventarios · Sesión 11",
    "contabilidad": "Libros y balance · Sesión 11",
    "reportes": "Análisis financiero · Sesión 12"
  },
  "questions": [
    {
      "id": "F010",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Cómo se clasifica «alquiler mensual»?",
      "answer": "Fijo",
      "explanation": "Se mantiene aunque haya menos ventas en el mes.",
      "options": [
        "Fijo",
        "Variable",
        "Activo fijo"
      ],
      "term": "Costos fijos y variables",
      "level": "Básico"
    },
    {
      "id": "F011",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Cómo se clasifica «comisión por unidad vendida»?",
      "answer": "Variable",
      "explanation": "Cambia con las unidades vendidas.",
      "options": [
        "Fijo",
        "Variable",
        "Activo fijo"
      ],
      "term": "Costos fijos y variables",
      "level": "Básico"
    },
    {
      "id": "F012",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Cómo se clasifica «servicio de internet con tarifa mensual estable»?",
      "answer": "Fijo",
      "explanation": "Se paga periódicamente sin depender directamente del volumen de ventas.",
      "options": [
        "Fijo",
        "Variable",
        "Activo fijo"
      ],
      "term": "Costos fijos y variables",
      "level": "Básico"
    },
    {
      "id": "F013",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Cómo se clasifica «bolsas entregadas por cada venta»?",
      "answer": "Variable",
      "explanation": "La cantidad utilizada aumenta con las ventas.",
      "options": [
        "Fijo",
        "Variable",
        "Activo fijo"
      ],
      "term": "Costos fijos y variables",
      "level": "Básico"
    },
    {
      "id": "F014",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Cómo se clasifica «sueldo mensual fijo»?",
      "answer": "Fijo",
      "explanation": "Dentro del modelo simplificado no depende del volumen vendido.",
      "options": [
        "Fijo",
        "Variable",
        "Activo fijo"
      ],
      "term": "Costos fijos y variables",
      "level": "Básico"
    },
    {
      "id": "F020",
      "module": "finanzas",
      "type": "number",
      "prompt": "Un artículo cuesta S/ 12.00 y se vende por S/ 20.00. Calcula el margen bruto comercial sobre el precio de venta (%).",
      "answer": 40,
      "explanation": "Margen = (precio − costo) ÷ precio × 100 = 40.00 %.",
      "options": null,
      "term": "Margen bruto",
      "level": "Intermedio"
    },
    {
      "id": "F021",
      "module": "finanzas",
      "type": "number",
      "prompt": "Un artículo cuesta S/ 15.00 y se vende por S/ 25.00. Calcula el margen bruto comercial sobre el precio de venta (%).",
      "answer": 40,
      "explanation": "Margen = (precio − costo) ÷ precio × 100 = 40.00 %.",
      "options": null,
      "term": "Margen bruto",
      "level": "Intermedio"
    },
    {
      "id": "F022",
      "module": "finanzas",
      "type": "number",
      "prompt": "Un artículo cuesta S/ 28.00 y se vende por S/ 40.00. Calcula el margen bruto comercial sobre el precio de venta (%).",
      "answer": 30,
      "explanation": "Margen = (precio − costo) ÷ precio × 100 = 30.00 %.",
      "options": null,
      "term": "Margen bruto",
      "level": "Intermedio"
    },
    {
      "id": "F023",
      "module": "finanzas",
      "type": "number",
      "prompt": "Un artículo cuesta S/ 35.00 y se vende por S/ 50.00. Calcula el margen bruto comercial sobre el precio de venta (%).",
      "answer": 30,
      "explanation": "Margen = (precio − costo) ÷ precio × 100 = 30.00 %.",
      "options": null,
      "term": "Margen bruto",
      "level": "Intermedio"
    },
    {
      "id": "F024",
      "module": "finanzas",
      "type": "number",
      "prompt": "Un artículo cuesta S/ 56.00 y se vende por S/ 80.00. Calcula el margen bruto comercial sobre el precio de venta (%).",
      "answer": 30,
      "explanation": "Margen = (precio − costo) ÷ precio × 100 = 30.00 %.",
      "options": null,
      "term": "Margen bruto",
      "level": "Intermedio"
    },
    {
      "id": "F030",
      "module": "finanzas",
      "type": "number",
      "prompt": "Gastos fijos S/ 600.00, precio unitario S/ 20.00 y costo variable unitario S/ 8.00. ¿Cuántas unidades completas se requieren como mínimo para cubrir los gastos fijos?",
      "answer": 50,
      "explanation": "Punto de equilibrio = gastos fijos ÷ (precio − costo variable) = 50.00. Redondeando hacia arriba: 50 unidades.",
      "options": null,
      "term": "Punto de equilibrio",
      "level": "Avanzado"
    },
    {
      "id": "F031",
      "module": "finanzas",
      "type": "number",
      "prompt": "Gastos fijos S/ 720.00, precio unitario S/ 30.00 y costo variable unitario S/ 12.00. ¿Cuántas unidades completas se requieren como mínimo para cubrir los gastos fijos?",
      "answer": 40,
      "explanation": "Punto de equilibrio = gastos fijos ÷ (precio − costo variable) = 40.00. Redondeando hacia arriba: 40 unidades.",
      "options": null,
      "term": "Punto de equilibrio",
      "level": "Avanzado"
    },
    {
      "id": "F032",
      "module": "finanzas",
      "type": "number",
      "prompt": "Gastos fijos S/ 500.00, precio unitario S/ 25.00 y costo variable unitario S/ 15.00. ¿Cuántas unidades completas se requieren como mínimo para cubrir los gastos fijos?",
      "answer": 50,
      "explanation": "Punto de equilibrio = gastos fijos ÷ (precio − costo variable) = 50.00. Redondeando hacia arriba: 50 unidades.",
      "options": null,
      "term": "Punto de equilibrio",
      "level": "Avanzado"
    },
    {
      "id": "F033",
      "module": "finanzas",
      "type": "number",
      "prompt": "Gastos fijos S/ 840.00, precio unitario S/ 40.00 y costo variable unitario S/ 19.00. ¿Cuántas unidades completas se requieren como mínimo para cubrir los gastos fijos?",
      "answer": 40,
      "explanation": "Punto de equilibrio = gastos fijos ÷ (precio − costo variable) = 40.00. Redondeando hacia arriba: 40 unidades.",
      "options": null,
      "term": "Punto de equilibrio",
      "level": "Avanzado"
    },
    {
      "id": "F034",
      "module": "finanzas",
      "type": "number",
      "prompt": "Gastos fijos S/ 900.00, precio unitario S/ 50.00 y costo variable unitario S/ 20.00. ¿Cuántas unidades completas se requieren como mínimo para cubrir los gastos fijos?",
      "answer": 30,
      "explanation": "Punto de equilibrio = gastos fijos ÷ (precio − costo variable) = 30.00. Redondeando hacia arriba: 30 unidades.",
      "options": null,
      "term": "Punto de equilibrio",
      "level": "Avanzado"
    },
    {
      "id": "F040",
      "module": "finanzas",
      "type": "number",
      "prompt": "Efectivo de apertura S/ 3500.00 e inventario valorizado S/ 1200.00. ¿Cuál es el capital inicial simplificado?",
      "answer": 4700,
      "explanation": "Capital inicial = efectivo + inventario = S/ 4700.00.",
      "options": null,
      "term": "Capital inicial",
      "level": "Básico"
    },
    {
      "id": "F041",
      "module": "finanzas",
      "type": "number",
      "prompt": "Efectivo de apertura S/ 2000.00 e inventario valorizado S/ 900.00. ¿Cuál es el capital inicial simplificado?",
      "answer": 2900,
      "explanation": "Capital inicial = efectivo + inventario = S/ 2900.00.",
      "options": null,
      "term": "Capital inicial",
      "level": "Básico"
    },
    {
      "id": "F042",
      "module": "finanzas",
      "type": "number",
      "prompt": "Efectivo de apertura S/ 4000.00 e inventario valorizado S/ 1560.00. ¿Cuál es el capital inicial simplificado?",
      "answer": 5560,
      "explanation": "Capital inicial = efectivo + inventario = S/ 5560.00.",
      "options": null,
      "term": "Capital inicial",
      "level": "Básico"
    },
    {
      "id": "F043",
      "module": "finanzas",
      "type": "number",
      "prompt": "Efectivo de apertura S/ 2500.00 e inventario valorizado S/ 780.00. ¿Cuál es el capital inicial simplificado?",
      "answer": 3280,
      "explanation": "Capital inicial = efectivo + inventario = S/ 3280.00.",
      "options": null,
      "term": "Capital inicial",
      "level": "Básico"
    },
    {
      "id": "F044",
      "module": "finanzas",
      "type": "number",
      "prompt": "Efectivo de apertura S/ 3000.00 e inventario valorizado S/ 1100.00. ¿Cuál es el capital inicial simplificado?",
      "answer": 4100,
      "explanation": "Capital inicial = efectivo + inventario = S/ 4100.00.",
      "options": null,
      "term": "Capital inicial",
      "level": "Básico"
    },
    {
      "id": "F050",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Qué efecto corresponde a «Registrar pago de electricidad en efectivo»?",
      "answer": "Disminuye el efectivo y el resultado",
      "explanation": "Un gasto operativo pagado afecta caja y resultado.",
      "options": [
        "Disminuye el efectivo y el resultado",
        "Aumenta siempre la utilidad",
        "No afecta ninguna cuenta"
      ],
      "term": "Gastos operativos",
      "level": "Intermedio"
    },
    {
      "id": "F051",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Qué efecto corresponde a «Comprar una vitrina al contado»?",
      "answer": "Intercambia efectivo por equipamiento",
      "explanation": "La compra de equipo constituye adquisición de un activo, no necesariamente un gasto inmediato.",
      "options": [
        "Intercambia efectivo por equipamiento",
        "Aumenta siempre la utilidad",
        "No afecta ninguna cuenta"
      ],
      "term": "Gastos operativos",
      "level": "Intermedio"
    },
    {
      "id": "F052",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Qué efecto corresponde a «Cobrar una venta al contado»?",
      "answer": "Aumenta el efectivo",
      "explanation": "La venta eleva Caja, y además deben registrarse ingresos, impuesto y costo.",
      "options": [
        "Aumenta el efectivo",
        "Aumenta siempre la utilidad",
        "No afecta ninguna cuenta"
      ],
      "term": "Gastos operativos",
      "level": "Intermedio"
    },
    {
      "id": "F053",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Qué efecto corresponde a «Incrementar gastos sin cambiar ventas»?",
      "answer": "Disminuye el resultado",
      "explanation": "Resultado = ingresos netos − costos − gastos.",
      "options": [
        "Disminuye el resultado",
        "Aumenta siempre la utilidad",
        "No afecta ninguna cuenta"
      ],
      "term": "Gastos operativos",
      "level": "Intermedio"
    },
    {
      "id": "F054",
      "module": "finanzas",
      "type": "choice",
      "prompt": "¿Qué efecto corresponde a «Separar IGV de ingresos»?",
      "answer": "Evita contar el impuesto como ingreso",
      "explanation": "El IGV trasladado no es un ingreso propio de la botica.",
      "options": [
        "Evita contar el impuesto como ingreso",
        "Aumenta siempre la utilidad",
        "No afecta ninguna cuenta"
      ],
      "term": "Gastos operativos",
      "level": "Intermedio"
    },
    {
      "id": "V010",
      "module": "ventas",
      "type": "choice",
      "prompt": "¿Qué documento corresponde a: venta a empresa ficticia con RUC?",
      "answer": "Factura simulada",
      "explanation": "Corresponde «Factura simulada» en esta práctica. Todos los documentos de FarmaConta EDU son ficticios.",
      "options": [
        "Factura simulada",
        "Boleta simulada",
        "Nota de venta interna"
      ],
      "term": "Comprobante simulado",
      "level": "Básico"
    },
    {
      "id": "V011",
      "module": "ventas",
      "type": "choice",
      "prompt": "¿Qué documento corresponde a: venta minorista a consumidor final ficticio?",
      "answer": "Boleta simulada",
      "explanation": "Corresponde «Boleta simulada» en esta práctica. Todos los documentos de FarmaConta EDU son ficticios.",
      "options": [
        "Factura simulada",
        "Boleta simulada",
        "Nota de venta interna"
      ],
      "term": "Comprobante simulado",
      "level": "Básico"
    },
    {
      "id": "V012",
      "module": "ventas",
      "type": "choice",
      "prompt": "¿Qué documento corresponde a: registro comercial interno que no es comprobante tributario?",
      "answer": "Nota de venta interna",
      "explanation": "Corresponde «Nota de venta interna» en esta práctica. Todos los documentos de FarmaConta EDU son ficticios.",
      "options": [
        "Factura simulada",
        "Boleta simulada",
        "Nota de venta interna"
      ],
      "term": "Comprobante simulado",
      "level": "Básico"
    },
    {
      "id": "V013",
      "module": "ventas",
      "type": "choice",
      "prompt": "¿Qué documento corresponde a: venta a sociedad ficticia que solicita factura?",
      "answer": "Factura simulada",
      "explanation": "Corresponde «Factura simulada» en esta práctica. Todos los documentos de FarmaConta EDU son ficticios.",
      "options": [
        "Factura simulada",
        "Boleta simulada",
        "Nota de venta interna"
      ],
      "term": "Comprobante simulado",
      "level": "Básico"
    },
    {
      "id": "V014",
      "module": "ventas",
      "type": "choice",
      "prompt": "¿Qué documento corresponde a: venta personal de un producto a un cliente final?",
      "answer": "Boleta simulada",
      "explanation": "Corresponde «Boleta simulada» en esta práctica. Todos los documentos de FarmaConta EDU son ficticios.",
      "options": [
        "Factura simulada",
        "Boleta simulada",
        "Nota de venta interna"
      ],
      "term": "Comprobante simulado",
      "level": "Básico"
    },
    {
      "id": "V020",
      "module": "ventas",
      "type": "number",
      "prompt": "Total S/ 118.00, IGV de 18 % incluido. ¿Cuánto corresponde al IGV?",
      "answer": 18,
      "explanation": "IGV = total − total ÷ 1.18 = S/ 18.00.",
      "options": null,
      "term": "IGV incluido",
      "level": "Intermedio"
    },
    {
      "id": "V021",
      "module": "ventas",
      "type": "number",
      "prompt": "Total S/ 236.00, IGV de 18 % incluido. ¿Cuánto corresponde al IGV?",
      "answer": 36,
      "explanation": "IGV = total − total ÷ 1.18 = S/ 36.00.",
      "options": null,
      "term": "IGV incluido",
      "level": "Intermedio"
    },
    {
      "id": "V022",
      "module": "ventas",
      "type": "number",
      "prompt": "Total S/ 59.00, IGV de 18 % incluido. ¿Cuánto corresponde al IGV?",
      "answer": 9,
      "explanation": "IGV = total − total ÷ 1.18 = S/ 9.00.",
      "options": null,
      "term": "IGV incluido",
      "level": "Intermedio"
    },
    {
      "id": "V023",
      "module": "ventas",
      "type": "number",
      "prompt": "Total S/ 354.00, IGV de 18 % incluido. ¿Cuánto corresponde al IGV?",
      "answer": 54,
      "explanation": "IGV = total − total ÷ 1.18 = S/ 54.00.",
      "options": null,
      "term": "IGV incluido",
      "level": "Intermedio"
    },
    {
      "id": "V024",
      "module": "ventas",
      "type": "number",
      "prompt": "Total S/ 472.00, IGV de 18 % incluido. ¿Cuánto corresponde al IGV?",
      "answer": 72,
      "explanation": "IGV = total − total ÷ 1.18 = S/ 72.00.",
      "options": null,
      "term": "IGV incluido",
      "level": "Intermedio"
    },
    {
      "id": "V030",
      "module": "ventas",
      "type": "number",
      "prompt": "Subtotal S/ 100.00, descuento 10 %. ¿Cuál es el importe descontado (S/)?",
      "answer": 10,
      "explanation": "Descuento = S/ 100.00 × 10/100 = S/ 10.00.",
      "options": null,
      "term": "Descuento",
      "level": "Básico"
    },
    {
      "id": "V031",
      "module": "ventas",
      "type": "number",
      "prompt": "Subtotal S/ 200.00, descuento 5 %. ¿Cuál es el importe descontado (S/)?",
      "answer": 10,
      "explanation": "Descuento = S/ 200.00 × 5/100 = S/ 10.00.",
      "options": null,
      "term": "Descuento",
      "level": "Básico"
    },
    {
      "id": "V032",
      "module": "ventas",
      "type": "number",
      "prompt": "Subtotal S/ 350.00, descuento 10 %. ¿Cuál es el importe descontado (S/)?",
      "answer": 35,
      "explanation": "Descuento = S/ 350.00 × 10/100 = S/ 35.00.",
      "options": null,
      "term": "Descuento",
      "level": "Básico"
    },
    {
      "id": "V033",
      "module": "ventas",
      "type": "number",
      "prompt": "Subtotal S/ 80.00, descuento 25 %. ¿Cuál es el importe descontado (S/)?",
      "answer": 20,
      "explanation": "Descuento = S/ 80.00 × 25/100 = S/ 20.00.",
      "options": null,
      "term": "Descuento",
      "level": "Básico"
    },
    {
      "id": "V034",
      "module": "ventas",
      "type": "number",
      "prompt": "Subtotal S/ 500.00, descuento 12 %. ¿Cuál es el importe descontado (S/)?",
      "answer": 60,
      "explanation": "Descuento = S/ 500.00 × 12/100 = S/ 60.00.",
      "options": null,
      "term": "Descuento",
      "level": "Básico"
    },
    {
      "id": "V040",
      "module": "ventas",
      "type": "number",
      "prompt": "Precio gravado de S/ 118.00 con IGV incluido. ¿Cuál es el valor de venta sin IGV?",
      "answer": 100,
      "explanation": "Valor sin IGV = S/ 118.00 ÷ 1.18 = S/ 100.00.",
      "options": null,
      "term": "Valor de venta",
      "level": "Intermedio"
    },
    {
      "id": "V041",
      "module": "ventas",
      "type": "number",
      "prompt": "Precio gravado de S/ 236.00 con IGV incluido. ¿Cuál es el valor de venta sin IGV?",
      "answer": 200,
      "explanation": "Valor sin IGV = S/ 236.00 ÷ 1.18 = S/ 200.00.",
      "options": null,
      "term": "Valor de venta",
      "level": "Intermedio"
    },
    {
      "id": "V042",
      "module": "ventas",
      "type": "number",
      "prompt": "Precio gravado de S/ 59.00 con IGV incluido. ¿Cuál es el valor de venta sin IGV?",
      "answer": 50,
      "explanation": "Valor sin IGV = S/ 59.00 ÷ 1.18 = S/ 50.00.",
      "options": null,
      "term": "Valor de venta",
      "level": "Intermedio"
    },
    {
      "id": "V043",
      "module": "ventas",
      "type": "number",
      "prompt": "Precio gravado de S/ 354.00 con IGV incluido. ¿Cuál es el valor de venta sin IGV?",
      "answer": 300,
      "explanation": "Valor sin IGV = S/ 354.00 ÷ 1.18 = S/ 300.00.",
      "options": null,
      "term": "Valor de venta",
      "level": "Intermedio"
    },
    {
      "id": "V044",
      "module": "ventas",
      "type": "number",
      "prompt": "Precio gravado de S/ 472.00 con IGV incluido. ¿Cuál es el valor de venta sin IGV?",
      "answer": 400,
      "explanation": "Valor sin IGV = S/ 472.00 ÷ 1.18 = S/ 400.00.",
      "options": null,
      "term": "Valor de venta",
      "level": "Intermedio"
    },
    {
      "id": "I010",
      "module": "inventario",
      "type": "number",
      "prompt": "12 unidades a costo S/ 4.50 por unidad. ¿Cuánto vale el inventario?",
      "answer": 54,
      "explanation": "Valor del inventario = unidades × costo = S/ 54.00.",
      "options": null,
      "term": "Inventario valorizado",
      "level": "Básico"
    },
    {
      "id": "I011",
      "module": "inventario",
      "type": "number",
      "prompt": "20 unidades a costo S/ 3.00 por unidad. ¿Cuánto vale el inventario?",
      "answer": 60,
      "explanation": "Valor del inventario = unidades × costo = S/ 60.00.",
      "options": null,
      "term": "Inventario valorizado",
      "level": "Básico"
    },
    {
      "id": "I012",
      "module": "inventario",
      "type": "number",
      "prompt": "8 unidades a costo S/ 11.50 por unidad. ¿Cuánto vale el inventario?",
      "answer": 92,
      "explanation": "Valor del inventario = unidades × costo = S/ 92.00.",
      "options": null,
      "term": "Inventario valorizado",
      "level": "Básico"
    },
    {
      "id": "I013",
      "module": "inventario",
      "type": "number",
      "prompt": "40 unidades a costo S/ 1.25 por unidad. ¿Cuánto vale el inventario?",
      "answer": 50,
      "explanation": "Valor del inventario = unidades × costo = S/ 50.00.",
      "options": null,
      "term": "Inventario valorizado",
      "level": "Básico"
    },
    {
      "id": "I014",
      "module": "inventario",
      "type": "number",
      "prompt": "25 unidades a costo S/ 7.20 por unidad. ¿Cuánto vale el inventario?",
      "answer": 180,
      "explanation": "Valor del inventario = unidades × costo = S/ 180.00.",
      "options": null,
      "term": "Inventario valorizado",
      "level": "Básico"
    },
    {
      "id": "I020",
      "module": "inventario",
      "type": "number",
      "prompt": "Se tenían 30 unidades y se vendieron 4. ¿Cuántas quedan?",
      "answer": 26,
      "explanation": "Stock final = 30 − 4 = 26 unidades.",
      "options": null,
      "term": "Stock final",
      "level": "Básico"
    },
    {
      "id": "I021",
      "module": "inventario",
      "type": "number",
      "prompt": "Se tenían 45 unidades y se vendieron 12. ¿Cuántas quedan?",
      "answer": 33,
      "explanation": "Stock final = 45 − 12 = 33 unidades.",
      "options": null,
      "term": "Stock final",
      "level": "Básico"
    },
    {
      "id": "I022",
      "module": "inventario",
      "type": "number",
      "prompt": "Se tenían 20 unidades y se vendieron 5. ¿Cuántas quedan?",
      "answer": 15,
      "explanation": "Stock final = 20 − 5 = 15 unidades.",
      "options": null,
      "term": "Stock final",
      "level": "Básico"
    },
    {
      "id": "I023",
      "module": "inventario",
      "type": "number",
      "prompt": "Se tenían 16 unidades y se vendieron 7. ¿Cuántas quedan?",
      "answer": 9,
      "explanation": "Stock final = 16 − 7 = 9 unidades.",
      "options": null,
      "term": "Stock final",
      "level": "Básico"
    },
    {
      "id": "I024",
      "module": "inventario",
      "type": "number",
      "prompt": "Se tenían 60 unidades y se vendieron 19. ¿Cuántas quedan?",
      "answer": 41,
      "explanation": "Stock final = 60 − 19 = 41 unidades.",
      "options": null,
      "term": "Stock final",
      "level": "Básico"
    },
    {
      "id": "I030",
      "module": "inventario",
      "type": "choice",
      "prompt": "Selecciona el estado o acción apropiada: Quedan cero unidades.",
      "answer": "Agotado",
      "explanation": "El producto no tiene existencias disponibles.",
      "options": [
        "Agotado",
        "Stock bajo",
        "Disponible",
        "Desactivar, conservar historial",
        "Eliminar si queda otro producto"
      ],
      "term": "Stock",
      "level": "Intermedio"
    },
    {
      "id": "I031",
      "module": "inventario",
      "type": "choice",
      "prompt": "Selecciona el estado o acción apropiada: Quedan tres unidades con umbral de alerta de cinco.",
      "answer": "Stock bajo",
      "explanation": "El stock es positivo y está por debajo del umbral.",
      "options": [
        "Agotado",
        "Stock bajo",
        "Disponible",
        "Desactivar, conservar historial",
        "Eliminar si queda otro producto"
      ],
      "term": "Stock",
      "level": "Intermedio"
    },
    {
      "id": "I032",
      "module": "inventario",
      "type": "choice",
      "prompt": "Selecciona el estado o acción apropiada: Quedan treinta unidades con umbral de alerta de cinco.",
      "answer": "Disponible",
      "explanation": "Las existencias superan el umbral de alerta.",
      "options": [
        "Agotado",
        "Stock bajo",
        "Disponible",
        "Desactivar, conservar historial",
        "Eliminar si queda otro producto"
      ],
      "term": "Stock",
      "level": "Intermedio"
    },
    {
      "id": "I033",
      "module": "inventario",
      "type": "choice",
      "prompt": "Selecciona el estado o acción apropiada: Se quiere retirar un producto que ya fue vendido.",
      "answer": "Desactivar, conservar historial",
      "explanation": "No deben alterarse comprobantes anteriores.",
      "options": [
        "Agotado",
        "Stock bajo",
        "Disponible",
        "Desactivar, conservar historial",
        "Eliminar si queda otro producto"
      ],
      "term": "Stock",
      "level": "Intermedio"
    },
    {
      "id": "I034",
      "module": "inventario",
      "type": "choice",
      "prompt": "Selecciona el estado o acción apropiada: Se quiere retirar un producto nunca vendido.",
      "answer": "Eliminar si queda otro producto",
      "explanation": "Es posible eliminarlo sin perder movimientos previos.",
      "options": [
        "Agotado",
        "Stock bajo",
        "Disponible",
        "Desactivar, conservar historial",
        "Eliminar si queda otro producto"
      ],
      "term": "Stock",
      "level": "Intermedio"
    },
    {
      "id": "I040",
      "module": "inventario",
      "type": "number",
      "prompt": "Precio de venta S/ 18.00 y costo unitario S/ 10.00. ¿Cuál es la diferencia bruta unitaria, antes de separar IGV y otros gastos?",
      "answer": 8,
      "explanation": "Diferencia = precio − costo = S/ 8.00; esto no equivale a utilidad neta.",
      "options": null,
      "term": "Precio de venta",
      "level": "Básico"
    },
    {
      "id": "I041",
      "module": "inventario",
      "type": "number",
      "prompt": "Precio de venta S/ 24.00 y costo unitario S/ 20.00. ¿Cuál es la diferencia bruta unitaria, antes de separar IGV y otros gastos?",
      "answer": 4,
      "explanation": "Diferencia = precio − costo = S/ 4.00; esto no equivale a utilidad neta.",
      "options": null,
      "term": "Precio de venta",
      "level": "Básico"
    },
    {
      "id": "I042",
      "module": "inventario",
      "type": "number",
      "prompt": "Precio de venta S/ 15.00 y costo unitario S/ 8.00. ¿Cuál es la diferencia bruta unitaria, antes de separar IGV y otros gastos?",
      "answer": 7,
      "explanation": "Diferencia = precio − costo = S/ 7.00; esto no equivale a utilidad neta.",
      "options": null,
      "term": "Precio de venta",
      "level": "Básico"
    },
    {
      "id": "I043",
      "module": "inventario",
      "type": "number",
      "prompt": "Precio de venta S/ 42.00 y costo unitario S/ 30.00. ¿Cuál es la diferencia bruta unitaria, antes de separar IGV y otros gastos?",
      "answer": 12,
      "explanation": "Diferencia = precio − costo = S/ 12.00; esto no equivale a utilidad neta.",
      "options": null,
      "term": "Precio de venta",
      "level": "Básico"
    },
    {
      "id": "I044",
      "module": "inventario",
      "type": "number",
      "prompt": "Precio de venta S/ 12.00 y costo unitario S/ 5.00. ¿Cuál es la diferencia bruta unitaria, antes de separar IGV y otros gastos?",
      "answer": 7,
      "explanation": "Diferencia = precio − costo = S/ 7.00; esto no equivale a utilidad neta.",
      "options": null,
      "term": "Precio de venta",
      "level": "Básico"
    },
    {
      "id": "C010",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Cuál es el asiento correcto para: Pago de alquiler en efectivo?",
      "answer": "Debe: gastos / Haber: caja",
      "explanation": "Se reconoce gasto y salida de caja.",
      "options": [
        "Debe: gastos / Haber: caja",
        "Debe: caja / Haber: ventas e IGV",
        "Debe: costo de ventas / Haber: mercaderías",
        "Debe: caja / Haber: capital",
        "Debe: mercaderías / Haber: capital"
      ],
      "term": "Debe y Haber",
      "level": "Intermedio"
    },
    {
      "id": "C011",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Cuál es el asiento correcto para: Venta al contado gravada?",
      "answer": "Debe: caja / Haber: ventas e IGV",
      "explanation": "Se registra el importe total cobrado y la separación entre ingreso e impuesto.",
      "options": [
        "Debe: gastos / Haber: caja",
        "Debe: caja / Haber: ventas e IGV",
        "Debe: costo de ventas / Haber: mercaderías",
        "Debe: caja / Haber: capital",
        "Debe: mercaderías / Haber: capital"
      ],
      "term": "Debe y Haber",
      "level": "Intermedio"
    },
    {
      "id": "C012",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Cuál es el asiento correcto para: Registro del costo de productos vendidos?",
      "answer": "Debe: costo de ventas / Haber: mercaderías",
      "explanation": "La salida de mercaderías reconoce costo de ventas.",
      "options": [
        "Debe: gastos / Haber: caja",
        "Debe: caja / Haber: ventas e IGV",
        "Debe: costo de ventas / Haber: mercaderías",
        "Debe: caja / Haber: capital",
        "Debe: mercaderías / Haber: capital"
      ],
      "term": "Debe y Haber",
      "level": "Intermedio"
    },
    {
      "id": "C013",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Cuál es el asiento correcto para: Aporte de efectivo inicial?",
      "answer": "Debe: caja / Haber: capital",
      "explanation": "El aporte eleva caja y patrimonio.",
      "options": [
        "Debe: gastos / Haber: caja",
        "Debe: caja / Haber: ventas e IGV",
        "Debe: costo de ventas / Haber: mercaderías",
        "Debe: caja / Haber: capital",
        "Debe: mercaderías / Haber: capital"
      ],
      "term": "Debe y Haber",
      "level": "Intermedio"
    },
    {
      "id": "C014",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Cuál es el asiento correcto para: Aporte de mercaderías iniciales?",
      "answer": "Debe: mercaderías / Haber: capital",
      "explanation": "Las mercaderías aportadas aumentan activo y patrimonio.",
      "options": [
        "Debe: gastos / Haber: caja",
        "Debe: caja / Haber: ventas e IGV",
        "Debe: costo de ventas / Haber: mercaderías",
        "Debe: caja / Haber: capital",
        "Debe: mercaderías / Haber: capital"
      ],
      "term": "Debe y Haber",
      "level": "Intermedio"
    },
    {
      "id": "C020",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Qué concepto se define como «Registro cronológico de asientos»?",
      "answer": "Libro diario",
      "explanation": "Las transacciones se registran por fecha.",
      "options": [
        "Libro diario",
        "Libro mayor",
        "Balance de comprobación",
        "Activo",
        "Pasivo"
      ],
      "term": "Libros contables",
      "level": "Básico"
    },
    {
      "id": "C021",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Qué concepto se define como «Movimiento agrupado por cuentas»?",
      "answer": "Libro mayor",
      "explanation": "Permite seguir el Debe y Haber de cada cuenta.",
      "options": [
        "Libro diario",
        "Libro mayor",
        "Balance de comprobación",
        "Activo",
        "Pasivo"
      ],
      "term": "Libros contables",
      "level": "Básico"
    },
    {
      "id": "C022",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Qué concepto se define como «Comparación de totales del Debe y Haber»?",
      "answer": "Balance de comprobación",
      "explanation": "Permite controlar igualdad de sumas.",
      "options": [
        "Libro diario",
        "Libro mayor",
        "Balance de comprobación",
        "Activo",
        "Pasivo"
      ],
      "term": "Libros contables",
      "level": "Básico"
    },
    {
      "id": "C023",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Qué concepto se define como «Bienes y derechos de la farmacia»?",
      "answer": "Activo",
      "explanation": "La caja y mercaderías forman parte del activo.",
      "options": [
        "Libro diario",
        "Libro mayor",
        "Balance de comprobación",
        "Activo",
        "Pasivo"
      ],
      "term": "Libros contables",
      "level": "Básico"
    },
    {
      "id": "C024",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "¿Qué concepto se define como «Obligaciones de la farmacia»?",
      "answer": "Pasivo",
      "explanation": "Incluye las deudas y el impuesto por pagar en el ejemplo.",
      "options": [
        "Libro diario",
        "Libro mayor",
        "Balance de comprobación",
        "Activo",
        "Pasivo"
      ],
      "term": "Libros contables",
      "level": "Básico"
    },
    {
      "id": "C030",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Caja S/ 1000.00, Mercaderías S/ 400.00, sin otros activos. ¿Total del activo?",
      "answer": 1400,
      "explanation": "Activo = caja + mercaderías = S/ 1400.00.",
      "options": null,
      "term": "Activo",
      "level": "Básico"
    },
    {
      "id": "C031",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Caja S/ 2000.00, Mercaderías S/ 550.00, sin otros activos. ¿Total del activo?",
      "answer": 2550,
      "explanation": "Activo = caja + mercaderías = S/ 2550.00.",
      "options": null,
      "term": "Activo",
      "level": "Básico"
    },
    {
      "id": "C032",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Caja S/ 3200.00, Mercaderías S/ 870.00, sin otros activos. ¿Total del activo?",
      "answer": 4070,
      "explanation": "Activo = caja + mercaderías = S/ 4070.00.",
      "options": null,
      "term": "Activo",
      "level": "Básico"
    },
    {
      "id": "C033",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Caja S/ 750.00, Mercaderías S/ 250.00, sin otros activos. ¿Total del activo?",
      "answer": 1000,
      "explanation": "Activo = caja + mercaderías = S/ 1000.00.",
      "options": null,
      "term": "Activo",
      "level": "Básico"
    },
    {
      "id": "C034",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Caja S/ 1800.00, Mercaderías S/ 760.00, sin otros activos. ¿Total del activo?",
      "answer": 2560,
      "explanation": "Activo = caja + mercaderías = S/ 2560.00.",
      "options": null,
      "term": "Activo",
      "level": "Básico"
    },
    {
      "id": "C040",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "Asiento: Debe S/ 140.00 y Haber S/ 140.00. ¿Qué observas?",
      "answer": "Debe = Haber",
      "explanation": "Debe y Haber son iguales. Cuadrar las sumas no garantiza por sí solo que las cuentas elegidas sean correctas.",
      "options": [
        "Debe = Haber",
        "Debe supera Haber",
        "Haber supera Debe"
      ],
      "term": "Partida doble",
      "level": "Intermedio"
    },
    {
      "id": "C041",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "Asiento: Debe S/ 320.00 y Haber S/ 320.00. ¿Qué observas?",
      "answer": "Debe = Haber",
      "explanation": "Debe y Haber son iguales. Cuadrar las sumas no garantiza por sí solo que las cuentas elegidas sean correctas.",
      "options": [
        "Debe = Haber",
        "Debe supera Haber",
        "Haber supera Debe"
      ],
      "term": "Partida doble",
      "level": "Intermedio"
    },
    {
      "id": "C042",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "Asiento: Debe S/ 500.00 y Haber S/ 500.00. ¿Qué observas?",
      "answer": "Debe = Haber",
      "explanation": "Debe y Haber son iguales. Cuadrar las sumas no garantiza por sí solo que las cuentas elegidas sean correctas.",
      "options": [
        "Debe = Haber",
        "Debe supera Haber",
        "Haber supera Debe"
      ],
      "term": "Partida doble",
      "level": "Intermedio"
    },
    {
      "id": "C043",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "Asiento: Debe S/ 80.00 y Haber S/ 80.00. ¿Qué observas?",
      "answer": "Debe = Haber",
      "explanation": "Debe y Haber son iguales. Cuadrar las sumas no garantiza por sí solo que las cuentas elegidas sean correctas.",
      "options": [
        "Debe = Haber",
        "Debe supera Haber",
        "Haber supera Debe"
      ],
      "term": "Partida doble",
      "level": "Intermedio"
    },
    {
      "id": "C044",
      "module": "contabilidad",
      "type": "choice",
      "prompt": "Asiento: Debe S/ 270.00 y Haber S/ 270.00. ¿Qué observas?",
      "answer": "Debe = Haber",
      "explanation": "Debe y Haber son iguales. Cuadrar las sumas no garantiza por sí solo que las cuentas elegidas sean correctas.",
      "options": [
        "Debe = Haber",
        "Debe supera Haber",
        "Haber supera Debe"
      ],
      "term": "Partida doble",
      "level": "Intermedio"
    },
    {
      "id": "C050",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Venta al contado por S/ 118.00 con IGV incluido de S/ 18.00. ¿Cuánto se acredita a ingresos por ventas sin IGV?",
      "answer": 100,
      "explanation": "Ingresos = cobro − impuesto = S/ 100.00; además debe acreditarse IGV por S/ 18.00.",
      "options": null,
      "term": "Asiento compuesto",
      "level": "Avanzado"
    },
    {
      "id": "C051",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Venta al contado por S/ 236.00 con IGV incluido de S/ 36.00. ¿Cuánto se acredita a ingresos por ventas sin IGV?",
      "answer": 200,
      "explanation": "Ingresos = cobro − impuesto = S/ 200.00; además debe acreditarse IGV por S/ 36.00.",
      "options": null,
      "term": "Asiento compuesto",
      "level": "Avanzado"
    },
    {
      "id": "C052",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Venta al contado por S/ 354.00 con IGV incluido de S/ 54.00. ¿Cuánto se acredita a ingresos por ventas sin IGV?",
      "answer": 300,
      "explanation": "Ingresos = cobro − impuesto = S/ 300.00; además debe acreditarse IGV por S/ 54.00.",
      "options": null,
      "term": "Asiento compuesto",
      "level": "Avanzado"
    },
    {
      "id": "C053",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Venta al contado por S/ 59.00 con IGV incluido de S/ 9.00. ¿Cuánto se acredita a ingresos por ventas sin IGV?",
      "answer": 50,
      "explanation": "Ingresos = cobro − impuesto = S/ 50.00; además debe acreditarse IGV por S/ 9.00.",
      "options": null,
      "term": "Asiento compuesto",
      "level": "Avanzado"
    },
    {
      "id": "C054",
      "module": "contabilidad",
      "type": "number",
      "prompt": "Venta al contado por S/ 472.00 con IGV incluido de S/ 72.00. ¿Cuánto se acredita a ingresos por ventas sin IGV?",
      "answer": 400,
      "explanation": "Ingresos = cobro − impuesto = S/ 400.00; además debe acreditarse IGV por S/ 72.00.",
      "options": null,
      "term": "Asiento compuesto",
      "level": "Avanzado"
    },
    {
      "id": "R010",
      "module": "reportes",
      "type": "number",
      "prompt": "Ingresos netos S/ 500.00, costo vendido S/ 240.00 y gastos S/ 90.00. ¿Resultado operativo?",
      "answer": 170,
      "explanation": "Resultado = ingresos netos − costo de ventas − gastos = S/ 170.00.",
      "options": null,
      "term": "Resultado operativo",
      "level": "Intermedio"
    },
    {
      "id": "R011",
      "module": "reportes",
      "type": "number",
      "prompt": "Ingresos netos S/ 900.00, costo vendido S/ 400.00 y gastos S/ 150.00. ¿Resultado operativo?",
      "answer": 350,
      "explanation": "Resultado = ingresos netos − costo de ventas − gastos = S/ 350.00.",
      "options": null,
      "term": "Resultado operativo",
      "level": "Intermedio"
    },
    {
      "id": "R012",
      "module": "reportes",
      "type": "number",
      "prompt": "Ingresos netos S/ 1200.00, costo vendido S/ 600.00 y gastos S/ 180.00. ¿Resultado operativo?",
      "answer": 420,
      "explanation": "Resultado = ingresos netos − costo de ventas − gastos = S/ 420.00.",
      "options": null,
      "term": "Resultado operativo",
      "level": "Intermedio"
    },
    {
      "id": "R013",
      "module": "reportes",
      "type": "number",
      "prompt": "Ingresos netos S/ 300.00, costo vendido S/ 160.00 y gastos S/ 70.00. ¿Resultado operativo?",
      "answer": 70,
      "explanation": "Resultado = ingresos netos − costo de ventas − gastos = S/ 70.00.",
      "options": null,
      "term": "Resultado operativo",
      "level": "Intermedio"
    },
    {
      "id": "R014",
      "module": "reportes",
      "type": "number",
      "prompt": "Ingresos netos S/ 750.00, costo vendido S/ 350.00 y gastos S/ 110.00. ¿Resultado operativo?",
      "answer": 290,
      "explanation": "Resultado = ingresos netos − costo de ventas − gastos = S/ 290.00.",
      "options": null,
      "term": "Resultado operativo",
      "level": "Intermedio"
    },
    {
      "id": "R020",
      "module": "reportes",
      "type": "choice",
      "prompt": "Si «Las ventas suben pero el resultado baja», ¿qué decisión es más pertinente?",
      "answer": "Revisar costos y gastos",
      "explanation": "Más ventas no siempre implica mayor resultado.",
      "options": [
        "Revisar costos y gastos",
        "Planificar reposición",
        "Registrar los gastos pendientes",
        "Revisar precio y costo",
        "Revisar asientos y sumas"
      ],
      "term": "Toma de decisiones",
      "level": "Avanzado"
    },
    {
      "id": "R021",
      "module": "reportes",
      "type": "choice",
      "prompt": "Si «Un producto de alta rotación queda con dos unidades», ¿qué decisión es más pertinente?",
      "answer": "Planificar reposición",
      "explanation": "Identificar la necesidad de reponer es importante para la continuidad.",
      "options": [
        "Revisar costos y gastos",
        "Planificar reposición",
        "Registrar los gastos pendientes",
        "Revisar precio y costo",
        "Revisar asientos y sumas"
      ],
      "term": "Toma de decisiones",
      "level": "Avanzado"
    },
    {
      "id": "R022",
      "module": "reportes",
      "type": "choice",
      "prompt": "Si «Se registran ventas pero no gastos», ¿qué decisión es más pertinente?",
      "answer": "Registrar los gastos pendientes",
      "explanation": "Sin gastos, el resultado estimado es incompleto.",
      "options": [
        "Revisar costos y gastos",
        "Planificar reposición",
        "Registrar los gastos pendientes",
        "Revisar precio y costo",
        "Revisar asientos y sumas"
      ],
      "term": "Toma de decisiones",
      "level": "Avanzado"
    },
    {
      "id": "R023",
      "module": "reportes",
      "type": "choice",
      "prompt": "Si «El precio de venta de un artículo es inferior a su costo», ¿qué decisión es más pertinente?",
      "answer": "Revisar precio y costo",
      "explanation": "La diferencia bruta es negativa.",
      "options": [
        "Revisar costos y gastos",
        "Planificar reposición",
        "Registrar los gastos pendientes",
        "Revisar precio y costo",
        "Revisar asientos y sumas"
      ],
      "term": "Toma de decisiones",
      "level": "Avanzado"
    },
    {
      "id": "R024",
      "module": "reportes",
      "type": "choice",
      "prompt": "Si «Los totales del Debe y Haber son distintos», ¿qué decisión es más pertinente?",
      "answer": "Revisar asientos y sumas",
      "explanation": "El registro debe cumplir la igualdad de la partida doble.",
      "options": [
        "Revisar costos y gastos",
        "Planificar reposición",
        "Registrar los gastos pendientes",
        "Revisar precio y costo",
        "Revisar asientos y sumas"
      ],
      "term": "Toma de decisiones",
      "level": "Avanzado"
    }
  ]
});
