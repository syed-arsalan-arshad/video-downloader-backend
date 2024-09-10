const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const ytdl = require("@distube/ytdl-core");
const cookies = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.188705,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000nwgubdHsKKUg_Z1BAjoncvmvudSs3SDSJwUIwYsIflPsoCNhwAzYSvFYdRmo-ld9lUrO_wACgYKAXgSARMSFQHGX2MiWMqeynCafw2mGrReeVAZ8hoVAUF8yKoN_ge_NDw7TnjAeYuEAf0v0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1757503289.019633,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SIDCC",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "AKEyXzVMQTeC-P9KB6dUH2-OJfTi9vDT3zruilfLoS10bFAKcq1iaECAN23MiaUH1Ahyl_-DHA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.188078,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SID",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "g.a000nwgubdHsKKUg_Z1BAjoncvmvudSs3SDSJwUIwYsIflPsoCNhubP_0z_SDUdE4kOT-O1Q8gACgYKAbkSARMSFQHGX2Mi-Sshl3IvkQmjohrwzRBtchoVAUF8yKrLQnhHmMmiWQkioKqG08pZ0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1757503285.330838,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEBUFGoh25UtRYGU3dPKRcnpM8KUZ3cj4yXf8eV1EkOk3ueYSAHUSxL5TpVmuaNh72HEAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.189221,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "70tQsxfR1YXS__0Q/AHc1sqFiVPBc4DEkU"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1757503289.019724,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzVN9DGRBgXXj4LUbv9fWHdAvDneqxEUBIP66JJfhgnm7BdIeGQkYWdOlIBZT4DKoL8j8A"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.189026,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AlEO7E8MdiJ-HY7TO"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1725967290,
        "hostOnly": false,
        "httpOnly": false,
        "name": "ST-uwicob",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "session_logininfo=AFmmF2swRAIgAP5eaAN7_Di6g0gI59Txo6hTAp5_au6NHmP43dZMUngCIBaJXY-gxsGiGZLkWwZiw-AVZ9afetU-URW7aPfFj2_0%3AQUQ3MjNmem56cko0ckM3NjFZemtmNUoweGROVG1qUGNGVk9OWHF1NmRYQnNoVFdONlRKZXpkS0VmRmN5SWFSelBCbHY4eVlHa3F4TnpCLVczbDJJY2RaRUlVZHF2cFc4by1KRnZmUk5xRzE5S2JFdU5BdFgxRTJFVXhGNjVfTW5MbXRGNUVNUnJwcC1XbGx0S0FMUDZ3d2tYVWg4RGlLdWxB"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.189312,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "70tQsxfR1YXS__0Q/AHc1sqFiVPBc4DEkU"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.18857,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000nwgubdHsKKUg_Z1BAjoncvmvudSs3SDSJwUIwYsIflPsoCNhOQ7bMOxklCKkliyZwiKx4QACgYKARcSARMSFQHGX2MieGAHNdXFGVvQSAAaXqKf2RoVAUF8yKqiv4z67aj05ur3ItgYzfdW0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.189379,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "70tQsxfR1YXS__0Q/AHc1sqFiVPBc4DEkU"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1757503289.019762,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzU7xjiNV5DmCmxNF8NTwEdKh7yYYe3jqy-ZcK4RF9qebKsfqnsVxJ-nUjd4T6dTbdjp2w"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1757503285.330931,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEBUFGoh25UtRYGU3dPKRcnpM8KUZ3cj4yXf8eV1EkOk3ueYSAHUSxL5TpVmuaNh72HEAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.189115,
        "hostOnly": false,
        "httpOnly": false,
        "name": "APISID",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "O3MP5LolEnGHy13D/Ay6czRrSYsypiXBaN"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760512866.188802,
        "hostOnly": false,
        "httpOnly": true,
        "name": "HSID",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "Ai7B_1JB4PMm7D7hI"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1758908176.842772,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AFmmF2swRAIgAP5eaAN7_Di6g0gI59Txo6hTAp5_au6NHmP43dZMUngCIBaJXY-gxsGiGZLkWwZiw-AVZ9afetU-URW7aPfFj2_0:QUQ3MjNmem56cko0ckM3NjFZemtmNUoweGROVG1qUGNGVk9OWHF1NmRYQnNoVFdONlRKZXpkS0VmRmN5SWFSelBCbHY4eVlHa3F4TnpCLVczbDJJY2RaRUlVZHF2cFc4by1KRnZmUk5xRzE5S2JFdU5BdFgxRTJFVXhGNjVfTW5MbXRGNUVNUnJwcC1XbGx0S0FMUDZ3d2tYVWg4RGlLdWxB"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1760527288.822896,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "sameSite": null,
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "f4=4000000&f6=40000000&tz=Asia.Calcutta&f7=100"
    }
];
const agent = ytdl.createAgent(cookies);
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
  return res.send("Hello World!");
});
app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send({ "status": 200, "messge": "success" })
});

