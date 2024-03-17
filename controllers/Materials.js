import { success, error } from "../lib/Responser.js";
import Material from "../models/MaterialsModel.js";
import Subject from "../models/SubjectModel.js";

// Get all materials
export const getAllMaterial = async (req, res) => {
    try {
        const materials = await Material.findAll({
            attributes: ['id', 'subject_id', 'material'],
            include: {
                model: Subject,
                as: 'subject',
                attributes: ['subject_name', 'subject_grade'],
                required: true
            }
        });
        return success(res, "Berhasil mendapatkan data semua Materi", materials);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Create a new material
export const createMaterial = async (req, res) => {
    try {
        const { subject_id, material } = req.body;
        const newMaterial = await Material.create({
            subject_id,
            material
        })
        return success(res, "Berhasil membuat materi baru", newMaterial);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Update a material
export const updateMaterial = async (req, res) => {
    try {
        const { id } = req.params; // Material ID
        const { subject_id, material } = req.body;
        const updatedMaterial = await Material.findByPk(id);
        if (!updatedMaterial) {
            return res.status(404).json({ msg: "Materi tidak ditemukan" });
        }
        updatedMaterial.subject_id = subject_id;
        updatedMaterial.material = material;
        await updatedMaterial.save();
        return success(res, "Berhasil memperbarui materi", updatedMaterial);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

// Delete a material
export const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params; // Material ID
        const deletedMaterial = await Material.findByPk(id);
        if (!deletedMaterial) {
            return res.status(404).json({ msg: "Materi tidak ditemukan" });
        }
        await deletedMaterial.destroy();
        return success(res, "Berhasil menghapus materi");
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
