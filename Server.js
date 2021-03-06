const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const signup = require ('./controllers/signup');
const imageCounter = require ('./controllers/imageCounter');

const clarifaiImageApi = require('./controllers/clarifaiImageApi')

const database = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl:true
  }
});




const app = express();
app.use(cors());
app.use(bodyParser.json());

app.listen(process.env.PORT, ()=>{
	console.log('Server is running');
})

app.get('/',(req,res) => { res.status(200).json('server is running')})
app.post('/signin',signin.signinHandler(database,bcrypt))
app.post('/signup',signup.signupHandler(database,bcrypt))
app.put('/image',imageCounter.imageCounterHandler(database))
app.post('/imageUrl',clarifaiImageApi.clarifaiimageApiHandler())


//*******************************************************************
// TO BE IMPLEMENTED
app.get('/profile/:id', (req,res) =>{
	const {id} = req.params;
	console.log('id',id);
	let found = false;
	database.users.forEach(user =>{
		if(id == user.id){
			found = true;
			return res.json(user);
		}	
	})
	if(found == false){
			res.status(404).json('user not found');
		}
	
})
//old way before database connection
/*
const database = {
users: [
	{
		email:'john@gmail.com',
		name:'John',
		id:01,
		count:0,
		password:'Hello'
	},
    {
		email:'sally@gmail.com',
		name:'Sally',
		id:02,
		count:0,
		password:'Bye'
	},
	]
}
*/