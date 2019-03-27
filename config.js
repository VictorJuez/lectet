const Pool = require('pg').Pool
const pool = module.exports =  new Pool({
  user: 'pfguwsqduqkxxv',
  host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com',
  database: 'degpai9eklcvs5',
  password: 'ffbab27c92e5005956bf45d8883ea39428b2c3722f63d5607faeb493bdb88ae9',
  port: 5432,
  ssl: true,
})