
import React from 'react';
import { RagDocument } from '../types';
import { ChevronDownIcon } from './icons';

interface SourceDocumentsProps {
  sources: RagDocument[];
}

const SourceDocuments: React.FC<SourceDocumentsProps> = ({ sources }) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <details className="group bg-slate-800/50 rounded-lg overflow-hidden">
        <summary className="flex items-center justify-between p-3 cursor-pointer list-none">
          <span className="text-xs font-semibold text-sky-400">
            Retrieved Sources ({sources.length})
          </span>
          <ChevronDownIcon />
        </summary>
        <div className="p-3 border-t border-slate-700">
          <div className="space-y-3">
            {sources.map((doc) => (
              <div key={doc.id} className="p-3 bg-slate-900 rounded-md">
                <p className="text-xs text-slate-400 mb-1">
                  <strong>Source from:</strong> {doc.domain}
                </p>
                <p className="text-sm text-slate-200">
                  <strong className="font-semibold text-slate-400">Context:</strong> {doc.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
};

export default SourceDocuments;
