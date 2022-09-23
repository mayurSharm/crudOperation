const express=require('express');
const cors =require('cors');
const app = express();
const mysql=require('mysql');
const port =3001;


const db=mysql.createPool({
    host:'localhost',
    user:"root",
    password:"root",
    database:"users",
});

app.use(cors()); 
app.use(express.json())
app.get("/api/get",(req,res)=>{
    const sqlSelect ="SELECT * FROM user";
    db.query(sqlSelect,(err,result)=>{
        res.send(result );
    })
})
app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params; 
    const sqlSelect ="SELECT * FROM user where id = "+ id;
    
    db.query(sqlSelect,(err,result)=>{
        res.send(result );
    })
})

app.post("/api/insert",(req,res)=>{
    console.log("ABC",req.body)
    const name=req.body.name;
    const email=req.body.email;
    const status=req.body.status;
    const sqlInsert="INSERT INTO user (name,email,status) VALUES (?,?,?)"
    db.query(sqlInsert,[name,email,status],(error, result )=>{
        if(error)
            res.send(error);
        else
            res.send(result);
        // console.log(err)
    })

});
app.put('/api/update/:id',(req,res)=>{
    const {id} = req.params; 
    const name =req.body.name;
    const email=req.body.email;
    const status=req.body.status;
    const sqlUpdate="UPDATE user SET name = ?, email = ? , status = ?  Where id = "+ id;
    db.query(sqlUpdate,[name,email,status],(err,result)=>{
      if(err) console.log(err);
    })
})
app.delete("/api/remove/:id",(req,res)=>{
    console.log("ABC",req.body)
   const {id} =req.params 
    const sqlRemove="DELETE FROM user where id= ?"
    db.query(sqlRemove,id,(error, result )=>{
        if(error)
            res.send(error);
        else
            res.send(result);
    })

});




app.listen(port,(error)=>{
    if(error){
        console.log(error)
    }
    console.log(("runing on port 3001")
    );
})