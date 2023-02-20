import expres from "express";
import controller from "../controllers/Customer";
import { ValidateSchema, Schema } from "../middleware/Joi";

const router = expres.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Customers:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of Customers
 *        name:
 *          type: string
 *          description: the name of the Customers
 *        surname:
 *          type: string
 *          description: the description of the Customers
 *        email:
 *          type: string
 *          description: the name of the Customers
 *        city:
 *          type: string
 *          description: the description of the Customers
 *        dateOfBirth:
 *          type: Date
 *          description: the description of the Customers
 *      required:
 *        - name
 *        - surname
 *         - email
 *         - city
 *         -dateOfBirth
 *      example:
 *        id: 63eaa4a064e210d25680d197
 *        name: Ante
 *        surname: Anic
 *        email: ante@anic.com
 *        city: Zagreb
 *        dateOfBirth: 1996-01-01
 *    CustomerNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found customer
 *      example:
 *        msg: Customer was not found
 *
 *  parameters:
 *    customerId:
 *      in: path
 *      name: customerId
 *      required: true
 *      schema:
 *        type: string
 *      description: the task id
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    Customer:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: the auto-generated id of Customers
 *        name:
 *          type: string
 *          description: the name of the Customers
 *        surname:
 *          type: string
 *          description: the description of the Customers
 *        email:
 *          type: string
 *          description: the name of the Customers
 *        city:
 *          type: string
 *          description: the description of the Customers
 *        dateOfBirth:
 *          type: Date
 *          description: the description of the Customers
 *      required:
 *        - name
 *        - surname
 *         - email
 *         - city
 *         -dateOfBirth
 *      example:
 *        name: Ante
 *        surname: Anic
 *        email: ante@anic.com
 *        city: Zagreb
 *        dateOfBirth: 1990-01-01T23:00:00.000Z
 *    CustomerNotFound:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: A message for the not found customer
 *      example:
 *        msg: Customer was not found
 *
 *  parameters:
 *    customerId:
 *      in: path
 *      name: customerId
 *      required: true
 *      schema:
 *        type: string
 *      description: the customer id
 */

/**
 * @swagger
 * tags:
 *  name: Customers
 *  description: Customers endpoint
 */

/**
 * @swagger
 * /customers/get:
 *  get:
 *    summary: Returns a list of customers
 *    tags: [Customers]
 *    responses:
 *      200:
 *        description: the list of customers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Customers'
 */
router.get("/get", controller.readAllCustomers);

/**
 * @swagger
 * /customers/get/{customerId}:
 *  get:
 *    summary: get a customer by Id
 *    tags: [Customers]
 *    parameters:
 *      - $ref: '#/components/parameters/customerId'
 *    responses:
 *      200:
 *        description: The Found Task
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Customers'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CustomerNotFound'
 */
router.get("/get/:customerId", controller.readCustomer);

/**
 * @swagger
 * /customers/create:
 *  post:
 *    summary: create a new customer
 *    tags: [Customers]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: the customer was successfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customer'
 *      500:
 *        description: Some server error
 *
 */
router.post("/create", ValidateSchema(Schema.customer.create), controller.createCustomer);

/**
 * @swagger
 * /customers/update/{customerId}:
 *  patch:
 *    summary: Update a customer by customerId
 *    tags: [Customers]
 *    parameters:
 *      - $ref: '#/components/parameters/customerId'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Customer'
 *    responses:
 *      200:
 *        description: The updated customer
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Customers'
 *      404:
 *        description: the customer was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customers'
 *
 */

router.patch("/update/:customerId", controller.updateCustomer);

/**
 * @swagger
 * /customers/delete/{customerId}:
 *  delete:
 *    summary: delete a customer by id
 *    tags: [Customers]
 *    parameters:
 *      - $ref: '#/components/parameters/customerId'
 *    responses:
 *      200:
 *        description: the customer was deleted
 *        content:
 *          application/json:
 *            schema:
 *            $ref: '#/components/schemas/Customers'
 *      404:
 *        description: the task was not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Customers'
 *
 */
router.delete("/delete/:customerId", controller.deledeCustomer);

export = router;
