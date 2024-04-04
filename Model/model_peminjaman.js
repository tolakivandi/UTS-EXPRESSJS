/*jshint esversion: 11 */
const connection = require("../config/database");

class Model_peminjaman {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM peminjaman JOIN lab ON peminjaman.id_lab = lab.id_lab JOIN pengguna ON peminjaman.id_pengguna = pengguna.id_pengguna ",
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

  static async getAllPeminjaman() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM peminjaman ", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async Store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO peminjaman SET ?", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM peminjaman WHERE id_peminjaman = ?",
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
        "UPDATE peminjaman SET ? WHERE id_peminjaman = ?",
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
        "DELETE FROM peminjaman WHERE id_peminjaman = ?",
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

module.exports = Model_peminjaman;
