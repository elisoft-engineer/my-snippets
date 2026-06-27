import React, { useState, useEffect, useRef } from 'react';
import { Copy, Edit3, Trash2, Plus, Check } from 'lucide-react';
import './App.css';

interface Entry {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('my_snippets');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('my_snippets', JSON.stringify(entries));
  }, [entries]);

  // Global shortcut handler for clearing all when nothing is focused
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete') {
        const active = document.activeElement;
        // If the focused element is the body or container (nothing specific selected)
        if (active?.tagName === 'BODY' || active?.classList.contains('app-container')) {
          deleteAllEntries();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [entries]);

  const addOrUpdateEntry = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    if (editingId) {
      setEntries(entries.map(ent => ent.id === editingId ? { ...ent, text: inputValue } : ent));
      setEditingId(null);
    } else {
      const newEntry = { id: Date.now().toString(), text: inputValue };
      setEntries([newEntry, ...entries]);
    }
    setInputValue('');
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setInputValue(entry.text);
    inputRef.current?.focus();
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(ent => ent.id !== id));
  };

  const deleteAllEntries = () => {
    if (entries.length === 0) return;
    // Optional: Add window.confirm if you want a safety net, but "instantly" means instant!
    setEntries([]);
    setEditingId(null);
  };

  // Keyboard Shortcuts for individual focused items
  const handleKeyDown = (e: React.KeyboardEvent, entry: Entry) => {
    if (document.activeElement?.tagName === 'INPUT') return;
    
    if (e.key.toLowerCase() === 'e') handleEdit(entry);
    if (e.key === 'Delete') {
      e.stopPropagation(); // Stop global fallback from triggering
      deleteEntry(entry.id);
    }
  };

  return (
    <div className="app-container" tabIndex={-1}>
      <header>
        <h1>My<span>Snippets</span></h1>
        <p>Double-click to copy • 'E' to edit • 'DEL' to remove (Global 'DEL' clears all)</p>
      </header>

      <div className="list-container">
        {entries.map((entry) => (
          <div 
            key={entry.id} 
            className={`entry-card ${editingId === entry.id ? 'editing' : ''}`}
            onDoubleClick={() => copyToClipboard(entry.text, entry.id)}
            onKeyDown={(e) => handleKeyDown(e, entry)}
            tabIndex={0}
          >
            <div className="entry-content">{entry.text}</div>
            <div className="actions">
              <button onClick={() => copyToClipboard(entry.text, entry.id)} title="Copy">
                {copiedId === entry.id ? <Check size={18} color="#4ade80" /> : <Copy size={18} />}
              </button>
              <button onClick={() => handleEdit(entry)} title="Edit (E)">
                <Edit3 size={18} />
              </button>
              <button onClick={() => deleteEntry(entry.id)} title="Delete (Del)">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="input-floating-wrapper">
        <form className="input-area" onSubmit={addOrUpdateEntry}>
          <input
            ref={inputRef}
            type="text"
            placeholder={editingId ? "Update snippet..." : "Capture new snippet..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-btn">
            {editingId ? <Check /> : <Plus />}
          </button>
        </form>
      </div>

      {/* Floating Action Button for Purging Everything */}
      {entries.length > 0 && (
        <button 
          className="fab-delete-all" 
          onClick={deleteAllEntries} 
          title="Delete All Entries"
        >
          <Trash2 size={22} />
        </button>
      )}
    </div>
  );
};

export default App;
