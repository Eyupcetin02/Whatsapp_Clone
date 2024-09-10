const express = require("express")
const app = express()
const mongoose = require("mongoose")
const auth = require("./routers/auth")
const http = require('http');
const {Server} = require("socket.io")
const {getAllMessage} = require("./functions/users")
const cors = require("cors")
const bodyParser = require("body-parser")
const multer = require("multer")
const path = require("path")
const {register} = require("./functions/auth")
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
  
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const server = http.createServer(app)

const io = new Server(server , {
    cors : {
        origin : "*",
        methods : ["GET" , "POST"]
    }
})


const users = async (socket, data) => {
    const { user1, user2, message } = data;
  
    const schemaKey = [user1, user2].sort().join('');
  
    let newUsers;
  
    if (!mongoose.models[schemaKey]) {
        const usersSchema = new mongoose.Schema({
            user: {
                type: String,
                trim: true,
            },
            message: {
                type: String,
            },
            date: {
                type: Date,
                default: new Date(),
            },
        });
  
        newUsers = mongoose.model(schemaKey, usersSchema);
    } else {
        newUsers = mongoose.model(schemaKey);
    }
  
    try {
        const newMessage = await newUsers.create({ user: user1, message: message });

            const messages = await mongoose.models[schemaKey].find()
            io.emit(schemaKey, messages || []);
       
    } catch (error) {
        console.error("Error creating message:", error);
    }
  };
  
app.use("/api" , auth)


io.on('connection', (socket) => {
    console.log('Bir istemci bağlandı.');

    
    socket.on('users', (data) => users(socket, data));
   socket.on('getAllMessage', (data) => getAllMessage(socket, data));

    socket.on('disconnect', () => {
        console.log('Bir istemci ayrıldı.');
    });
});



app.post("/api/register" ,  upload.single('profileImage') , register)



const MONGO_URI = "mongo_uri"
mongoose.connect(MONGO_URI)
.then(()=>{
    server.listen(5000 , ()=>{
    
    console.log("server running")
})
})
.catch((err) => console.log(err))

