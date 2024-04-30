const connection = require("../config/database.js");

class Model_pengguna {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pengguna ORDER BY id_pengguna DESC",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async Store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO pengguna SET ?", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async login(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pengguna WHERE email = ?",
        email,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pengguna WHERE id_pengguna = ?",
        id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async Update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE pengguna SET ? WHERE id_pengguna = ?",
        [data, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async Delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM pengguna WHERE id_pengguna = ?",
        id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = Model_pengguna;
