 const Chat = require('../models/chat')
const user = require('../models/user')

 module.exports.createChat = async(req,res)=>{
    const newChat= new Chat({
        members:[req.body.senderId,req.body.recieverId]
    })
    try {
        const result= await newChat.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
 }

 module.exports.userChats= async(req,res)=>{
    try {
        const chat = await Chat.find({
            members:{$in:[req.params.userId]} 
        })
        res.status(200).json(chat)
        
    } catch (error) {
        res.status(500).json(error)
    }
 }
 module.exports.findChat= async(req,res)=>{
    try {
        const chat = await Chat.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat)
        
    } catch (error) {
        res.status(500).json(error)
    }
 }
 module.exports.getusers = async (req, res) => {
    try {
      const userIds = req.query.id;
      
      // Ensure userIds is an array, even for single IDs
      const userIdArray = Array.isArray(userIds) ? userIds : [userIds];
      
      const users = await user.find({ _id: { $in: userIdArray } });
      users
  
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "Users not found" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
  
 