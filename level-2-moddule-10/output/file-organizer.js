const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'output', 'messy-files')
const organizedDir = path.join(__dirname, 'output','organized')

const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};
const testFiles = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "nodejs.zip",
];

function initializeDirectories(){
    if(!fs.existsSync(sourceDir)){
        fs.mkdirSync(sourceDir, {recursive:true});

        testFiles.forEach((file)=>{
            fs.writeFileSync(path.join(sourceDir, file), `Content of ${file}`);
        })
    }
    console.log('messy directories files are created')

    if(!fs.existsSync(organizedDir)){
        fs.mkdirSync(organizedDir, {recursive:true})
    }
    Object.keys(categories).forEach((category)=>{
        const categoryPath =path.join(organizedDir, category);
        if(!fs.existsSync(categoryPath)){
            fs.mkdirSync(categoryPath);
        }
    });
}

function getCeategory(filename){
    const ext = path.extname(filename).toLowerCase();

    for(const[category, extensions] of Object.entries(categories)){
        return category
    }
    return others
}