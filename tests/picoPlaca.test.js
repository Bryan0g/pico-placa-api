const request = require("supertest");
const app = require("../src/app");

describe("Pruebas de la API de Pico y Placa", () => {
    test("Consulta por fecha", async () => {
        const response = await request(app).get("/api/restriccion/fecha?ciudad=Bogotá&fecha=2025-03-25");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("restriccion");
    });

    test("Consulta del día actual", async () => {
        const response = await request(app).get("/api/restriccion/hoy?ciudad=Medellín");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("restriccion");
    });

    test("Consulta global", async () => {
        const response = await request(app).get("/api/restriccion/global");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("restricciones");
    });

    test("Manejo de ciudad no encontrada", async () => {
        const response = await request(app).get("/api/restriccion/hoy?ciudad=Desconocida");
        expect(response.status).toBe(404);
    });
});
