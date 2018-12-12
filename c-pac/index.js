import { parse, dump, template, rawTemplate } from './pipeline'
import { listFiles, buildDataConfig } from './data_settings'
export default {
  pipeline: { parse, dump, template, rawTemplate },
  data_settings: { listFiles, buildDataConfig },
}
