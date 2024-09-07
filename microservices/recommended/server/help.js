const fs = require('fs');

const filePath = '/Users/sahilnarwal/Documents/Sem-6/Minor Work/NewsOnTips/microservices/recommended/output.txt'; // Replace this with the actual file path

fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {
        console.error('Error accessing file:', err);
        return;
    }
    console.log('File exists and is readable');
});
