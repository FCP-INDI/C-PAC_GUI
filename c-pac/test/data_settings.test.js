import fs from 'fs'
import assert from 'assert'

import { data_settings } from '..'
const { parse, dump, template } = data_settings

describe('managing data settings', async () => {
  it('should list BIDS dir', async () => {
    const testFolder = 's3://fcp-indi/data/Projects/ADHD200/RawDataBIDS/WashU'
    const testFile = testFolder + '/sub-0015026/ses-3/func/sub-0015026_ses-3_task-reststudy3_run-3_bold.nii.gz'

    const files = (await data_settings.listFiles(testFolder)).map((f) => ({ ...f, rel: f.file.replace(testFolder, '')}))
    assert(files.length == 237)
    assert(files.find((file) => file.file === testFile) !== undefined)
  }).timeout(10000)

  it('should build subject list', async () => {
    const t = JSON.parse(JSON.stringify(template))
    t.versions['default'].configuration.format = 'BIDS'
    t.versions['default'].configuration.base = 's3://fcp-indi/data/Projects/ADHD200/RawDataBIDS/WashU'
    const data_config = await data_settings.build(t, 'default')

    assert(data_config.length === 58)
  }).timeout(10000)

  it('should parse the YAML file', () => {
    const contents = fs.readFileSync('./resources/data_settings/data_settings_template.yml', 'utf8');
    const data_settings = parse(contents)
    const config = data_settings.versions[Object.keys(data_settings.versions)[0]].configuration

    assert(config.format === 'BIDS')
    assert(config.base === '')
  })

  it('should dump the YAML file', () => {
    const contents = fs.readFileSync('./resources/data_settings/data_settings_template.yml', 'utf8');
    const data_settings = parse(contents)
    const yamlSettings = dump(data_settings, Object.keys(data_settings.versions)[0])
    const data_settings2 = parse(yamlSettings)
    const config = data_settings2.versions[Object.keys(data_settings2.versions)[0]].configuration

    assert(config.format === 'BIDS')
    assert(config.base === '')
  })
})
