import { Dexie } from 'dexie'

const db = new Dexie('idxedDB')
db.version(1).stores({cpac: "key,value"})


export async function updateItem(key, value) {
  await db.cpac.put({key: key, value: value})
  await db.cpac.each(record => console.log("m8", record))
}

export async function getItem(key) {
  await db.cpac.each(record => console.log("m9", record))
  return await db.cpac.where({key: key}).first(val => val ? val.value : null)
}

export async function clearItem() {
  await db.cpac.clear()
  await db.cpac.each(record => console.log("m10", record))
}
