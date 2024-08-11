const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const ytdl = require("@distube/ytdl-core");

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
      const videoInfo = await ytdl.getInfo(videoId);
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
  const filePath = "./downloads/" + videoTitle + "." + container;
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
  })
    .pipe(fs.createWriteStream(filePath.toString()))
    .on("finish", () => {
      console.log("Video downloaded successfully!");
      return response.send({
        status: "success",
        message: "video ready to download",
        path: "/downloads/" + videoTitle + "." + container,
      });
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
