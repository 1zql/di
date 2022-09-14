const express = require('express');
const app = express();

app.use('/', (req, res) => {
  res.send('Hello');
});
require('events').EventEmitter.defaultMaxListeners = 30;
app.listen(3000, () => {
  console.log('server started');
});
const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const fs = require('fs');
require('discord-reply');


client.on("ready", () => {
  console.log(`(${client.user.username}) Is Online Now :)`);
  client.user.setActivity("Cut,", {
    type: "STREAMING",
    url: "https://www.twitch.tv/."
  });
});

process.on("unhandledRejection", error => {
  return console.log(error)
});

client.on('message', async (message) => {
    if(message.author.bot) return
    if(!message.guild) return
    if(message.channel.id === "1019602744765579284") {
      let args = message.content.split('').join('')
     const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .addField(`اسرع من يكتب`, args.split(' ').join(" , "), true)
    .setColor(`#2f3136`)
    .setThumbnail(message.guild.iconURL())
    .setFooter(message.author.username, message.author.avatarURL())
    .setTimestamp()
    let channel = client.channels.cache.get('1019602477038972981')
    channel.send(`||@here|| **|** By ${message.author}`, embed)
      db.set(`text`, args)
}
});

var point = require("./point.json");
function save() {
    fs.writeFileSync("./point.json", JSON.stringify(point, null, 4));
}

var dev = "712622097372807168"
var owner = "578801474927067137"
/*
client.on('message', message => {
    let data = db.get(`text`)
if(message.channel.id === "1019602477038972981") {
let po = message.content.split('').join('')
if(po.includes(data)) {
db.delete(`text`)
    if (!point[message.guild.id]) point[message.guild.id] = {};
    if (!point[message.guild.id][message.author.id]) point[message.guild.id][message.author.id] = {
    "point": 0,
    "id": `${message.author.id}`
    }
    point[message.guild.id][message.author.id].point += +1;
    save();
            message.lineReply(`كفو عليك.`)
            var topArray = Object.values(point[message.guild.id]);
      var num = 1;
  var sorted = Object.entries(point[message.guild.id]) 
    .map(v => [v[0], v[0].point])
    .sort((a, b) => b[0] - a[0])
      sorted.length = 5
      var top = `${topArray.sort((a, b) => b.point - a.point).slice(0, 5).map(function (user) {
                if (user.point > 0) {
                    return `${num++} - <@!${user.id}>: **\`${user.point}\`**`}
            }).join("\n")}`;
    const embed = new Discord.MessageEmbed()
       .setDescription(`> **Top 5 Point**
${top}`)
    message.channel.send(embed)
}
}
});
*/
client.on('message', message => {
    if(message.author.bot) return
    if(!message.guild) return
    if(message.channel.id === "1019602477038972981") {
    let args = message.content.split('').join('')
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .addField(`Cut Tweet`, args, true)
    .setColor(`#2f3136`)
    .setThumbnail(message.guild.iconURL())
    .setFooter(message.author.username, message.author.avatarURL())
    .setTimestamp()
    let channel = client.channels.cache.get('1019602502930407434')
    channel.send(`||@here|| **|** By ${message.author}`, embed)
  }
});

client.on('message', msg => {
  if (msg.content === "up") {
    if(msg.author.id !== dev) return
    let d = Math.floor(client.uptime / 86400000);
    let h = Math.floor(client.uptime / 3600000) % 24;
    let m = Math.floor(client.uptime / 60000) % 60;
    let s = Math.floor(client.uptime / 1000) % 60;
    msg.channel.send(`${s}s, ${m}m, ${h}h, ${d}d`)
  }
});

client.on('message', async (message) => {
let command = message.content.toLowerCase().split(" ")[0];
  if (command == `p`) {
    if(message.author.id !== dev) return
var states = "🟢 ممتاز جداً";
            var states2 = "🟢 ممتاز جداً";
            var msg = `${Date.now() - message.createdTimestamp}`;
            var api = `${Math.round(client.ws.ping)}`;
            if (Number(msg) > 70) states = "🟢 ممتاز";
            if (Number(msg) > 170) states = "🟡 ليس سيء";
            if (Number(msg) > 350) states = "🔴 سيء جداً";
            
            if (Number(api) > 70) states2 = "🟢 ممتاز";
            if (Number(api) > 170) states2 = "🟡 ليس سيء";
            if (Number(api) > 350) states2 = "🔴 سيء جداً";
            let embed = new Discord.MessageEmbed()
                .setAuthor(`وقت استجابة البوت 🏓`)
                .addField("**Time Taken:**", msg + " ms 📶 | " + states)
                .addField("**WebSocket:**", api + " ms 📶 | " + states2)
                .setTimestamp()
      .setColor('#303434')
            message.lineReplyNoMention(embed);
}
});

client.login(process.env.token);