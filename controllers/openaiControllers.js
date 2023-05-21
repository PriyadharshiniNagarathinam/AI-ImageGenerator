const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
})

const opneai = new OpenAIApi(configuration);

const generateImage = async(req, res) => {

    const { prompt , size } = req.body;
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
    try {
        const response = await opneai.createImage({
            // a prompt refers to a message or a request for input displayed to 
            // the user in order to interact with a program.
            prompt,
            n:1,
            size:imageSize
        });

        const imageUrl = response.data.data[0].url;

        res.status(200).json({
            success:true,
            data: imageUrl
        });

    } catch (error) {

        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }

        res.status(400).json({
            success:false,
            data : "The image could not be generated"
        })
    }
}

module.exports = { generateImage };