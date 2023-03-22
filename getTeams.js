const request = require("request-promise");

async function fetchID(){
    var body = await request("https://fminside.net/clubs", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "cookie": "fingerprint=eb825fed26068e667c389a02fed30c0d; PHPSESSID=11cr76lv0dd39aj3bbbrq4fgvo; CookieControl={\"necessaryCookies\":[],\"optionalCookies\":{},\"statement\":{},\"consentDate\":1679517716261,\"consentExpiry\":90,\"interactedWith\":true,\"user\":\"E6193FF4-F769-4A57-9C1B-04A57B31810B\"}; __cf_bm=64vwS9IJhaIJleCWpsD1yD37n5AoDy7lfLNKD_axQZo-1679517716-0-AZXCIafa1HZLshVI7FfVCtioKCWsmJQ9hlPybGhI+wn9A/YqIszkRlu9zsM5E2b96Vzaj4Ge6NlPHpnyolqcQlp+nOFvp2oOinhU4uqc84UkT+yWitOPWw8s/TWp52K/GA==; _ga_LKXLC782E6=GS1.1.1679517754.1.0.1679517754.0.0.0; _ga=GA1.2.8718200.1679517755; _gid=GA1.2.1066191245.1679517755; _gat_gtag_UA_57891313_1=1"
        },
        "body": null,
        "method": "GET"
      });

    var parsed = body.split("\n")
    var arr = parsed.filter(p=>p.includes('href="/clubs/3-fm-23/')).map(p=>p.split('href="/clubs/3-fm-23/').pop().split('"')[0])

    return arr
}

(async () => { 
    var teamsID = await fetchID()
    console.log(teamsID)
})()