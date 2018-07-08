 const  Clarifai  = require('clarifai');

 const clarifaiObject = new Clarifai.App({
 apiKey: 'c8f9e6381a7f4dbea9bc56ca499bdb91'
});

 const clarifaiimageApiHandler = () => (req,res) =>{
clarifaiObject.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
.then(response =>{
	res.status(200).json(response);
}).catch(err =>{
	res.status(400).json('Clarifai did not return a response');
})

}

module.exports ={
	clarifaiimageApiHandler: clarifaiimageApiHandler
}