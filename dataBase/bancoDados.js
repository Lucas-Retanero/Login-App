import * as SQLite from 'expo-sqlite';

let db;

export async function conectarBanco() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('usuarios.db');
    await db.execAsync('PRAGMA journal_mode = WAL');
  }
  return db;
}

export async function criarTabelaUsuarios() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL
    );
  `);
}

export async function inserirUsuario(email, senha) {
  const db = await conectarBanco();
  await db.runAsync(
    'INSERT INTO usuarios (email, senha) VALUES (?, ?);',
    email,
    senha
  );
}
export async function buscarUsuarioPorEmail(email) {
  const db = await conectarBanco();
  const rows = await db.getAllAsync(
    'SELECT * FROM usuarios WHERE email = ?;',
    email
  );

  if (rows && rows.length > 0) {
    return rows[0];
  }
  return null;
}

export async function autenticarUsuario(email, senha) {
  const db = await conectarBanco();
  const rows = await db.getAllAsync(
    'SELECT * FROM usuarios WHERE email = ? AND senha = ?;',
    email,
    senha
  );

  if (rows && rows.length > 0) {
    return rows[0];
  }
  return null;
}

export async function atualizarSenhaPorEmail(email, novaSenha) {
  const db = await conectarBanco();
  const result = await db.runAsync(
    'UPDATE usuarios SET senha = ? WHERE email = ?;',
    novaSenha,
    email
  );

  return result?.changes ?? 0;
}

export async function criarTabelaTarefas() {
  const db = await conectarBanco();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL
    );
  `);
}

export async function inserirTarefa(descricao) {
  const db = await conectarBanco();
  const result = await db.runAsync(
    'INSERT INTO tarefas (descricao) VALUES (?);',
    descricao
  );
  return result.lastInsertRowId;
}

export async function listarTarefas() {
  const db = await conectarBanco();
  const rows = await db.getAllAsync(`SELECT * FROM tarefas;`);
  return rows;
}

export async function removerTarefaDB(id) {
  const db = await conectarBanco();
  await db.runAsync('DELETE FROM tarefas WHERE id = ?;', id);
}