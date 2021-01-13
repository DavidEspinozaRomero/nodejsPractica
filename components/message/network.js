// const response = require("express");
const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require("../../network/response");

router.get('/', (req,res)=>{
	const filterMessage = req.query.user || null
	controller.getMessages(filterMessage)
	.then((messageList) => {
		response.success(req, res, 200, messageList)
	})
	.catch(err=>{
		response.error(req,res, 500, "Unexpected Error" , err)
	})
});

router.post('/', (req,res)=>{
	console.log(req.body.user, req.body.message);
	controller.addMessage(req.body.user, req.body.message)
		.then((fullMessage)=>{
			response.success(req, res, 201, fullMessage)
		})
		.catch(err=>{
			response.error(req, res, 400, "informacion invalida","Error en el controlador")
		})
});

router.patch('/:id', (req, res)=>{
	controller.updateMessage(req.params.id,req.body.message)
	.then(data => {
		response.success(req,res, 200, data)
	})
	.catch(err=>{
		response.error(req, res , 500 , err);
	})
})

router.delete('/:id', (req,res)=>{
	controller.deleteMessage(req.params.id)
		.then(()=>{
			response.success(req, res, 200 , `mensaje borrado ${req.params.id}`)
		})
		.catch(err =>{
			response.error(req, res , 500, "Error interno" , err)
		})
	// res.send(`message erased ${req.body.text}`)
});


module.exports = router;