const request = require("request-promise");
const download = require('image-downloader');
const chalk = require('chalk');
const fs = require('fs');
var xmlbuild = require("./xmlbuilder.js");
var list =
[
    '1736-real-madrid',     '1708-fc-barcelona',
    '1687-atletico-madrid', '1759-sevilla',
    '1777-villarreal',      '1775-valencia',
    '1742-real-sociedad',   '1664-athletic-bilbao',
    '1733-real-betis',      '1725-espanyol',
    '1724-celta-de-vigo',   '1710-getafe',
    '1685-osasuna',         '1661-almeria',
    '1729-rayo-vallecano',  '1707-elche-cf',
    '1682-cadiz',           '1747-real-valladolid',
    '1726-mallorca',        '814089-girona'
  ]

var x = "La Liga"
var y = 0
var path = "facepack"
startProcess(x, y)

async function fetchClub(id){
    var res = await request(`https://fminside.net/clubs/3-fm-23/${id}`, {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "cookie": "PHPSESSID=9isfhqbqrba4qivdj8s0ek2ljf; fingerprint=cddb19fb0c283f0f5b358780b106caf9; CookieControl={\"necessaryCookies\":[],\"optionalCookies\":{},\"statement\":{},\"consentDate\":1671518634080,\"consentExpiry\":90,\"interactedWith\":true,\"user\":\"E8CE0238-5286-463C-9FEF-4AFA267177DF\"}; __cf_bm=yMFVCrEod8JxnShzKf1aT1moxUO3ijrgovjADoGXW2c-1671608101-0-ATvaMwVlZ7L2L75RZfnvW50ivqRgmRs2R55I3yo/zTnGB4C+9lg6WYtIiiZsdysxKpxNwjDXnxyoTuBmm7zBSiegEcPlBwov3p1bxaR6MUhLpzJyZPOAa71ky/cw5IBPiLhJ8l/gG+RYk4j967k2Ztk=; _ga_LKXLC782E6=GS1.1.1671608180.1.0.1671608180.0.0.0; _ga=GA1.2.43836936.1671608180; _gid=GA1.2.815579910.1671608180; _gat_gtag_UA_57891313_1=1"
    },
    "body": null,
    "method": "GET"
    })

    return res
}

function downloadImage(url, filepath){
    return download.image({
        url,
        dest: filepath 
    });
}

async function startProcess(x, y){
    var team = list[y].split("-").slice(1).join("-")

    if (!fs.existsSync(`./${path}`)) fs.mkdirSync(`./${path}`)
    if (!fs.existsSync(`./${path}/${x}`)) fs.mkdirSync(`./${path}/${x}`)
    if (!fs.existsSync(`./${path}/${x}/${team}`)) fs.mkdirSync(`./${path}/${x}/${team}`)

    var body = await fetchClub(list[y])
    var parsed = body.split("<h2>Full Squad</h2>").pop().split("\n")
    var arr = parsed.filter(p=>p.includes("background-image: url(//img.fminside.net")).map(p=>p.split("url(//").pop().split(".png)")[0]).filter(p=>!p.includes("default"))
    for (i = 0; i < arr.length; i++){
        var url = `https://img.fminside.net/facesfm23/` + arr[i].split("/").pop() + ".png"
        await downloadImage(url, `${__dirname}/${path}/${x}/${team}`).catch((err) => {console.log(chalk.red(`Invalid face URL - ${url}`))})
    }
    var fileList = fs.readdirSync(`${__dirname}/${path}/${x}/${team}`).filter(p=>p.includes(".png")).map(f=>f.replace(".png", ""))
    xmlbuild.build(fileList, x, team, path)
    y += 1
    if (!list[y]) return console.log(chalk.green("Finished uploading files"))
    startProcess(x, y)
}