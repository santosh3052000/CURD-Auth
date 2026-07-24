const fs = require('fs');

let ErrorLogger = async (err, req, res, next) => {
    let errData = `Error: ${err.message} \n`;
    
    fs.appendFile('./ErrorLogger.txt', errData, (er) => {
        if (res.headersSent) {
            return next(err);
        }
    
        if (er) {
            return res.status(500).json({ Message: 'Internal server error !' });
        } else {
            return res.status(500).json({ Message: 'Error caught by ErrorLogger !', Error: errData });
        }
    });
};

module.exports = ErrorLogger;
