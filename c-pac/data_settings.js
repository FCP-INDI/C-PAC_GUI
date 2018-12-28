import yaml from 'yaml'
import S3 from 'aws-sdk/clients/s3'

import template from './resources/data_settings/config'
import yamlTemplate from './resources/data_settings/yaml'

export { template }

const s3 = new S3({})

const listObjects = (path, params = {}, out = []) => new Promise((resolve, reject) => {
  const pieces = path.substr(5).split('/')
  const bucket = pieces[0]
  const prefix = pieces.slice(1).join('/')

  const pagingParams = {
    Bucket: bucket,
    Prefix: prefix,
    ...params,
  }

  s3.listObjectsV2(pagingParams).promise()
    .then(({Contents, IsTruncated, NextContinuationToken}) => {
      out.push(...Contents.map(o => ({ file: 's3://' + bucket + '/' + o.Key, size: o.Size })))
      !IsTruncated ?
        resolve(out) :
        resolve(listObjects(path, { ContinuationToken: NextContinuationToken }, out))
    })
    .catch(reject)
})

export const listFiles = async (path) => {

  let files = []
  if (path.indexOf('s3://') > -1) {
    files = await listObjects(path, { MaxKeys: 100 })
  }

  // TODO list from local

  return files.map((f) => ({
    ...f,
    rel: f.file.replace(path, '')
  }))
}

export function parse(content) {
  const settings = yaml.parse(content)

  const t = JSON.parse(JSON.stringify(template))
  const newver = `${new Date().getTime()}`
  t.versions[newver] = t.versions['default']
  delete t.versions['default']
  const c = t.versions[newver].configuration

  t.name = (settings.subjectListName || '').trim()

  if (typeof settings.dataFormat === 'string') {
    settings.dataFormat = [settings.dataFormat]
  }

  if (!settings.dataFormat.includes('BIDS')) {
    throw new Error('Only BIDS format is supported.')
  }

  c.format = 'BIDS'
  c.base = (settings.bidsBaseDir || '').replace(/\/$/, '')

  return t
}

export function dump(data_settings, version='0') {

  const c = data_settings.versions[version].configuration

  const config = {}

  config.dataFormat = ['BIDS']
  config.bidsBaseDir = c.base.replace(/\/$/, '')
  config.outputSubjectListLocation = ''
  config.subjectListName = data_settings.name

  // Generate valid YAML syntax
  const configYamled = {}
  for (let k of Object.keys(config)) {
    configYamled[k] = yaml.stringify({ [k]: config[k] })
  }

  return yamlTemplate(configYamled)
}

export const build = async (settings, version='0') => {

  const config = settings.versions[version].configuration

  if (config.format.toLowerCase() === 'bids') {

    const files = await listFiles(config.base)

    const anat = '^\\/(sub-[a-zA-Z0-9]+)\\/(?:(ses-[a-zA-Z0-9]+)\\/)?anat\\/\\1(?:_\\2)?(?:_(acq-[a-zA-Z0-9]+))?(?:_(ce-[a-zA-Z0-9]+))?(?:_(rec-[a-zA-Z0-9]+))?(?:_(run-[0-9]+))?_T1w.nii(?:.gz)?$'
    const anat_info = '^\\/(sub-[a-zA-Z0-9]+)\\/(?:(ses-[a-zA-Z0-9]+)\\/)?anat\\/\\1(?:_\\2)?(?:_(acq-[a-zA-Z0-9]+))?(?:_(ce-[a-zA-Z0-9]+))?(?:_(rec-[a-zA-Z0-9]+))?(?:_(run-[0-9]+))?_T1w.json$'
    const func = '^\\/(sub-[a-zA-Z0-9]+)\\/(?:(ses-[a-zA-Z0-9]+)\\/)?func\\/\\1(?:_\\2)?_(task-[a-zA-Z0-9]+)(?:_(acq-[a-zA-Z0-9]+))?(?:_(rec-[a-zA-Z0-9]+))?(?:_(run-[0-9]+))?(?:_(echo-[0-9]+))?_bold.nii(?:.gz)?$'
    const func_info = '^\\/(sub-[a-zA-Z0-9]+)\\/(?:(ses-[a-zA-Z0-9]+)\\/)?func\\/\\1(?:_\\2)?_(task-[a-zA-Z0-9]+)(?:_(acq-[a-zA-Z0-9]+))?(?:_(rec-[a-zA-Z0-9]+))?(?:_(run-[0-9]+))?(?:_(echo-[0-9]+))?_bold.json?$'

    let structure = {}
    const regexs = { anat, anat_info, func, func_info }
    for (const file of files) {
      for (const r in regexs) {
        const matches = new RegExp(regexs[r]).exec(file.rel)
        if (!matches) {
          continue
        }

        const optionals = matches.slice(3).filter((v) => v).join('_')
        const subject_id = matches[1].replace('sub-', '')
        const unique_id = matches[2] ? matches[2].replace('ses-', '') : ''

        const key = subject_id + (unique_id ? '_' + unique_id : '')

        if (!(key in structure)) {
          structure[key] = {
            subject_id,
            unique_id,
          }
        }

        if (r === 'anat') {
          if (!structure[key].anat) {
            structure[key].anat = file.file
          }
        }
        if (r === 'func') {
          if (!structure[key].func) {
            structure[key].func = {}
          }
          structure[key].func[optionals] = { ...structure[key].func[optionals], scan: file.file }
        }
        if (r === 'func_info') {
          if (!structure[key].func) {
            structure[key].func = {}
          }
          structure[key].func[optionals] = { ...structure[key].func[optionals], scan_parameters: file.file }
        }
      }
    }

    // @TODO check for just anatomical preprocessing
    structure = Object.values(structure).filter(s => s.anat && s.func)
    return structure
  }
}
