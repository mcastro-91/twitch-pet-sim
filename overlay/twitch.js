const client = new tmi.Client({
  connection: { secure: true, reconnect: true },
  channels: [ "CANAL_TWITCH" ]
});

client.connect();

client.on("message", (channel, tags, message) => {

  const msg = message.toLowerCase();

  if(msg === "!feed"){
    feed(25);
  }

  if(msg === "!play"){
    play(30);
  }

  if(msg === "!heal"){
    heal(20);
  }

  if(msg === "!sleep"){
    heal(10);
    stats.boredom += 10;
  }

});
