import cpac from '@internal/c-pac'

export function generateId(name, arrayObj) {
  let newId = cpac.utils.slugify(name);
  let curIdx = arrayObj.findIndex((s) => s.get('id') === newId)
  let c = null;
  if (curIdx !== -1) {
    c = 0;
    while (curIdx > -1) {
      c++;
      curIdx = arrayObj.findIndex((s) => s.get('id') === `${newId}-${c}`);
    }
  }

  return c !== null ? `${newId}-${c}` : newId;
}
