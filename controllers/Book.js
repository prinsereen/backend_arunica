import Buku from '../models/books.js';
import { v4 as uuidv4 } from 'uuid';
import admin from "../config/FirfebaseConfig.js"
import { success, error } from '../lib/Responser.js';

const bucket = admin.storage().bucket();

export const createBuku = async (req, res) => {
    try {
        const { judul, abstrak } = req.body;
        const sampul = req.files.sampul[0]; 
        const buku = req.files.buku[0]; 

        if (!sampul || !buku) {
            return res.status(400).json({ message: 'Both cover image and book PDF are required' });
        }

        const sampulFilename = `${uuidv4()}-${sampul.originalname}`;
        const bukuFilename = `${uuidv4()}-${buku.originalname}`;

        const sampulUpload = bucket.file(sampulFilename);
        const bukuUpload = bucket.file(bukuFilename);

        const sampulStream = sampulUpload.createWriteStream({
            metadata: {
                contentType: sampul.mimetype,
            },
        });

        const bukuStream = bukuUpload.createWriteStream({
            metadata: {
                contentType: buku.mimetype,
            },
        });

        sampulStream.on('error', (error) => {
            console.log(error);
            return res.status(500).json({ message: 'Error uploading cover image' });
        });

        bukuStream.on('error', (error) => {
            console.log(error);
            return res.status(500).json({ message: 'Error uploading book PDF' });
        });

        let sampulUploadFinished = false;
        let bukuUploadFinished = false;

        sampulStream.on('finish', () => {
            sampulUploadFinished = true;
            if (sampulUploadFinished && bukuUploadFinished) {
                completeUpload();
            }
        });

        bukuStream.on('finish', () => {
            bukuUploadFinished = true;
            if (sampulUploadFinished && bukuUploadFinished) {
                completeUpload();
            }
        });

        const completeUpload = async () => {
            const url_sampul = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${sampulFilename}?alt=media`;
            const url_buku = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${bukuFilename}?alt=media`;

            const newBuku = await Buku.create({
                url_sampul,
                url_buku,
                judul,
                abstrak,
            });

            return success(res, "Berhasil menambahkan buku", newBuku);
        };

        sampulStream.end(sampul.buffer);
        bukuStream.end(buku.buffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getBukus = async (req, res) => {
    try {
        const bukus = await Buku.findAll({
            attributes: ['id', 'url_sampul', 'url_buku', 'judul', 'abstrak']
        });
        return success(res, "Berhasil", bukus);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getHomeBukus = async (req, res) => {
    try {
        let bukus = await Buku.findAll({
            attributes: ['id', 'url_sampul', 'url_buku', 'judul', 'abstrak']
        });
        bukus = bukus.sort(() => 0.5 - Math.random()).slice(0, 5);
        return success(res, "Berhasil", bukus);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getBukuById = async (req, res) => {
    try {
        const { id } = req.params;
        const buku = await Buku.findByPk(id);

        if (!buku) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return success(res, "Berhasil", buku);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, abstrak } = req.body;
        const sampul = req.files ? req.files.sampul ? req.files.sampul[0] : null : null;
        const buku = req.files ? req.files.buku ? req.files.buku[0] : null : null;

        const existingBuku = await Buku.findByPk(id);

        if (!existingBuku) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updateData = { judul, abstrak };

        if (sampul) {
            const sampulFilename = `${uuidv4()}-${sampul.originalname}`;
            const sampulUpload = bucket.file(sampulFilename);

            const sampulStream = sampulUpload.createWriteStream({
                metadata: {
                    contentType: sampul.mimetype,
                },
            });

            sampulStream.on('error', (error) => {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading cover image' });
            });

            sampulStream.on('finish', async () => {
                const url_sampul = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${sampulFilename}?alt=media`;
                updateData.url_sampul = url_sampul;

                if (!buku) {
                    await existingBuku.update(updateData);
                    return res.status(200).json(existingBuku);
                }
            });

            sampulStream.end(sampul.buffer);
        }

        if (buku) {
            const bukuFilename = `${uuidv4()}-${buku.originalname}`;
            const bukuUpload = bucket.file(bukuFilename);

            const bukuStream = bukuUpload.createWriteStream({
                metadata: {
                    contentType: buku.mimetype,
                },
            });

            bukuStream.on('error', (error) => {
                console.log(error);
                return res.status(500).json({ message: 'Error uploading book PDF' });
            });

            bukuStream.on('finish', async () => {
                const url_buku = `https://firebasestorage.googleapis.com/v0/b/${process.env.storageBucket}/o/${bukuFilename}?alt=media`;
                updateData.url_buku = url_buku;

                if (!sampul) {
                    await existingBuku.update(updateData);
                    return res.status(200).json(existingBuku);
                }
            });

            bukuStream.end(buku.buffer);
        }

        if (!sampul && !buku) {
            await existingBuku.update(updateData);
            return res.status(200).json(existingBuku);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteBuku = async (req, res) => {
    try {
        const { id } = req.params;
        const buku = await Buku.findByPk(id);

        if (!buku) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await buku.destroy();
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
