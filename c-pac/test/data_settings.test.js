import fs from 'fs'
import assert from 'assert'
import yaml from 'yaml'

import { fullTest } from 'bids-validator/validators/bids'

import { data_settings } from '..'

describe('load data settings', async () => {
  it('should list BIDS dir', async () => {
    const testFolder = 's3://fcp-indi/data/Projects/ADHD200/RawDataBIDS/WashU'
    const testFile = testFolder + '/sub-0015026/ses-3/func/sub-0015026_ses-3_task-reststudy3_run-3_bold.nii.gz'

    const files = (await data_settings.listFiles(testFolder)).map((f) => ({ ...f, rel: f.file.replace(testFolder, '')}))
    assert(files.length == 237)
    assert(files.find((file) => file.file === testFile) !== undefined)

    data_settings.buildDataConfig({ dataFormat: "BIDS" }, files)
  }).timeout(10000)
})
