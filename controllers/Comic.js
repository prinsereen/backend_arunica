import Comic from '../models/ComicModel.js';
import admin from "../config/FirfebaseConfig.js"
import { v4 as uuidv4 } from 'uuid';
import { success, error } from '../lib/Responser.js';
import { showFormattedDate } from '../lib/showFormattedDate.js';

const bucket = admin.storage().bucket();

export const createComic = async (req, res) => {
    try {
        const { judul} = req.body;
        const file = req.file; // Assuming you're using multer for file uploads
        const {id, name} = req.user

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const filename = `${uuidv4()}-${file.originalname}`;
        const fileUpload = bucket.file(filename);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobStream.on('error', (error) => {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong while uploading' });
        });

        blobStream.on('finish', async () => {
            const url_comic = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${filename}?alt=media`;

            const newComic = await Comic.create({
                student_id: id,
                name,
                url_comic,
                judul,
                status: "Proses Verifikasi",
            });
            return success(res, "Berahasil Membuat Comic", newComic)
            // return res.status(201).json(newComic);
        });

        blobStream.end(file.buffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getMyComics = async (req, res) => {
    try {
        const { id } = req.user;
        const comics = await Comic.findAll({
            where: {
                student_id: id
            },
            attributes: ['url_comic', 'name', 'judul', 'status', 'createdAt']
        });

        const formattedComics = comics.map(comic => ({
            img: comic.url_comic,
            name: comic.name,
            judul: comic.judul,
            status: comic.status,
            unggahDate: showFormattedDate(comic.createdAt)
        }));

        return success(res, "Ini Comic Saya", formattedComics);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getVerifiedComic = async (req, res) => {
    try {
        const comics = await Comic.findAll({
            where: {
                status: "Disetujui"
            },
            attributes: ['id','url_comic', 'name', 'judul', 'status', 'createdAt']
        });

        const formattedComics = comics.map(comic => ({
            id: comic.id,
            imageSrc: comic.url_comic,
            author: comic.name,
            title: comic.judul,
        }));

        return success(res, "Ini Comic Saya", formattedComics);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getFourComic = async (req, res) => {
    try {
        const comics = await Comic.findAll({
            where: {
                status: "Disetujui"
            },
            attributes: ['id','url_comic', 'name', 'judul', 'status', 'createdAt']
        });

        let formattedComics = comics.map(comic => ({
            id: comic.id,
            imageSrc: comic.url_comic,
            author: comic.name,
            title: comic.judul,
        }));

        formattedComics = formattedComics.sort(() => 0.5 - Math.random()).slice(0, 4);

        return success(res, "Ini Comic Saya", formattedComics);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getComicById = async (req, res) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findOne({
            where: {
                id
            },
            attributes: ['url_comic']
        });

        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        return success(res, "Berhasil dapet comic nih", comic);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateComic = async (req, res) => {
    try {
        const { id } = req.params;
        const { student_id, judul, status } = req.body;
        const file = req.file; // Assuming you're using multer for file uploads

        const comic = await Comic.findByPk(id);

        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        if (file) {
            const filename = `${uuidv4()}-${file.originalname}`;
            const fileUpload = bucket.file(filename);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            blobStream.on('error', (error) => {
                console.log(error);
                return res.status(500).json({ message: 'Something went wrong while uploading' });
            });

            blobStream.on('finish', async () => {
                const url_comic = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${filename}?alt=media`;

                await comic.update({
                    student_id,
                    url_comic,
                    judul,
                    status,
                });

                return res.status(200).json(comic);
            });

            blobStream.end(file.buffer);
        } else {
            await comic.update({
                student_id,
                judul,
                status,
            });

            return res.status(200).json(comic);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComic = async (req, res) => {
    try {
        const { id } = req.params;
        const comic = await Comic.findByPk(id);

        if (!comic) {
            return res.status(404).json({ message: 'Comic not found' });
        }

        await comic.destroy();
        return res.status(200).json({ message: 'Comic deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
