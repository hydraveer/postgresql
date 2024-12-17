import pg from "pg";
const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://root:root@localhost:5432/test',
});

client.connect()
.then(()=>{
    console.log("database is connected");
})
async function createUser(){
    const res = await client.query(`
        CREATE TABLE usertest (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL
            );
        `)
    console.log(res);
    client.end();
}
// createUser()
async function addData(username:string, password:string,email:string){
    const insertQuery = "INSERT INTO usertest (username, password, email)VALUES ($1, $2, $3)"
    const value = [username,password,email]
    const res = await client.query(insertQuery,value)
    console.log(res);
    client.end()
}
// addData("test","test","test@1")
async function getUser(email:string){
    const getQuery = "SELECT * FROM usertest WHERE email = $1"
    const value = [email]
    const res = await client.query(getQuery,value)
    if(res.rows.length>0){
        console.log(res.rows[0]);
    }else{
        console.log("user is not there in database");
    }
    client.end()
}

// getUser("test@1")
interface UpdateUser{
    username:string,
    password:string
}
async function updateUser({username,password}:UpdateUser){
    const updateQuery = "UPDATE usertest SET password = $2 WHERE username = $1"
    const value = [username, password]
    const res = await client.query(updateQuery,value)
    console.log(res);
    client.end()
}
// updateUser({
//     username:"test",
//     password:"test2"
// })
async function deleteUser({username,password}:UpdateUser){
    const deleteQuery = "DELETE FROM usertest WHERE username = $1 AND password = $2"
    const value = [username,password]
    const res = await client.query(deleteQuery,value)
    console.log(res);
    client.end()
}
// deleteUser({
//     username:"test",
//     password:"test2"
// })