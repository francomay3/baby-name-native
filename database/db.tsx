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

export type Name = {
  id: number;
  name: string;
  score: number;
};

type User = {
  id: string;
  createdAt: Date;
};

type Vote = {
  id: number; // id should be comprised of userId-competitor1Id-competitor2Id where competitor1Id < competitor2Id
  userId: number;
  winningNameId: number;
  losingNameId: number;
  createdAt: Date;
};

export const names: Name[] = namesSource.map((name, index) => ({
  id: index + 1,
  name,
  score: 1000,
}));

export const faces = [
  require("@/assets/images/faces/1.png"),
  require("@/assets/images/faces/2.png"),
  require("@/assets/images/faces/3.png"),
  require("@/assets/images/faces/4.png"),
  require("@/assets/images/faces/5.png"),
  require("@/assets/images/faces/6.png"),
  require("@/assets/images/faces/7.png"),
  require("@/assets/images/faces/8.png"),
  require("@/assets/images/faces/9.png"),
  require("@/assets/images/faces/10.png"),
  require("@/assets/images/faces/11.png"),
  require("@/assets/images/faces/12.png"),
  require("@/assets/images/faces/13.png"),
  require("@/assets/images/faces/14.png"),
  require("@/assets/images/faces/15.png"),
  require("@/assets/images/faces/16.png"),
  require("@/assets/images/faces/17.png"),
  require("@/assets/images/faces/18.png"),
  require("@/assets/images/faces/19.png"),
  require("@/assets/images/faces/20.png"),
  require("@/assets/images/faces/21.png"),
  require("@/assets/images/faces/22.png"),
  require("@/assets/images/faces/23.png"),
  require("@/assets/images/faces/24.png"),
  require("@/assets/images/faces/25.png"),
  require("@/assets/images/faces/26.png"),
  require("@/assets/images/faces/27.png"),
  require("@/assets/images/faces/28.png"),
];
