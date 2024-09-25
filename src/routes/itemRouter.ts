import express from "express";

const router = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Obtiene todos los ítems.
 *     description: Retorna una lista de todos los ítems disponibles.
 *     responses:
 *       200:
 *         description: Éxito. Retorna la lista de ítems.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/");

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Crea un nuevo ítem.
 *     description: Crea un nuevo ítem con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del ítem.
 *               name:
 *                 type: string
 *                 description: Nombre del ítem.
 *     responses:
 *       201:
 *         description: Ítem creado exitosamente.
 *       400:
 *         description: La solicitud es incorrecta o incompleta.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/");

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Actualiza un ítem existente.
 *     description: Actualiza un ítem existente con la información proporcionada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del ítem que se va a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *
 *     responses:
 *       200:
 *         description: Ítem actualizado exitosamente.
 *       400:
 *         description: La solicitud es incorrecta o incompleta.
 *       404:
 *         description: Ítem no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch("/:id");

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Elimina un ítem existente.
 *     description: Elimina un ítem existente según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del ítem que se va a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Ítem eliminado exitosamente.
 *       404:
 *         description: Ítem no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/:id");

export default router;
