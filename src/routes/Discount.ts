import expres from "express";
import controller from "../controllers/Discount";

const router = expres.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Discount:
 *      type: object
 *      properties:
 *        discount:
 *          type: number
 *          description: the description of the discount
 *        ageMin:
 *          type: number
 *          description: the description of the discount
 *        ageMax:
 *          type: number
 *          description: the description of the discount
 *      required:
 *        - discount
 *        - ageMin
 *        - ageMax
 *      example:
 *        _id: 63ebef7e4d0f389a570f23dc
 *        discount: 20
 *        ageMin: 0
 *        ageMAx: 20
 *    DiscountNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found discount
 *      example:
 *        msg: discount was not found
 *
 */

/**
 * @swagger
 * tags:
 *  name: Discount
 *  description: Discounts endpoint
 */

/**
 * @swagger
 * /discount/get:
 *  get:
 *    summary: Returns a list of discounts
 *    tags: [Discount]
 *    responses:
 *      200:
 *        description: the list of discount
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/DiscountNotFound'
 */
router.get("/get", controller.readAllDiscount);

/**
 * @swagger
 * /discount/get/{age}:
 *  get:
 *    summary: get a customer by age
 *    tags: [Discount]
 *    parameters:
 *      - age:
 *        in: path
 *        name: age
 *        required: true
 *        schema:
 *        type: Date
 *        description: 1996-01-01T23:00:00.000Z
 *    responses:
 *      200:
 *        description: Discount
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Discount'
 *      404:
 *        description: the discounnt was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/DiscountNotFound'
 */
router.get("/get/:age", controller.readDiscount);
router.post("/create", controller.createDiscount);
router.patch("/update/:discountId", controller.updateDiscount);
router.delete("/delete/:discountId", controller.deledeDiscount);

export = router;
