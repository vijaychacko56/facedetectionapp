 const  Clarifai  = require('clarifai');

 const clarifaiObject = new Clarifai.App({
 apiKey: process.env.CLARIFAI_API_KEY;
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