app.post("/getVideoInfo", async (request, response) => {
  const urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
  const videoId = request.body.video_id ?? "";
  if (videoId && urlRegex.test(videoId)) {
    try {
      const videoInfo = await ytdl.getInfo(videoId,{agent});
      const videoFormats = videoInfo.formats;
      const allowedAudioFormats = [];
      const allowedVideoFormats = [];
      videoFormats.forEach((elem, index) => {
        const size = sizeCalculation(elem.contentLength);
        let type = "";
        if (elem.mimeType) {
          type = elem.mimeType.split(";")[0];
        }
        const container = elem.container;
        const pixel = elem.qualityLabel;
        const itag = elem.itag;
        if (elem.contentLength) {
          if (type.indexOf("video") !== -1 && elem.hasAudio && elem.hasVideo) {
            allowedVideoFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }

          if (type.indexOf("audio") !== -1 && elem.hasAudio) {
            allowedAudioFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }
        } else {
          if (type.indexOf("video") !== -1 && elem.hasAudio && elem.hasVideo) {
            allowedVideoFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }

          if (type.indexOf("audio") !== -1 && elem.hasAudio) {
            allowedAudioFormats.push({
              size,
              type,
              pixel,
              itag,
              container,
            });
          }
        }
      });

      const apiResponse = {
        status: "success",
        allowedAudioFormats,
        allowedVideoFormats,
        title: videoInfo.videoDetails.title,
        thumbnail: videoInfo.videoDetails.thumbnails[0],
      };
      return response.json(apiResponse);
    } catch (err) {
      console.log(err);
      return response.json({
        status: "fail",
        message: "something went wrong",
      });
    }
  } else {
    console.log("unsupported URL");
    return response.json({
      status: "fail",
      message: "URL is not compatible",
    });
  }
});

app.post("/downloadContent", (request, response) => {
  const itagValue = request.body.itagValue;
  const container = request.body.container;
  let videoTitle = request.body.videoTitle;
  videoTitle = videoTitle.replaceAll(" ", "_");
  const filePath = `/tmp/${videoTitle}.${container}`;
  const URL = request.body.URL;
  if (fs.existsSync(filePath.toString())) {
    console.log(`The file ${filePath} exists. `);
    return response.send({
      status: "success",
      message: "video ready to download",
      path: "./downloads/" + videoTitle + "." + container,
    });
  }
  ytdl(URL, {
    filter: (format) => format.itag === parseInt(itagValue),
    agent,
  })
    .pipe(fs.createWriteStream(filePath))
    .on("finish", () => {
      console.log("Video downloaded successfully!");
        response.setHeader('Content-disposition', 'attachment; filename='+videoTitle+'.mp4');
       response.download(filePath, `${videoTitle}.mp4`);
    })
    .on("error", (err) => {
      console.error("Error downloading video:", err);
      return response.json({
        status: "fail",
        message: "something went wrong",
      });
    });
});
function sizeCalculation(length) {
  if (length) {
    var k = 1000,
      dm = 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(length) / Math.log(k));
    return parseFloat((length / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  } else {
    return "";
  }
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
