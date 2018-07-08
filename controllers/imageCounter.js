const imageCounterHandler = (database) =>  (req,res) =>{
	const {id} = req.body;

		database('users')
		.where('id', '=', id)
		.increment('count',1)
		.returning('count')
		.then(count =>{
			res.status(200).json(count[0])
		}).catch(err => {res.status(404).json('could not update counter')})



		//OLD WAY BEFORE DATABSE CONNECTION
	// console.log('id',id);
	// let found = false;
	// database.users.forEach(user =>{
	// 	if(id == user.id){
	// 		found = true;
	// 		user.count++;
	// 		return res.json(user.count);
	// 	}	
	// })
	// if(found == false){
	// 		res.status(404).json('user not found');
	// 	}
	
}

module.exports ={
	imageCounterHandler:imageCounterHandler
}