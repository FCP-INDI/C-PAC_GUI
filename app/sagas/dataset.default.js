
import cpac from '@internal/c-pac'

const abide = JSON.parse(JSON.stringify(cpac.data_settings.template))
const abideVersion = Object.keys(abide.versions)[0]
abide.id = 'abide'
abide.name = 'ABIDE I'
abide.versions[abideVersion].configuration.options.base = 's3://fcp-indi/data/Projects/ABIDE/RawDataBIDS'
abide.views = [
  {
    id: 'default',
    name: 'All',
    query: 'true',
  },
  {
    id: 'site-nyu',
    name: 'Site: NYU',
    query: "dataConfig.site === 'NYU'",
  },
  {
    id: 'site-sbl',
    name: 'Site: SBL',
    query: "dataConfig.site === 'SBL'",
  },
  {
    id: 'subject-right',
    name: 'Subject: 0050952',
    query: "dataConfig.subject_id === '0050952'",
  }
]

const abide2 = JSON.parse(JSON.stringify(cpac.data_settings.template))
const abide2Version = Object.keys(abide2.versions)[0]
abide2.id = 'abide2'
abide2.name = 'ABIDE II'
abide2.versions[abide2Version].configuration.options.base = 's3://fcp-indi/data/Projects/ABIDE/RawDataBIDS'
abide2.views = [
  {
    id: 'default',
    name: 'All',
    query: 'true',
  }
]

export const datasets = [
  abide,
  abide2,
]