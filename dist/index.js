var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pg from "pg";
const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://root:root@localhost:5432/test',
});
client.connect()
    .then(() => {
    console.log("database is connected");
});
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield client.query(`
        CREATE TABLE usertest (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            );
        `);
        console.log(res);
        client.end();
    });
}
// createUser()
function addData(username, password, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = "INSERT INTO usertest (username, password, email)VALUES ($1, $2, $3)";
        const value = [username, password, email];
        const res = yield client.query(insertQuery, value);
        console.log(res);
        client.end();
    });
}
// addData("test","test","test@1")
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const getQuery = "SELECT * FROM usertest WHERE email = $1";
        const value = [email];
        const res = yield client.query(getQuery, value);
        if (res.rows.length > 0) {
            console.log(res.rows[0]);
        }
        else {
            console.log("user is not there in database");
        }
        client.end();
    });
}
getUser("test@1");
function updateUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password }) {
        const updateQuery = "UPDATE usertest SET password = $2 WHERE username = $1";
        const value = [username, password];
        const res = yield client.query(updateQuery, value);
        console.log(res);
        client.end();
    });
}
// updateUser({
//     username:"test",
//     password:"test2"
// })
function deleteUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password }) {
        const deleteQuery = "DELETE FROM usertest WHERE username = $1 AND password = $2";
        const value = [username, password];
        const res = yield client.query(deleteQuery, value);
        console.log(res);
        client.end();
    });
}
// deleteUser({
//     username:"test",
//     password:"test2"
// })
