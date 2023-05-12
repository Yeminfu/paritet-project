import mysql from 'mysql2';

export const connection = mysql.createConnection({
  user: 'admin',
  password: 'xKF2eA',
  database: 'testdb'
});
