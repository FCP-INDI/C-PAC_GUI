import { Set } from 'immutable'

export default function keyIn(...keys) {
  const keySet = Set(keys); 
  return function (v, k) {
    return keySet.has(k);
  }
}