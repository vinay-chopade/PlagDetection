const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb+srv://vinaychopade15:UmbvwlwSoaITUEZT@cluster0.nf7uy6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const { LevenshteinDistance } = require('natural'); 
const port = 3000;
app.use(express.json());
app.use(cors());


const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 }, 
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('textdata');
    const collection = db.collection('text1');

    // Endpoint to save the text and file
    app.post('/api/saveText', upload.single('file'), async (req, res) => {
      const { text } = req.body;
      let fileContent = null; // Initialize fileContent to null

      // If there is a file uploaded, read its content as text
      if (req.file) {
        try {
          fileContent = req.file.buffer.toString('utf-8'); // Read the file content as text
        } catch (error) {
          console.error('Error reading file content:', error);
          return res.status(500).json({ message: 'Error reading file content' });
        }
      }

      // Extract image tag from the text content
      const imageTagRegex = /<img[^>]+src="data:image\/[^"]+"[^>]*>/g;
      const imageTagMatch = text.match(imageTagRegex);
      const imageTag = imageTagMatch ? imageTagMatch[0] : null;

      // Remove image tag from the text content
      const cleanedText = text.replace(imageTagRegex, '');

      try {
        // Plagiarism check
        const newContent = cleanedText.toLowerCase();
        const savedTexts = await collection.find({}).toArray();
        let plagiarismCount = 0;
        for (const savedText of savedTexts) {
          const savedContent = savedText.text.toLowerCase();
          const similarity = 1 - LevenshteinDistance(newContent, savedContent) / Math.max(newContent.length, savedContent.length);
          if (similarity >= 0.8) { // Adjust the threshold as needed
            console.log(`Possible plagiarism with previous text (${similarity * 100}% similar)`);
            plagiarismCount++;
          }
        }

        const plagiarismPercentage = (plagiarismCount / savedTexts.length) * 100;
        console.log(`Plagiarism percentage: ${plagiarismPercentage.toFixed(2)}%`);

        // Insert the text, image content, and file content into the collection
        await collection.insertOne({ text: cleanedText, image: imageTag, fileContent });
        res.status(200).json({ message: 'Text, image, and file saved successfully', plagiarismPercentage });
      } catch (error) {
        console.error('Error saving text, image, and file:', error);
        res.status(500).json({ message: 'Error saving text, image, and file' });
      }
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
