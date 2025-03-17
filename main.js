const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { execFile } = require("child_process");
const fs = require("fs");

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

ipcMain.handle("select-file", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "ARW Files", extensions: ["arw"] }],
  });

  return result.filePaths[0] || null;
});

ipcMain.handle("select-output-folder", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
  return result.filePaths[0] || null;
});

ipcMain.on("convert-arw-to-jpeg", (event, filePath) => {
  if (!filePath) {
    event.reply("conversion-error", "No file selected");
    return;
  }

  const outputDir = path.dirname(filePath);
  const tempTiff = path.join(outputDir, path.basename(filePath, ".tiff"));
  const outputFilePath = path.join(
    outputDir,
    path.basename(filePath, path.extname(filePath)) + ".jpg"
  );

  event.reply("conversion-progress", "Converting ARW to TIFF...");
  execFile(
    "magick",
    [tempTiff, "-quality", "100", "-strip", outputFilePath],
    (err) => {
      if (err) {
        event.reply(
          "conversion-error",
          "TIFF to JPEG conversion failed: " + err.message
        );
      } else {
        event.reply("conversion-progress", "Converting TIFF to JPEG...");
        execFile(
          "exiftool",
          ["-overwrite_original", "-tagsFromFile", tempTiff, outputFilePath],
          (exifErr) => {
            if (exifErr) {
              event.reply(
                "conversion-error",
                "Failed to copy EXIF data: " + exifErr.message
              );
            } else {
              event.reply("conversion-success", outputFilePath);
              fs.unlink(tempTiff, (unlinkErr) => {
                if (unlinkErr) {
                  console.error(
                    "Failed to delete TIFF file:",
                    unlinkErr.message
                  );
                }
              });
            }
          }
        );
      }
    }
  );
});
