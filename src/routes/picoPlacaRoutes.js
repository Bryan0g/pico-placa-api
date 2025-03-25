const express = require("express");
const { obtenerRestriccionPorFecha, obtenerRestriccionHoy, obtenerRestriccionGlobal } = require("../controllers/picoPlacaController");

const router = express.Router();

router.get("/restriccion/fecha", obtenerRestriccionPorFecha);
router.get("/restriccion/hoy", obtenerRestriccionHoy);
router.get("/restriccion/global", obtenerRestriccionGlobal);

module.exports = router;
