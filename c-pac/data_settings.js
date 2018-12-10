
import S3 from 'aws-sdk/clients/s3'

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
      out.push(...Contents.map(o => ({ file: "s3://" + bucket + "/" + o.Key, size: o.Size })))
      !IsTruncated ?
        resolve(out) :
        resolve(listObjects(path, { ContinuationToken: NextContinuationToken }, out))
    })
    .catch(reject)
})

export const listFiles = async (path) => {
  if (path.indexOf('s3://') !== 0) {
    reject("Invalid URL")
  }

  return listObjects(path, { MaxKeys: 100 })
}
