const { GoogleGenAI } = require( "@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile){

    const contents = [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageFile,
          },
        },
        { text: "Caption this image." },
      ];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config:{
          systemInstruction:`
          You area an expret in generating captions for images.
          you generate single captions for the image.
          your caption should be short and concise.
          you use hashtags and emojis in the captions
          `
        }
      });
      return response.text;
}

module.exports = generateCaption