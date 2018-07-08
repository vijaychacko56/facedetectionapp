const signupHandler = (database,bcrypt) => (req,res) => {
	 const {name,email,password} = req.body;
	 const hash = bcrypt.hashSync(password);
	database.transaction((trx)=>{   //   transaction ({ insert.then(insert.then.catch).then(trx.commit).catch(trx.rollback)}).catch(Unable to registe)
		trx.insert({
			email: email,
			hash:hash })
	    .into('login')
	    .returning('email')
	    .then(loginemail =>{
	    	return trx('users').insert({
		    		name:name,
		    		count:0,
		    		email:email,
		    		joined: new Date()
		    		 }).returning('*')
	    				.then(user =>{
		    		 	res.json(user[0]);
		    		 }).catch(err=>{ res.status(400).json(err)})
	    		 
	    }).then(trx.commit)
	    .catch(trx.rollback)
	}).catch(err=>{ res.status(400).json('Unable to register')}) 

	//OLD WAY BEFORE DATABSE CONNECTION
	//  // database.users.push({
	//  // 		id:'125',
	//  // 		name:name,
	//  // 		email:email,
	//  // 		count:0,
	//  // 		password:password
	//  // 	})
	//  	res.json(database.users[database.users.length-1]);
	// //  bcrypt.hash(password, null, null, function(err, hash) {
	// //  	 database.users.push({
	// //  		email:email,
	// //  		password:hash
	// //  	})
	// //  	res.json(database.users[database.users.length-1]);
	// // });
}

module.exports ={
	signupHandler:signupHandler
}