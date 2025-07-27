import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "langchain/document";
import { fileURLToPath } from "url";
import path from "path";

const embeddingModel = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

// documentPreprocessor (text parsing)
// (**hidden**)

interface InsertCollectionData {
  documents: string[];
  ids: { id: number; metaPage?: any; documentName: string }[];
}

export interface queryRag {
  text: string
}

// insert to Vector DB (embedding)
// (**hidden**)

export async function getFromCollection(directory: string, query: queryRag): Promise<[Document, number][] | null> {
  
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const vectorStorePath = path.join(__dirname, '/vectorstore');

  try {

    const loadedVectorStore = await FaissStore.load(vectorStorePath, embeddingModel);

    const maxFetchCount = 20;       
    const scoreThreshold = 1.5;

    const results = await loadedVectorStore.similaritySearchWithScore(query.text, maxFetchCount);

    const validResults = results.filter(([_, score]) => score < scoreThreshold);

    return validResults;
  } catch (err) {

    throw new Error("Failed to Access Vector DB. " + err + " CWD: " + vectorStorePath, { cause: err });
    console.error("Query error:", err);
    return null;
  }
}

