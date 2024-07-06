import app from "./app.js";
import connectToDb from "./db/connection.js";

connectToDb().then(()=> {
  app.listen(process.env.PORT, ()=> console.log("Serever Open 🦖 and Connected to Database !! ⚙️"));

}).catch(e=> console.log(e))
