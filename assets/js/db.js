// var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024)

// function createTable() {
//     db.transaction(function (tx) {

//         tx.executeSql('CREATE TABLE IF NOT EXISTS PLAYERS (id , player TEXT, result INTEGER, start_time, end_time)')
//     })
// }

// function encrypt(r) {
//     var t = "";
//     for (i = 0; i < r.length; i++) i < r.length - 1 ? (t += r.charCodeAt(i) + 10, t += "-") : t += r.charCodeAt(i) + 10;
//     return t
// }
// const shuffle = r => r.sort((r, t) => .5 - Math.random());

// function decrypt(r) {
//     var t = "",
//         n = r.split("-");
//     for (i = 0; i < n.length; i++) t += String.fromCharCode(n[i] - 10);
//     return t
// }

// createTable()

// const add = {
//     user: {
//         name: NewUserName,
//         result: newUserResult,
//     }
// }


// function NewUserName(id, name) {
//     db.transaction(function (tx) {
//         tx.executeSql(`INSERT INTO PLAYERS (id,player, start_time) VALUES('${id}', '${name}', '${new Date()}')`)
//     })
// }

// function newUserResult(player, result, _len) {
//     db.transaction(function (tx) {
//         tx.executeSql(`INSERT INTO PLAYERS (player, result, end_time) VALUES ('${player}', ${result}.${_len}, '${new Date()}')`)
//     })
// }

// // function getAll() {
// //     db.transaction(function (tx) {
// //         tx.executeSql(`SELECT * FROM PLAYERS`, [], function (tx, results) {
// //             console.log(results);
// //         })
// //     });
// // }