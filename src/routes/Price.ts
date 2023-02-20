import expres from "express";
import controller from "../controllers/Price";

const router = expres.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Price:
 *      type: object
 *      properties:
 *        amount:
 *          type: number
 *          description: the description of the price
 *        city:
 *          type: string
 *          description: the description of the price
 *      required:
 *        - number
 *        - city
 *      example:
 *        _id: 63eb775a877c50654e7818f4
 *        amount: 1000
 *        city: Zagreb
 *    PriceNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found price
 *      example:
 *        msg: price was not found
 *
 */

/**
 * @swagger
 * tags:
 *  name: Price
 *  description: Price endpoint
 */

/**
 * @swagger
 * /price/get:
 *  get:
 *    summary: Returns a list of price
 *    tags: [Price]
 *    responses:
 *      200:
 *        description: the list of prices
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PriceNotFound'
 */

router.get("/get", controller.readAllPrice);

/**
 * @swagger
 * /price/get/{city}:
 *  get:
 *    summary: get a price
 *    tags: [Price]
 *    parameters:
 *      - city:
 *        in: path
 *        name: city
 *        required: true
 *        schema:
 *        type: string
 *        description: Zagreb
 *    responses:
 *      200:
 *        description: Price
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Price'
 *      404:
 *        description: the price was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PriceNotFound'
 */
router.get("/get/:city", controller.readPrice);
router.post("/create", controller.createPrice);
router.patch("/update/:priceId", controller.updatePrice);
router.delete("/delete/:priceId", controller.deledePrice);

export = router;
