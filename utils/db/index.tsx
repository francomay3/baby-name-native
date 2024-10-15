import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

// prettier-ignore
export const namesSource = [
  "Adriana","Alejandra","Alicia","Ana","Andrea","Ángela","Antonia","Aurora","Beatriz","Blanca",
  "Camila","Carmen","Carolina","Catalina","Cecilia","Claudia","Consuelo","Cristina","Daniela",
  "Diana","Dolores","Elena","Elisa","Emilia","Esperanza","Estefanía","Fernanda","Francisca",
  "Gabriela","Gloria","Inés","Irene","Isabella","Josefina","Juana","Julia","Laura","Lorena",
  "Lucía","Luisa","Magdalena","María","Mariana","Marta","Martina","Mercedes","Mónica","Natalia",
  "Nora","Patricia","Paula","Pilar","Raquel","Renata","Rocío","Rosa","Rosario","Silvia","Sofia",
  "Susana","Teresa","Valentina","Valeria","Verónica","Victoria"
];

// prettier-ignore
export const titles = [
  "Battle of the beauties!","Battle of the century!","Battle of the charmers!","Beauty contest time!",
  "Choose your adventure companion!","Choose your champion!","Choose your dream date!","Choose your leading lady!",
  "Choose your muse!","Choose your sidekick!","Clash of the cuties!","Duel of the divas!",
  "Pick your confidante!","Pick your favorite!","Pick your partner for a dance!","Pick your partner in crime!",
  "Pick your perfect match!","The charisma face-off!","The elegance encounter!","The enchantress challenge!",
  "The face-off begins!","The glamour showdown!","The grace and poise contest!","The magnetism match-up!",
  "The name game showdown!","The ultimate showdown!","This is a difficult one.","Time to play favorites!",
  "Tough decision ahead!","Which one is sexier?","Who will win?","Who would you swipe right?",
  "Who's got that je ne sais quoi?","Who's got that star quality?","Who's got the most infectious laugh?",
  "Who's got the winning personality?","Who's got the X-factor?","Who's more swoon-worthy?","Who's the fairest of them all?",
  "Who's the heartbreaker?","Who's the life of the party?","Who's the queen of hearts?","Who's your type?",
  "Whose allure is stronger?","Whose aura captivates you?","Whose charm is irresistible?","Whose eyes mesmerize you?",
  "Whose presence commands attention?","Whose smile lights up the room?","Whose style stands out?",
];

const resetDB = async () => {
  if (Platform.OS === "web") {
    console.error("SQLite is not supported on web");
    return;
  }

  try {
    await SQLite.deleteDatabaseAsync("baby-name-db");
  } catch (error) {
    console.warn(`Error deleting database: ${error}`);
  }
  const db = await SQLite.openDatabaseAsync("baby-name-db");

  await db.execAsync(`
  CREATE TABLE IF NOT EXISTS names (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    score INTEGER DEFAULT 1000,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    winningNameId INTEGER NOT NULL,
    losingNameId INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `);

  const usernames = [
    "Franco May",
    "Natasha Aluffi",
    "Panchita May",
    "Carlos Mantero",
    "Riyanka Bakshi",
    "Saptarshi Bakshi",
  ];
  const combinedQuery = usernames.reduce(
    (acc, username) =>
      acc + `INSERT INTO users (username) VALUES ('${username}');`,
    ""
  );
  await db.execAsync(combinedQuery);

  const createNameQuery = namesSource.reduce(
    (acc, name) => acc + `INSERT INTO names (name) VALUES ('${name}');`,
    ""
  );
  await db.execAsync(createNameQuery);

  const createVote = await db.prepareAsync(
    "INSERT INTO votes (userId, winningNameId, losingNameId) VALUES (?, ?, ?)"
  );
  await createVote.executeAsync(1, 1, 2);
  await createVote.executeAsync(2, 3, 4);

  // example queries
  // const users = await db.getAllAsync("SELECT * FROM users");
  // const names = await db.getAllAsync("SELECT * FROM names");
  // const votes = await db.getAllAsync("SELECT * FROM votes");

  // const userVotes = await db.getAllAsync(
  //   "SELECT * FROM votes WHERE userId = 1"
  // );
};

const getUsers = async () => {
  const db = await SQLite.openDatabaseAsync("baby-name-db");
  const users = await db.getAllAsync("SELECT * FROM users");
  return users;
};

const getNames = async () => {
  const db = await SQLite.openDatabaseAsync("baby-name-db");
  const names = await db.getAllAsync("SELECT * FROM names");
  return names;
};

const getVotes = async () => {
  const db = await SQLite.openDatabaseAsync("baby-name-db");
  const votes = await db.getAllAsync("SELECT * FROM votes");
  return votes;
};

const getUserVotes = async (userId: number) => {
  const db = await SQLite.openDatabaseAsync("baby-name-db");
  const userVotes = await db.getAllAsync(
    "SELECT * FROM votes WHERE userId = ?",
    [userId]
  );
  return userVotes;
};

export { resetDB, getUsers, getNames, getVotes, getUserVotes };
