
import { RAG_BENCH_DATA } from '../data/ragbench';
import { RagDocument, Domain } from '../types';

const retrieve = (query: string, domain: Domain | null, topK: number = 2): RagDocument[] => {
  const queryWords = new Set(query.toLowerCase().split(/\s+/).filter(w => w.length > 2));

  const filteredDocs = domain 
    ? RAG_BENCH_DATA.filter(doc => doc.domain === domain)
    : RAG_BENCH_DATA;

  const scoredDocs = filteredDocs.map(doc => {
    const content = `${doc.question} ${doc.context}`.toLowerCase();
    let score = 0;
    queryWords.forEach(word => {
      if (content.includes(word)) {
        score++;
      }
    });
    return { ...doc, score };
  });

  return scoredDocs
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};

export const ragService = {
  retrieve,
};
