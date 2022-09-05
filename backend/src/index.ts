import express from 'express'
import 'reflect-metadata'


const app = express()


app.listen(3000, () => {
	console.info('listening on port 3000')
});

