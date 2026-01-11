import React, { useState, useEffect } from 'react';
import './App.css';

function HomeScreen({ onGetStarted }) {
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullText = "Secure Notes Locker";
  
  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="home-screen">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
        <div className="bg-circle circle-4"></div>
      </div>
      
      <div className="container">
        {/* Header with Logo */}
        <div className="header-section">
          <div className="logo">
            <div className="logo-icon">🔐</div>
            <div className="logo-text">
              <h1 className="title">
                {typedText}
                <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
              </h1>
              <p className="subtitle">Your Personal Encrypted Diary</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          <div className="left-section">
            <h2 className="tagline">
              <span className="highlight">Three-Layer</span> Protection for Your
              <span className="highlight"> Private Thoughts</span>
            </h2>
            
            <p className="description">
              Store your most sensitive notes with military-grade encryption. 
              Combining historical and modern cryptography for ultimate security.
            </p>
            
            <div className="stats">
              <div className="stat">
                <div className="stat-number">3</div>
                <div className="stat-text">Encryption Layers</div>
              </div>
              <div className="stat">
                <div className="stat-number">🔒</div>
                <div className="stat-text">AES-256 Secure</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-text">Unlimited Notes</div>
              </div>
            </div>
            
            <button className="get-started-btn" onClick={onGetStarted}>
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Get Started Now</span>
              <span className="btn-arrow">→</span>
            </button>
            
            <div className="security-badge">
              <div className="shield-icon">🛡️</div>
              <span>End-to-End Encrypted • No Data Stored in Plaintext</span>
            </div>
          </div>
          
          <div className="right-section">
            {/* Feature Cards */}
            <div className="features-grid">
              <div className="feature-card historical">
                <div className="feature-header">
                  <div className="feature-icon">⚔️</div>
                  <h3>Historical Ciphers</h3>
                </div>
                <p className="feature-description">
                  Experience ancient encryption methods used by kings and generals throughout history.
                </p>
                <div className="feature-ciphers">
                  <span className="cipher-tag">Caesar Cipher</span>
                  <span className="cipher-tag">Vigenère Cipher</span>
                </div>
              </div>
              
              <div className="feature-card modern">
                <div className="feature-header">
                  <div className="feature-icon">⚡</div>
                  <h3>Modern Encryption</h3>
                </div>
                <p className="feature-description">
                  State-of-the-art AES-256 encryption, the same standard used by banks and governments.
                </p>
                <div className="feature-tags">
                  <span className="tag secure">Military Grade</span>
                  <span className="tag fast">Lightning Fast</span>
                </div>
              </div>
              
              <div className="feature-card educational">
                <div className="feature-header">
                  <div className="feature-icon">🎓</div>
                  <h3>Learn & Explore</h3>
                </div>
                <p className="feature-description">
                  Watch encryption in action with step-by-step demonstrations of each cipher.
                </p>
                <div className="feature-tags">
                  <span className="tag interactive">Interactive Demo</span>
                  <span className="tag visual">Visual Guide</span>
                </div>
              </div>
              
              <div className="feature-card secure">
                <div className="feature-header">
                  <div className="feature-icon">🔐</div>
                  <h3>Complete Privacy</h3>
                </div>
                <p className="feature-description">
                  Your notes are encrypted before saving. Only you can decrypt them with your password.
                </p>
                <div className="feature-tags">
                  <span className="tag private">Zero-Knowledge</span>
                  <span className="tag offline">Client-Side</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="how-it-works">
          <h2 className="section-title">
            <span className="section-icon">🔒</span>
            How It Works
          </h2>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Write Your Note</h3>
                <p>Type your private thoughts in plain text</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Choose Encryption</h3>
                <p>Select from historical or modern ciphers</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Set Password</h3>
                <p>Create a strong encryption key</p>
              </div>
              <div className="step-arrow">→</div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Save Securely</h3>
                <p>Your note gets encrypted and stored safely</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="footer">
          <p className="footer-text">
            <span className="footer-highlight">🔒 Cryptography Project</span> • 
            Demonstrating Classical & Modern Encryption Techniques
          </p>
          <p className="footer-note">
            This is an educational project. For production use, consult security experts.
          </p>
        </div>
      </div>
    </div>
  );
}

