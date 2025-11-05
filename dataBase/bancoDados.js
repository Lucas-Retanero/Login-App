// import * as SQLite from 'expo-sqlite';

// let banco;

// export async function conectarBanco() {
//     if(!banco) {
//         banco = await SQLite.openDatabaseAsync('usuarios.db');
//         await banco.execAsync(`PRAGMA journal_mode = WAL`);
//     }
//     return banco;
// }

// export async function criarTabela() {
//     const db = await conectarBanco();
//     await db.execAsync(`
//         CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, senha TEXT NOT NULL);
//         `);
    
// }