import MyBank from '../models/MyBankModel.js';
import { v4 as uuidv4 } from 'uuid';
import admin from "../config/FirebaseConfig.js";
import { success, error } from '../lib/Responser.js';

const bucket = admin.storage().bucket();

export const createMyBank = async (req, res) => {
    try {
        const { material_id, judul } = req.body;
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

            const newMyBank = await MyBank.create({
                material_id,
                url_sampul,
                url_buku,
                judul,
            });

            return success(res, "Berhasil menambahkan buku ke bank", newMyBank);
        };

        sampulStream.end(sampul.buffer);
        bukuStream.end(buku.buffer);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getMyBanks = async (req, res) => {
    try {
        const mybanks = await MyBank.findAll({
            attributes: ['id', 'material_id', 'url_sampul', 'url_buku', 'judul']
        });
        return success(res, "Berhasil", mybanks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getMyBankById = async (req, res) => {
    try {
        const { id } = req.params;
        const mybank = await MyBank.findByPk(id);

        if (!mybank) {
            return res.status(404).json({ message: 'Book bank entry not found' });
        }

        return success(res, "Berhasil", mybank);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateMyBank = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, material_id } = req.body;
        const sampul = req.files ? req.files.sampul ? req.files.sampul[0] : null : null;
        const buku = req.files ? req.files.buku ? req.files.buku[0] : null : null;

        const existingMyBank = await MyBank.findByPk(id);

        if (!existingMyBank) {
            return res.status(404).json({ message: 'Book bank entry not found' });
        }

        const updateData = { judul, material_id };

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
                    await existingMyBank.update(updateData);
                    return res.status(200).json(existingMyBank);
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
                    await existingMyBank.update(updateData);
                    return res.status(200).json(existingMyBank);
                }
            });

            bukuStream.end(buku.buffer);
        }

        if (!sampul && !buku) {
            await existingMyBank.update(updateData);
            return res.status(200).json(existingMyBank);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMyBank = async (req, res) => {
    try {
        const { id } = req.params;
        const mybank = await MyBank.findByPk(id);

        if (!mybank) {
            return res.status(404).json({ message: 'Book bank entry not found' });
        }

        await mybank.destroy();
        return res.status(200).json({ message: 'Book bank entry deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
