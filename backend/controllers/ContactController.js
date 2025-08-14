const {sendContactEmail} = require("../utils/mailer") 
exports.contact= async (req,res) =>{
    try{
      const {name,email,message} = req.body;
      if(!name || !email || !message)
      {
        console.log("name, email and message are missing")
      }
      if(sendContactEmail)
      {
        await sendContactEmail({
            name : name,
            email:email,
            message:message
        })
      }
      res.status(200).json()

    }
    catch(err)
    {
       new Error("Error Contact");
        
    }
      
}