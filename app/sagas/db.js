import { Dexie } from 'dexie'

const db = new Dexie('idxedDB')
db.version(1).stores({cpac: "key,value"})


export async function updateItem(key, value) {
  await db.cpac.put({key: key, value: value})
}

export async function getItem(key) {
  return db.cpac.where({key: key}).first(val => val ? val.value : null);
}

export async function clearItem() {
  await db.cpac.where('key').anyOf('*').delete()
}
