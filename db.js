const fs = require('fs').promises
const yaml = require('js-yaml')
const STORE = 'store/data.yaml'

async function readStore() {
  try {
    const file = await fs.readFile(STORE, 'utf8')
    return yaml.load(file) || {}
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {}
    }
    throw error
  }
}

async function writeStore(data) {
  await fs.writeFile(STORE, yaml.dump(data))
}

async function set(req) {
  const { key, value } = req.body
  const store = await readStore()
  store[key] = value
  await writeStore(store)
  return { [key]: value }
}

async function clear() {
  await writeStore({})
  return 'Store cleared'
}

async function getAll() {
  return await readStore()
}

async function get(req) {
  const { key } = req.params
  const store = await readStore()
  return { [key]: store[key] }
}

async function deleteKey(req) {
  const { key } = req.params
  const store = await readStore()
  const deleted = delete store[key]
  await writeStore(store)
  return { deleted, key }
}

async function getKeys() {
  const store = await readStore()
  return Object.keys(store)
}

async function increment(req) {
  const { key } = req.params
  const store = await readStore()
  if (typeof store[key] === 'number') {
    store[key]++
  } else {
    store[key] = 1
  }
  await writeStore(store)
  return { [key]: store[key] }
}

module.exports = {
  set,
  getAll,
  clear,
  get,
  delete: deleteKey,
  getKeys,
  increment
}