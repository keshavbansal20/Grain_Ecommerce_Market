const express = require("express");
const path = require("path");
const hbs = require("hbs")
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended:false}))
require("./db/conn");
const Register = require("./models/registers");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);


app.get("/",(req, res)=>{
    res.render("index")
});

app.get("/login" , (req , res)=>{
        res.render("login");
})
app.get("/register" , (req , res)=>{
        res.render("register");
})

app.get('/logout', function(req, res){
        res.render('index');
});


app.post("/registerUser" ,  async (req , res)=>{
        
        try {
                const password = req.body.psw;
                const cpassword = req.body.confirmpassword;
               
                if(password === cpassword){
                        const registerCustomer = new Register({
                               firstname:req.body.firstname,
                               gender:req.body.gender,
                               email:req.body.email,
                               phone:req.body.phone,
                               psw:password,
                               confirmpassword:cpassword,
                        })
                       
                        const registers = await registerCustomer.save();
                        res.status(201).render(index);
                }else{
                        res.send("passwords are not mataching");
                }
        } 
        catch (error) {
                res.status(400).send(error);
        }
})

app.post("/login" , async (req , res)=>{
        try {
                const email = req.body.email;
                const password = req.body.psw;
                console.log(password);
                const useremail = await Register.findOne({email:email});
                if(useremail.psw === password){
                        res.status(201).render("index");
                }else{
                        res.send("password are not matching");
                }
                

                
                
        } catch (error) {
                res.status(400).send("invalid email");
        }
})

app.get("/",(req,res) => {
        res.send("hello from the app.js")
})

app.listen(port, () => {
        console.log(`server is runnng at port no ${port}`)
})