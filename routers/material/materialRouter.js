import CRUDController from '../../controllers/CRUDController'
import CRUDRouter from '../CRUDRouter'
import { Material } from '../../db/models'
import { Lecture } from '../../db/models'
import express from 'express'

const listOptions = {
  include: [
    {
      model: Lecture,
      as: 'lecture',
      attributes: ['title'],
    },
  ],
}

const router = express.Router()
const routers = new CRUDRouter(
  new CRUDController(Material, 'material', listOptions)
)
router.use(routers)

export default router
