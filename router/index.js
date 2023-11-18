import express from "express"
import {task_controller} from '../Controller/router.js'
const Round =express.Router()

Round.route('/').get(task_controller.getAllProducts)
Round.route('/static').get(task_controller.getAllProductsStatic)

export const tasks =Round