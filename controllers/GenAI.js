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

