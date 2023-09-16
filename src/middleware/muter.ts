import multer from 'multer';
import path from 'node:path';
import fs from 'fs';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '..', 'videos'));
	},
	filename: function (req, file, cb) {
		const videoName = `${file.originalname}`;
		const videoPath = path.join(__dirname, '..', 'videos', videoName);

		// Verifique se o arquivo já existe no diretório
		if (fs.existsSync(videoPath)) {
			const error = new Error('Um vídeo com o mesmo nome já existe');
			console.log(error);
			
			cb(error , '');
		} else {
			cb(null, videoName);
		}
	}
});

export const upload = multer({ storage: storage });
