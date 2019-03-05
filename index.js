const puppeteer = require("puppeteer");
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let signs = [
  "taurus",
  "scorpio",
  "aries",
  "capricorn",
  "gemini",
  "leo",
  "cancer",
  "virgo",
  "libra",
  "sagittarius",
  "aquarius",
  "pisces"
];

client.on("message", async msg => {
  let sign = msg.content.split(" ")[1];
  if (msg.content.startsWith(`${prefix}h`) && signs.includes(sign)) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.astrology.com/horoscope/daily/${sign}.html`);
    let data = await page.$(".main-content > p:nth-child(3)");
    let text = await page.evaluate(t => t.textContent, data);
    msg.channel.send(text);
    browser.close();
  }
});

client.login(process.env.BOT_TOKEN);
