import Knowledge from '../models/KnowledgeModel.js';
import Material from '../models/MaterialsModel.js';
import { success, error } from '../lib/Responser.js';
import Subject from '../models/SubjectModel.js';
import Student from "../models/StudentModel.js"
import { where } from 'sequelize';
import { Where } from 'sequelize/lib/utils';

export const createKnowledge = async (req, res) => {
    try {
        const { material_id, type, url, judul } = req.body;

        const existingMaterial = await Material.findByPk(material_id);
        if (!existingMaterial) {
            throw new Error('Invalid material_id. Material not found.');
        }

        const newKnowledge = await Knowledge.create({
            material_id,
            type,
            url,
            judul
        });

        return success(res, "Knowledge successfully created", newKnowledge);
    } catch (err) {
        if (err.message === 'Invalid material_id. Material not found.') {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(500).json({ msg: err.message });
    }
}

export const getKnowledge = async (req, res) => {
    try {
        const { type, slice, mapel } = req.query;
        let knowledge;

        // Mapping of mapel to mapelPilihan
        const mapelMapping = {
            ipa: "IPA",
            matematika: "Matematika",
            ips: "IPS",
            bindo: "Bahasa Indonesia",
            bingg: "Bahasa Inggris",
            ppkn: "PKN",
            senbud: "Seni Budaya"
        };

        if (slice) {
            knowledge = await Knowledge.findAll({
                where: {
                    type: type
                },
                attributes: ['url', 'judul']
            });
            knowledge = knowledge.sort(() => 0.5 - Math.random()).slice(0, 3);
        } else {
            const mapelPilihan = mapelMapping[mapel];

            // Step 1: Find the Subject
            const subject = await Subject.findOne({
                where: {
                    subject_name: mapelPilihan
                }
            });

            if (!subject) {
                return res.status(404).json({ msg: "Subject not found" });
            }

            // Step 2: Find Materials related to the Subject
            const materials = await Material.findAll({
                where: {
                    subject_id: subject.id
                }
            });

            const materialIds = materials.map(material => material.id);

            // Step 3: Find Knowledge related to the Materials
            knowledge = await Knowledge.findAll({
                where: {
                    type: type,
                    material_id: materialIds
                },
                attributes: ['url', 'judul'],
                include: {
                    model: Material,
                    attributes: ['material']
                }
            });
        }
        
        return success(res, "Knowledge fetched successfully", knowledge);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};




export const getKnowledgeById = async (req, res) => {
    try {
        const { id } = req.params;
        const knowledge = await Knowledge.findByPk(id);
        if (!knowledge) {
            return res.status(404).json({ msg: 'Knowledge not found' });
        }
        return success(res, "Knowledge fetched successfully", knowledge);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}


export const addProgressVideo = async(req, res) => {
    try {
        const { url } = req.body;
        const { id } = req.user;

        const user = await Student.findByPk(id)
        if (!user){
           return success(res, "Anda Bukan Siswa")
        }
        const knowledge = await Knowledge.findOne({
            where:{
                url
            },
            attributes: ['url'],
            include: {
                model: Material,
                include:{
                    model: Subject,
                    attributes: ['subject_name']
                }
            }
        })

        const {
            math_activities,
            ipa_activities, 
            pkn_activities, 
            ips_activities, 
            bindo_activities,
            bing_activities,
            senbud_activities,
            points
        } = user

        if (knowledge){
            const mapel = knowledge.material.subject.subject_name
            if (mapel === "IPA"){
                await user.update({
                    ipa_activities: ipa_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "Matematika"){
                await user.update({
                    math_activities: math_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "PKN"){
                await user.update({
                    pkn_activities: pkn_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "IPS"){
                await user.update({
                    ips_activities: ips_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "Bahasa Indonesia"){
                await user.update({
                    bindo_activities: bindo_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "Bahasa Inggris"){
                await user.update({
                    bing_activities: bing_activities + 1,
                    points: points + 1
                })
            }else if (mapel === "Seni Budaya"){
                await user.update({
                    senbud_activities: senbud_activities + 1,
                    points: points + 1
                })
            }
            return success(res, "Berhasil menambahkan point", {});
        }
        return error(res, "something went wrong")
    } catch (error) {
        console.log(error)
        return res.status(500)
    }

}




export const updateKnowledge = async (req, res) => {
    try {
        const { id } = req.params;
        const { material_id, type, url } = req.body;

        const existingKnowledge = await Knowledge.findByPk(id);
        if (!existingKnowledge) {
            return res.status(404).json({ msg: 'Knowledge not found' });
        }

        const existingMaterial = await Material.findByPk(material_id);
        if (!existingMaterial) {
            throw new Error('Invalid material_id. Material not found.');
        }

        await existingKnowledge.update({
            material_id,
            type,
            url
        });

        return success(res, "Knowledge successfully updated", existingKnowledge);
    } catch (err) {
        if (err.message === 'Invalid material_id. Material not found.') {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(500).json({ msg: err.message });
    }
}

export const deleteKnowledge = async (req, res) => {
    try {
        const { id } = req.params;

        const existingKnowledge = await Knowledge.findByPk(id);
        if (!existingKnowledge) {
            return res.status(404).json({ msg: 'Knowledge not found' });
        }

        await existingKnowledge.destroy();

        return success(res, "Knowledge successfully deleted");
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}
