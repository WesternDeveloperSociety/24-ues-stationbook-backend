const jwt = require("jsonwebtoken")
const { queryDBCredentials, addDBCredentials, generateRefreshToken, generateAccessToken } = require('../helpers/auth.js');

const register = async(req, res) => {
    const {studentID, email, fName, lName, nickname, password, isAdmin} = req.body;

    let date = new Date();

    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0'); 
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    
    let timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    let inDB = await queryDBCredentials(studentID, email)
    
    if (!inDB) {
        await addDBCredentials(studentID, email, fName, lName, nickname, password, 0, isAdmin, timestamp);
        res.send('Your data was appended');
    }
    else{
        return res.status(400).send('Already in database. Provide different credentials'); 
    }
}

const login = async(req, res) => {
    const { studentID, password } = req.body;
    
    let inDB = queryDBCredentials(studentID, password);

    if (inDB) {
        const accessToken = generateAccessToken(studentID);
        const refreshToken = generateRefreshToken(studentID);

        res.cookie('refreshToken', refreshToken, { //The name of the token should be sent under 'refreshToken' in the frontend
            httpOnly: true,
            sameSite: 'None', 
            secure: true, 
            maxAge: 1000 * 60 * 60 * 24 * 3 // 1000 ms x 60 s * 60 m * 24 hr * 3d
        });
        res.json({ accessToken });
    } else {
        res.status(401).send('Not in Database');
    }
}

const returnAccess = async(req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.get("Cookie")?.split("refreshToken=")[1]?.split(";")[0];        
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });
    
        jwt.verify(refreshToken, 'jwtSecret', (err, user) => { //We need to define this secret as something else usually a 64 hex code or smth
        if (err) return res.status(403).send("Invalid Refresh Token");
    
        const newAccessToken = generateAccessToken(user.username);
        res.json({ accessToken: newAccessToken }); //Sending back the new access token if the refresh token is valid
        });
    } catch (err){
        console.log(err)
        res.status(401).send("Provide a refresh token")
    }

};

const verifyJWT = (req, res, next) => { //This is for authorization 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token part from "Bearer <token>" - Bearer should be apart of the content sent with the access token (An OAUTH standard I believe)
  
    if (!token) {
        return res.status(401).send("Token is required");
    }
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ auth: false, message: "Authorization failed" });

        }
        req.userID = decoded.student_id || decoded.username;
        //res.status(200).send("Verified!")
        next();
    });
};

module.exports = {
    register,
    login, 
    returnAccess, 
    verifyJWT
}