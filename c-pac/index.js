import { parse, dump } from './pipeline'
import { listFiles } from './data_settings'
export default {
  pipeline: { parse, dump },
  data_settings: { listFiles },
}
