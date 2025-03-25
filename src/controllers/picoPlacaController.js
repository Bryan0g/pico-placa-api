const restricciones = require("../data/restricciones");

const obtenerRestriccionPorFecha = (req, res) => {
    const { ciudad, fecha } = req.query;
    if (!ciudad || !fecha) {
        return res.status(400).json({ error: "Debe proporcionar ciudad y fecha" });
    }
    
    const ciudadData = restricciones[ciudad];
    if (!ciudadData) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
    }

    const diaSemana = new Date(fecha).toLocaleDateString("es-CO", { weekday: "long" }).toLowerCase();
    const placas = ciudadData[diaSemana];

    if (!placas) {
        return res.status(404).json({ error: "No hay restricción para esta fecha" });
    }

    res.json({ ciudad, fecha, dia: diaSemana, restriccion: placas });
};

const obtenerRestriccionHoy = (req, res) => {
    const { ciudad } = req.query;
    if (!ciudad) {
        return res.status(400).json({ error: "Debe proporcionar una ciudad" });
    }

    const ciudadData = restricciones[ciudad];
    if (!ciudadData) {
        return res.status(404).json({ error: "Ciudad no encontrada" });
    }

    const hoy = new Date().toLocaleDateString("es-CO", { weekday: "long" }).toLowerCase();
    const placas = ciudadData[hoy];

    res.json({ ciudad, fecha: new Date().toISOString().split("T")[0], dia: hoy, restriccion: placas });
};

const obtenerRestriccionGlobal = (req, res) => {
    const hoy = new Date().toLocaleDateString("es-CO", { weekday: "long" }).toLowerCase();
    const resultado = {};

    for (const ciudad in restricciones) {
        if (restricciones[ciudad][hoy]) {
            resultado[ciudad] = restricciones[ciudad][hoy];
        }
    }

    res.json({ fecha: new Date().toISOString().split("T")[0], dia: hoy, restricciones: resultado });
};

module.exports = { obtenerRestriccionPorFecha, obtenerRestriccionHoy, obtenerRestriccionGlobal };
