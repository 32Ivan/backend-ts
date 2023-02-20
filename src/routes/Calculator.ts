import expres from "express";
import controller from "../controllers/Calculate";

const router = expres.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Calculator:
 *      type: object
 *      properties:
 *        city:
 *          type: string
 *          description: the description of the calculator
 *        dateOfBirth:
 *          type: Date
 *          description: the description of the calculator
 *      required:
 *        - name
 *        - dateOfBirth
 *      example:
 *        calculate : 900
 *    CalculatorNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found Calculator
 *      example:
 *        msg: Calculator was not found
 *

 */

/**
 * @swagger
 * tags:
 *  name: Calculator
 *  description: Calculator endpoint
 */

/**
 * @swagger
 * /cal/get/{city}/{date}:
 *  get:
 *    summary: calculator
 *    tags: [Calculator]
 *    parameters:
 *      - city:
 *        in: path
 *        name: city
 *        required: true
 *        schema:
 *        type: string
 *        description: Zagreb
 *      - date:
 *        in: path
 *        name: date
 *        required: date
 *        schema:
 *        type: string
 *        description: 1996-01-01T23:00:00.000Z
 *    responses:
 *      200:
 *        description: The Found Task
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Calculator'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CalculatorNotFound'
 */
router.get("/get/:city/:date", controller.readCalculator);

export = router;
