// This script scans `examples` folder for `data/seed.js` files and run them for seeding DB.

import { MongoClient } from 'mongodb'
import path from 'path'
import fs from 'fs'
import config from './config'

let db
async function run () {
  db = await MongoClient.connect(config.mongoUri, { promiseLibrary: Promise })
  console.log(`Starting seed northwind...`)
  if (fs.existsSync(path.resolve('./server/examples/northwind', 'data'))) {
    const seedFile = path.resolve('./server/examples/northwind', 'data/seed.js')
    console.log(seedFile)
    try {
      fs.accessSync(seedFile, fs.F_OK)
      let seedFn = require(seedFile).default
      await seedFn(db)
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        console.log(`  file '${seedFile}' not found. Skipping...`)
      } else {
        console.log(e)
      }
    }
  }

  console.log('Seed competed!')
  db.close()
};

run().catch(e => {
  console.log(e)
  process.exit(0)
})
