// ---------- CONFIG ----------

const PERSISTENCE = true;
const SAVE_INTERVAL = 10000;

// ---------- STATS ----------

let stats = {
  health: 100,
  hunger: 100,
  boredom: 100
};

const decay = {
  hunger: 2,
  boredom: 3
};

// ---------- UTILS ----------

function clamp(v){
  return Math.max(0, Math.min(100,v));
}

// ---------- TICK ----------

function tick(){

  stats.hunger = clamp(stats.hunger - decay.hunger);
  stats.boredom = clamp(stats.boredom - decay.boredom);

  if(stats.hunger < 30) stats.health -= 1;
  if(stats.boredom < 20) stats.health -= 1;

  stats.health = clamp(stats.health);

  updateUI();
}

// ---------- STATE ----------

function getState(){

  if(stats.health <= 0) return "dead";
  if(stats.health < 25) return "sick";
  if(stats.hunger < 30) return "hungry";
  if(stats.boredom < 30) return "bored";

  if(
    stats.health > 80 &&
    stats.hunger > 80 &&
    stats.boredom > 80
  ) return "happy";

  return "idle";
}

// ---------- UI ----------

function updateUI(){

  document.getElementById("health").style.width =
    stats.health + "%";

  document.getElementById("hunger").style.width =
    stats.hunger + "%";

  document.getElementById("boredom").style.width =
    stats.boredom + "%";

  document.getElementById("pet").src =
    "sprites/" + getState() + ".png";
}

// ---------- COMMANDS (GLOBAL) ----------

function feed(amount=25){
  stats.hunger = clamp(stats.hunger + amount);
  updateUI();
}

function play(amount=30){
  stats.boredom = clamp(stats.boredom + amount);
  updateUI();
}

function heal(amount=20){
  stats.health = clamp(stats.health + amount);
  updateUI();
}

// ---------- PERSISTENCE ----------

function save(){
  if(!PERSISTENCE) return;
  localStorage.setItem("petStats", JSON.stringify(stats));
}

function load(){
  if(!PERSISTENCE) return;
  const data = localStorage.getItem("petStats");
  if(data) stats = JSON.parse(data);
}

// ---------- INIT ----------

load();
updateUI();

setInterval(tick, 5000);
setInterval(save, SAVE_INTERVAL);
