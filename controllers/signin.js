const signinHandler = (database,bcrypt) => (req,res)=>{

	database.select('email', 'hash').from('login').where('email','=',req.body.email)
	.then(data => {
			const passmatch = bcrypt.compareSync(req.body.password,data[0].hash ); // tru
			if(passmatch){
				database.select('*').from('users').where('email','=',req.body.email)
				.then(user =>{
					res.status(200).json(user[0])
				}).catch(err => {res.status(404).json('user not found in user table')})
				
			}
			else{
				res.status(404).json('password entered is wrong');
			}
	}).catch(err => {res.status(404).json(err)})

//OLD WAY BEFORE DATABSE CONNECTION
	// console.log('req.body.email',req.body.email);
	// console.log('req.body.password',req.body.password);
	
	// 			e

	// if(req.body.email == database.users[0].email && 
	// 	req.body.password == database.users[0].password){
	// 	res.status(200).json(database.users[0]);
	// }	
	// else{
	// 	res.status(400).json('failure');
	// }
}

module.exports ={
	signinHandler:signinHandler
}