// Keep your other components (NotesScreen, DemoScreen, App) exactly as they were...
function DemoScreen({ onBack }) {
  const [demoText, setDemoText] = useState('Hello World');
  const [demoPassword, setDemoPassword] = useState('demo123');
  const [selectedCipher, setSelectedCipher] = useState('all'); // 'caesar', 'vigenere', 'aes', 'all'
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const showDemo = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: demoText, 
          password: demoPassword,
          cipher: selectedCipher 
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setSteps(data.steps);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    showDemo();
  }, []);
  
  return (
    <div className="demo-screen">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← Back to Notes</button>
        <h2>🔐 Encryption Demonstration</h2>
      </div>
      
      <div className="demo-container">
        <div className="demo-input">
          <h3>Try It Yourself</h3>
          
          <div className="form-group">
            <label>Select Cipher:</label>
            <select 
              value={selectedCipher}
              onChange={(e) => setSelectedCipher(e.target.value)}
              className="cipher-select"
            >
              <option value="all">All Three Ciphers (Default)</option>
              <option value="caesar">Caesar Cipher Only</option>
              <option value="vigenere">Vigenère Cipher Only</option>
              <option value="aes">AES-256 Only</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Text to encrypt:</label>
            <input
              type="text"
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Encryption Password:</label>
            <input
              type="password"
              value={demoPassword}
              onChange={(e) => setDemoPassword(e.target.value)}
            />
          </div>
          
          <button 
            className="demo-action-btn"
            onClick={showDemo}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Show Encryption Steps'}
          </button>
        </div>
        
        <div className="demo-steps">
          <h3>Encryption Process</h3>
          
          {selectedCipher === 'all' && (
            <>
              <div className="step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h4>Caesar Cipher</h4>
                </div>
                <p>Each letter shifted by 7 positions in the alphabet</p>
                <div className="step-output">
                  {steps[0] && <div><strong>Original:</strong> {steps[0].replace('Original: ', '')}</div>}
                  {steps[1] && <div><strong>After Caesar:</strong> {steps[1].replace('Caesar: ', '')}</div>}
                </div>
              </div>
              
              <div className="step">
                <div className="step-header">
                  <span className="step-number">2</span>
                  <h4>Vigenère Cipher</h4>
                </div>
                <p>Uses keyword "SECUREKEY123" for variable shifting</p>
                <div className="step-output">
                  {steps[2] && <div><strong>After Vigenère:</strong> {steps[2].replace('Vigenère: ', '')}</div>}
                </div>
              </div>
              
              <div className="step">
                <div className="step-header">
                  <span className="step-number">3</span>
                  <h4>AES-256 Encryption</h4>
                </div>
                <p>Military-grade encryption with your password</p>
                <div className="step-output">
                  {steps[3] && <div><strong>Final (Base64):</strong> {steps[3].replace('AES (Base64): ', '')}</div>}
                </div>
              </div>
            </>
          )}
          
          {selectedCipher === 'caesar' && (
            <div className="step">
              <div className="step-header">
                <span className="step-number">1</span>
                <h4>Caesar Cipher Only</h4>
              </div>
              <p>Each letter shifted by 7 positions in the alphabet</p>
              <div className="step-output">
                {steps[0] && <div><strong>Original:</strong> {steps[0].replace('Original: ', '')}</div>}
                {steps[1] && <div><strong>After Caesar:</strong> {steps[1].replace('Caesar: ', '')}</div>}
                <div className="cipher-warning">
                  ⚠️ Caesar cipher alone is very weak and easily breakable!
                </div>
              </div>
            </div>
          )}
          
          {selectedCipher === 'vigenere' && (
            <div className="step">
              <div className="step-header">
                <span className="step-number">1</span>
                <h4>Vigenère Cipher Only</h4>
              </div>
              <p>Uses keyword "SECUREKEY123" for variable shifting</p>
              <div className="step-output">
                {steps[0] && <div><strong>Original:</strong> {steps[0].replace('Original: ', '')}</div>}
                {steps[1] && <div><strong>After Vigenère:</strong> {steps[1].replace('Vigenère: ', '')}</div>}
                <div className="cipher-warning">
                  ⚠️ Vigenère cipher is a classical cipher that can be broken with modern techniques!
                </div>
              </div>
            </div>
          )}
          
          {selectedCipher === 'aes' && (
            <div className="step">
              <div className="step-header">
                <span className="step-number">1</span>
                <h4>AES-256 Encryption Only</h4>
              </div>
              <p>Military-grade encryption with your password</p>
              <div className="step-output">
                {steps[0] && <div><strong>Original:</strong> {steps[0].replace('Original: ', '')}</div>}
                {steps[1] && <div><strong>After AES (Base64):</strong> {steps[1].replace('AES (Base64): ', '')}</div>}
                <div className="cipher-success">
                  ✅ AES-256 is the modern standard used worldwide for secure encryption!
                </div>
              </div>
            </div>
          )}
          
          <div className="cipher-info">
            <h4>About the Ciphers:</h4>
            <ul>
              <li><strong>Caesar:</strong> Historical cipher used by Julius Caesar (100 BC) - Very weak</li>
              <li><strong>Vigenère:</strong> Classical cipher considered unbreakable for 300 years - Medium security</li>
              <li><strong>AES-256:</strong> Modern encryption standard used by governments worldwide - Very strong</li>
            </ul>
            <p className="note">For real security, always use AES-256 with proper key management.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotesScreen({ onBack, onShowDemo }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ 
    title: '', 
    content: '', 
    password: '',
    selectedCipher: 'all' // Default: use all ciphers
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [decryptPasswords, setDecryptPasswords] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState({});
  const [showCipherInfo, setShowCipherInfo] = useState(false);
  
  const API_URL = 'http://localhost:5000/api';
  
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes`);
      const data = await response.json();
      if (data.success) {
        setNotes(data.notes);
        const initialShowEncrypted = {};
        const initialPasswords = {};
        data.notes.forEach(note => {
          initialShowEncrypted[note.id] = false;
          initialPasswords[note.id] = '';
        });
        setShowEncrypted(initialShowEncrypted);
        setDecryptPasswords(initialPasswords);
      }
    } catch (error) {
      setMessage('Error fetching notes');
    }
  };
  
  const handleCreateNote = async () => {
    if (!newNote.content.trim()) {
      setMessage('Please enter note content');
      return;
    }
    if (!newNote.password.trim()) {
      setMessage('Password is required for encryption');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });
      
      const data = await response.json();
      if (data.success) {
        setMessage(`Note encrypted with ${getCipherName(newNote.selectedCipher)} and saved successfully!`);
        setNewNote({ title: '', content: '', password: '', selectedCipher: 'all' });
        fetchNotes();
      } else {
        setMessage(data.error || 'Error saving note');
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };
  
  const getCipherName = (cipherCode) => {
    switch(cipherCode) {
      case 'all': return 'All Three Ciphers';
      case 'caesar': return 'Caesar Cipher Only';
      case 'vigenere': return 'Vigenère Cipher Only';
      case 'aes': return 'AES-256 Only';
      default: return 'All Ciphers';
    }
  };
  
  const handlePasswordChange = (noteId, password) => {
    setDecryptPasswords({
      ...decryptPasswords,
      [noteId]: password
    });
  };
  
  const toggleShowEncrypted = async (noteId) => {
    if (!showEncrypted[noteId]) {
      try {
        const response = await fetch(`${API_URL}/notes/${noteId}/encrypted`);
        const data = await response.json();
        if (data.success) {
          const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
              return { ...note, encryptedContent: data.encrypted_content };
            }
            return note;
          });
          setNotes(updatedNotes);
          setShowEncrypted({ ...showEncrypted, [noteId]: true });
        }
      } catch (error) {
        setMessage('Error fetching encrypted content');
      }
    } else {
      setShowEncrypted({ ...showEncrypted, [noteId]: false });
    }
  };
  
  const handleViewNote = async (noteId) => {
    const password = decryptPasswords[noteId];
    
    if (!password) {
      setMessage('Enter password to decrypt');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password })
      });
      
      const data = await response.json();
      if (data.success) {
        setSelectedNote(data.note);
        setMessage('✅ Note decrypted successfully!');
        setShowEncrypted({ ...showEncrypted, [noteId]: false });
        handlePasswordChange(noteId, '');
      } else {
        setMessage('❌ Wrong password! Note remains encrypted.');
        setSelectedNote(null);
      }
    } catch (error) {
      setMessage('Error connecting to server');
    }
    setLoading(false);
  };
  
  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        const response = await fetch(`${API_URL}/notes/${noteId}`, {
          method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
          setMessage('Note deleted');
          setSelectedNote(null);
          fetchNotes();
        }
      } catch (error) {
        setMessage('Error deleting note');
      }
    }
  };
  
  useEffect(() => {
    fetchNotes();
  }, []);
  
  return (
    <div className="notes-screen">
      <div className="header">
        <button className="back-btn" onClick={onBack}>← Back to Home</button>
        <h2>🔐 Secure Notes Locker</h2>
        <button className="demo-btn" onClick={onShowDemo}>See Encryption Demo</button>
      </div>
      
      <div className="notes-container">
        <div className="create-note-section">
          <div className="section-header-with-info">
            <h3>Create New Note</h3>
            <button 
              className="info-btn"
              onClick={() => setShowCipherInfo(!showCipherInfo)}
            >
              ℹ️ Cipher Info
            </button>
          </div>
          
          {showCipherInfo && (
            <div className="cipher-selection-info">
              <h4>Choose Encryption Method:</h4>
              <ul>
                <li><strong>All Three Ciphers:</strong> Caesar → Vigenère → AES (Most Secure)</li>
                <li><strong>Caesar Only:</strong> Historical, very weak - for demonstration only</li>
                <li><strong>Vigenère Only:</strong> Classical, medium security</li>
                <li><strong>AES Only:</strong> Modern, military-grade encryption</li>
              </ul>
            </div>
          )}
          
          <div className="form-group">
            <label>Title (optional):</label>
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote({...newNote, title: e.target.value})}
              placeholder="My Secret Note"
            />
          </div>
          
          <div className="form-group">
            <label>Your Note (Plain Text):</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              placeholder="Write your private note here..."
              rows="6"
            />
          </div>
          
          <div className="form-group">
            <label>Select Encryption Method:</label>
            <select 
              value={newNote.selectedCipher}
              onChange={(e) => setNewNote({...newNote, selectedCipher: e.target.value})}
              className="cipher-select"
            >
              <option value="all">All Three Ciphers (Most Secure)</option>
              <option value="caesar">Caesar Cipher Only (Historical)</option>
              <option value="vigenere">Vigenère Cipher Only (Classical)</option>
              <option value="aes">AES-256 Only (Modern)</option>
            </select>
            <small className="cipher-hint">
              {newNote.selectedCipher === 'all' && '✅ Maximum security: Caesar → Vigenère → AES'}
              {newNote.selectedCipher === 'caesar' && '⚠️ Very weak - for demonstration only!'}
              {newNote.selectedCipher === 'vigenere' && '⚠️ Medium security - classical cipher'}
              {newNote.selectedCipher === 'aes' && '✅ Modern standard - highly secure'}
            </small>
          </div>
          
          <div className="form-group">
            <label>Encryption Password:</label>
            <input
              type="password"
              value={newNote.password}
              onChange={(e) => setNewNote({...newNote, password: e.target.value})}
              placeholder="Enter strong password"
            />
            <small className="password-hint">
              ⚠️ Remember this password! It cannot be recovered.
            </small>
          </div>
          
          <button 
            className="save-btn"
            onClick={handleCreateNote}
            disabled={loading}
          >
            {loading ? 'Encrypting...' : `🔒 Encrypt with ${getCipherName(newNote.selectedCipher)}`}
          </button>
          
          {message && <div className={`message ${message.includes('✅') ? 'success' : message.includes('❌') ? 'error' : ''}`}>
            {message}
          </div>}
        </div>
        
        <div className="notes-list-section">
          <div className="section-header">
            <h3>Your Saved Notes</h3>
            <button className="refresh-btn" onClick={fetchNotes}>Refresh</button>
          </div>
          
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first secure note!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <div>
                      <h4>{note.title || 'Untitled Note'}</h4>
                      {note.cipher && (
                        <span className="cipher-badge">
                          {getCipherName(note.cipher)}
                        </span>
                      )}
                    </div>
                    <span className="note-date">Created: {note.created_at}</span>
                  </div>
                  
                  <div className="note-content-area">
                    {showEncrypted[note.id] ? (
                      <div className="encrypted-content">
                        <div className="encrypted-header">
                          <span className="encrypted-label">🔐 ENCRYPTED TEXT:</span>
                          <button 
                            className="hide-btn"
                            onClick={() => toggleShowEncrypted(note.id)}
                          >
                            Hide
                          </button>
                        </div>
                        <div className="encrypted-text">
                          {note.encryptedContent 
                            ? note.encryptedContent.substring(0, 100) + '...'
                            : 'Loading encrypted content...'}
                        </div>
                        <small className="encrypted-hint">
                          This is what others see without password
                        </small>
                      </div>
                    ) : (
                      <div className="locked-content">
                        <div className="locked-icon">🔒</div>
                        <p className="locked-text">Content is locked with encryption</p>
                        <button 
                          className="show-encrypted-btn"
                          onClick={() => toggleShowEncrypted(note.id)}
                        >
                          Show Encrypted Text
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="note-actions">
                    <div className="decrypt-section">
                      <input
                        type="password"
                        placeholder="Enter password to decrypt"
                        value={decryptPasswords[note.id] || ''}
                        onChange={(e) => handlePasswordChange(note.id, e.target.value)}
                        className="decrypt-input"
                      />
                      <button 
                        className="decrypt-btn"
                        onClick={() => handleViewNote(note.id)}
                        disabled={!decryptPasswords[note.id]}
                      >
                        Decrypt
                      </button>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {selectedNote && (
            <div className="note-viewer">
              <div className="viewer-header">
                <h3>📄 {selectedNote.title || 'Decrypted Note'}</h3>
                <button 
                  className="close-btn"
                  onClick={() => setSelectedNote(null)}
                >
                  ✕
                </button>
              </div>
              <div className="decrypted-content">
                <div className="content-header">
                  <span className="decrypted-label">✅ DECRYPTED CONTENT:</span>
                  {selectedNote.cipher && (
                    <span className="cipher-used">
                      Encrypted with: {getCipherName(selectedNote.cipher)}
                    </span>
                  )}
                </div>
                <div className="actual-text">
                  {selectedNote.content}
                </div>
              </div>
              <div className="note-meta">
                <p>Created: {selectedNote.created_at}</p>
                <div className="security-info">
                  <span className="security-badge">🔓 Decrypted with correct password</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  
  return (
    <div className="App">
      {currentScreen === 'home' && <HomeScreen onGetStarted={() => setCurrentScreen('notes')} />}
      {currentScreen === 'notes' && <NotesScreen onBack={() => setCurrentScreen('home')} onShowDemo={() => setCurrentScreen('demo')} />}
      {currentScreen === 'demo' && <DemoScreen onBack={() => setCurrentScreen('notes')} />}
    </div>
  );
}

export default App;