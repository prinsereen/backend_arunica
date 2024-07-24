import axios from "axios";

export const personalAssistance = async (req, res) => {
  try {
    const { pertanyaan } = req.body;

    console.log("ininih",pertanyaan)

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': 'ffb3c98728msh199f2c99fff58fap18e38cjsna6d7e0e1fa4c',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `Kamu adalah chatbot bernama Arun. Kamu bertugas untuk menjawab pertanyaan dari siswa. Selalu ucapkan \`Halo saya Arun, \` kemudian jawab pertanyaannya, setelah itu berikan motivasi untuk selalu belajar. jawab dengan singkat. Pertanyaan: ${pertanyaan}`
          }
        ],
        web_access: false
      }
    };

    const response = await axios.request(options);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan');
  }
};




export const ASAG = async (ringkasan) => {
  try {


    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
      headers: {
        'x-rapidapi-key': 'ffb3c98728msh199f2c99fff58fap18e38cjsna6d7e0e1fa4c',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          {
            role: 'user',
            content: `Kamu adalah ai yang digunakan untuk menilai ringkasan siswa. siswa meringkas setelah membaca buku. Ada 2 hal yang harus kamu nilai. pertama kamu harus menilai Pemahaman Siswa, kedua kamu harus menilai Kesesuaian ringkasan nilai tersebut harus integer diantara 50 - 100. Selain itu kamu juga harus memberikan feedback untuk ejaan dari siswa teliti jika ada kesalahan tanda baca sampaikan dengan maksimal 150 kata berikan kata motivasi belajar juga ya. format jawaban kamu adalah berbentuk json seperti {pemahaman_siswa: nilai, kesesuaian_ringkasan: nilai, gen_ai_feedback: feedback} jangan ada. Berikut adalah ringkasan yang dibuat siswa: ${ringkasan}`
          }
        ],
        web_access: false
      }
    };

    const response = await axios.request(options);
    console.log(response.data.result);

    return JSON.parse(response.data.result)
    //res.json(response.data);
  } catch (error) {
    console.error(error);
    return error
  }
};

