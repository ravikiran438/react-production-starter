import mongoose, { Schema } from 'mongoose'
import composeWithMongoose from 'graphql-compose-mongoose'

import { ProductTC } from './product'

export const CategorySchema = new Schema({
  categoryID: {
    type: Number,
    description: 'Category unique ID',
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  description: String
}, {
  collection: 'northwind_categories'
})

export const Category = mongoose.model('Category', CategorySchema)

export const CategoryTC = composeWithMongoose(Category)

CategoryTC.addRelation(
  'productConnection',
  () => ({
    resolver: ProductTC.getResolver('connection'),
    args: {
      filter: (source) => ({ categoryID: source.categoryID })
    },
    projection: { categoryID: true }
  })
)
