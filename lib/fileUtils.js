const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')

exports.isDirectory = function isDirectory (p) {
  return (fs.existsSync(p) && fs.lstatSync(p).isDirectory())
}

exports.isAbsolute = function isAbsolute(p) {
  return path.resolve(p) === path.normalize(p)
}

exports.copySync = function copySync(src, dest) {
  const dir = _dir(dest)
  fse.ensureDirSync(dir)
  fse.copySync(src, dest)
}

exports.writeFileSync = function writeSync(dest, buf) {
  let dir = _dir(dest)
  fse.ensureDirSync(dir)
  fs.writeFileSync(dest, buf)
}

function _dir(p) {
  if (p[p.length-1] === '/') return p
  else return path.dirname(p)
}
