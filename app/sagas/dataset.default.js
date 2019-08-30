
import cpac from '@internal/c-pac'

const abide = JSON.parse(JSON.stringify(cpac.data_settings.template))
const abideVersion = Object.keys(abide.versions)[0]
abide.id = 'abide'
abide.name = 'ABIDE I'
abide.versions[abideVersion].configuration.options.base = 's3://fcp-indi/data/Projects/ABIDE/RawDataBIDS'

const abide2 = JSON.parse(JSON.stringify(cpac.data_settings.template))
const abide2Version = Object.keys(abide2.versions)[0]
abide2.id = 'abide2'
abide2.name = 'ABIDE II'
abide2.versions[abide2Version].configuration.options.base = 's3://fcp-indi/data/Projects/ABIDE/RawDataBIDS'

export const datasets = [
  abide,
  abide2,
]