const mysql = require("../mysql_connection/connection");

class UserModel {
    createMultipleEmployeesDb(employees) {
        return new Promise((resolve, reject) => {
            let query = `INSERT INTO employees(email,password,name,phone_no,address) VALUES ?  `;
            mysql().query(query, [employees], (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    getAllEmployees() {
        return new Promise((resolve, reject) => {
            let query = `SELECT email, name, phone_no, address from employees;`;
            mysql().query(query, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    searchEmployees(searchText) {
        return new Promise((resolve, reject) => {
            let query = `SELECT email, name, phone_no, address from employees WHERE email LIKE "%${searchText}%" or name LIKE "%${searchText}%";`;
            mysql().query(query, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    getEmployeesSorted() {
        return new Promise((resolve, reject) => {
            let query = `SELECT email, name, phone_no, address from employees ORDER BY name;`;
            mysql().query(query, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    getEmployeesBypageNo({ offset, limit }) {
        return new Promise((resolve, reject) => {
            let query = `SELECT email, name, phone_no, address from employees LIMIT ${offset}, ${limit};`;
            mysql().query(query, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    getEmployeeByEmail(email) {
        return new Promise((resolve, reject) => {
            let query = `SELECT id, email, password, name from employees WHERE email = "${email}";`;
            mysql().query(query, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
            });
        });
    }

    updateEmployee({ id, email, name, address, phone, password }) {
        return new Promise((resolve, reject) => {
            let updateStr = ``;
            if (email) {
                updateStr += updateStr ? `, email = '${email}'` : `SET email = '${email}'`;
            }

            if (name) {
                updateStr += updateStr ? `, name = '${name}'` : `SET name = '${name}'`;
            }

            if (address) {
                updateStr += updateStr ? `, address = '${address}'` : `SET address = '${address}'`;
            }

            if (phone) {
                updateStr += updateStr ? ` , phone_no = '${phone}'` : `SET phone_no = '${phone}'`;
            }

            if (password) {
                updateStr += updateStr ? ` , password = '${password}'` : `SET password = '${password}'`;
            }

            const query = `UPDATE employees ${updateStr} WHERE id = ${id};`
            
            mysql().query(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }
}

module.exports = new UserModel;