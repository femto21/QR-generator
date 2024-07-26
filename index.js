import inquirer from "inquirer";
import qr from "qr-image-dark";
import fs from "fs";

var qrFileName = "qr_img.png";
var urlSaveFile = "URL.txt";

inquirer
  .prompt([
    {
    message: "Type in your URL: ",
    name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream(qrFileName));

    fs.writeFile(urlSaveFile, (url + "\r\n"), {flag:"a+"}, (err) => {
        if (err) throw err;
        console.log(`Open ${qrFileName} to view the QR code`);

        console.log(`The URL has been saved in ${urlSaveFile}!`);
    }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Couldn't generate QR image, please try again");
    } else {
      console.log("Error. Check your packages and code and try again");
    }
  });