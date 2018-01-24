
const { send } = require('micro');
const url = require('url');

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ visits: 0 }).write();

module.exports = function (request, response){
  let visits;
  db.update('visits', (n) => { 
    visits = n; 
    return n + 1 
  }).write();
  send(response, 200, `This page has ${visits} visits!`);
}
