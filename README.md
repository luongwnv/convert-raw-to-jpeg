# ARW to JPEG Converter (Electron App)

🚀 **ARW to JPEG Converter** is a desktop application built with **Electron** that converts `.ARW` RAW image files to `.JPEG` while preserving high quality and **EXIF** metadata.

---

## 🛠️ Features

* 🎯 **Drag & Drop** or select `.ARW` files manually.
* 📂 **Choose output folder** for the converted images.
* 📸 **Preserves EXIF metadata** (original image information).
* 🎨  **Modern UI with Dark Mode support** .
* 🚀  **Automatically deletes `.TIFF` intermediate files** .
* ✅  **Simple and efficient, no image editing required** .

---

## 📥 Installation

> Requirements:  **Node.js** ,  **Electron** ,  **dcraw** ,  **ImageMagick** , and  **ExifTool** .

### 1️⃣ **Install Node.js and Electron**

Download and install [Node.js](https://nodejs.org/) (if not already installed).

Then, in the terminal, run:

```sh
npm install
```

### 2️⃣ **Install Required Dependencies**

You need  **dcraw** ,  **ImageMagick** , and  **ExifTool** .

🔹 **On Windows (using Chocolatey)**

```sh
choco install imagemagick exiftool dcraw
```

🔹 **On macOS (using Homebrew)**

```sh
brew install imagemagick exiftool dcraw
```

🔹 **On Linux (Ubuntu/Debian)**

```sh
sudo apt install imagemagick exiftool dcraw
```

---

## 🚀 Running the Application

Open a terminal, navigate to the project folder, and run:

```sh
npm start
```

---

## 🎯 How to Use

### 1️⃣ Select or Drag & Drop `.ARW` File

* Click the file selection area **or** drag and drop an `.ARW` file into the application.

### 2️⃣ Click **Convert**

* The application will convert **ARW → JPEG** while keeping  **EXIF metadata** .

### 3️⃣ Check the Output File

* The `.jpg` file will be saved in the  **same folder as the original `.ARW` file** .

---

## ❓ Troubleshooting

### 🛑 **"Command Not Found" Error During Conversion**

🔹  **Cause** : `dcraw`, `imagemagick`, or `exiftool` is not installed.

🔹  **Solution** : Install the required dependencies (see **Installation** section).

### 🛑 **"Conversion Failed" Error**

🔹  **Cause** : The `.ARW` file may be corrupted or unsupported.

🔹  **Solution** : Try another `.ARW` file.

---

## 📜 License

MIT License © 2025 - **Luong Nguyen**
