from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import os

# Import the ciphers
from ciphers import EncryptionEngine, CaesarCipher, VigenereCipher, AESCipher

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Simple in-memory storage (for demo purposes)
# In production, use a database
notes_storage = {}
notes_counter = 1

@app.route('/')
def home():
    return jsonify({
        "message": "Secure Notes Locker API",
        "version": "1.0",
        "endpoints": {
            "create_note": "/api/notes (POST)",
            "get_notes": "/api/notes (GET)",
            "get_note": "/api/notes/<id> (POST with password)",
            "delete_note": "/api/notes/<id> (DELETE)",
            "get_encrypted": "/api/notes/<id>/encrypted (GET)",
            "demo": "/api/demo (POST)"
        }
    })

@app.route('/api/notes', methods=['POST'])
def create_note():
    global notes_counter
    try:
        data = request.json
        title = data.get('title', 'Untitled')
        content = data.get('content', '')
        password = data.get('password', '')
        cipher_type = data.get('selectedCipher', 'all')  # 'all', 'caesar', 'vigenere', 'aes'
        
        if not password:
            return jsonify({"error": "Password is required"}), 400
        
        # Encrypt the note with selected cipher
        if cipher_type == 'all':
            # Use all three ciphers (default)
            engine = EncryptionEngine(password)
            encrypted_content = engine.encrypt_note(content)
        elif cipher_type == 'caesar':
            # Caesar cipher only
            caesar = CaesarCipher(shift=7)
            encrypted_content = caesar.encrypt(content)
        elif cipher_type == 'vigenere':
            # Vigenère cipher only
            vigenere = VigenereCipher(key="SECUREKEY123")
            encrypted_content = vigenere.encrypt(content)
        elif cipher_type == 'aes':
            # AES only
            aes = AESCipher(password)
            encrypted_content = aes.encrypt(content)
        else:
            # Default to all ciphers
            engine = EncryptionEngine(password)
            encrypted_content = engine.encrypt_note(content)
        
        # Store the note
        note_id = str(notes_counter)
        notes_storage[note_id] = {
            'id': note_id,
            'title': title,
            'encrypted_content': encrypted_content,
            'cipher': cipher_type,
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        notes_counter += 1
        
        return jsonify({
            "success": True,
            "id": note_id,
            "message": f"Note encrypted with {cipher_type} and saved"
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes', methods=['GET'])
def get_notes():
    """Get list of notes (titles only, no content)"""
    notes_list = []
    for note_id, note in notes_storage.items():
        notes_list.append({
            'id': note_id,
            'title': note['title'],
            'cipher': note.get('cipher', 'all'),  # Include cipher type
            'created_at': note['created_at']
        })
    
    return jsonify({
        "success": True,
        "count": len(notes_list),
        "notes": notes_list
    })

@app.route('/api/notes/<note_id>', methods=['POST'])
def get_note(note_id):
    """Get and decrypt a specific note"""
    try:
        if note_id not in notes_storage:
            return jsonify({"error": "Note not found"}), 404
        
        data = request.json
        password = data.get('password', '')
        
        if not password:
            return jsonify({"error": "Password is required"}), 400
        
        # Get encrypted note
        note = notes_storage[note_id]
        encrypted_content = note['encrypted_content']
        cipher_type = note.get('cipher', 'all')
        
        # Try to decrypt based on cipher type
        decrypted_content = ""
        
        if cipher_type == 'all':
            # Use all three ciphers
            engine = EncryptionEngine(password)
            decrypted_content = engine.decrypt_note(encrypted_content)
        elif cipher_type == 'caesar':
            # Caesar cipher only
            caesar = CaesarCipher(shift=7)
            decrypted_content = caesar.decrypt(encrypted_content)
        elif cipher_type == 'vigenere':
            # Vigenère cipher only
            vigenere = VigenereCipher(key="SECUREKEY123")
            decrypted_content = vigenere.decrypt(encrypted_content)
        elif cipher_type == 'aes':
            # AES only
            aes = AESCipher(password)
            decrypted_content = aes.decrypt(encrypted_content)
        else:
            # Default to all ciphers
            engine = EncryptionEngine(password)
            decrypted_content = engine.decrypt_note(encrypted_content)
        
        return jsonify({
            "success": True,
            "note": {
                'id': note_id,
                'title': note['title'],
                'content': decrypted_content,
                'cipher': cipher_type,
                'created_at': note['created_at']
            }
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Decryption failed. Wrong password or corrupted data."
        }), 400

@app.route('/api/notes/<note_id>/encrypted', methods=['GET'])
def get_encrypted_note(note_id):
    """Get encrypted content (gibberish) of a note"""
    try:
        if note_id not in notes_storage:
            return jsonify({"error": "Note not found"}), 404
        
        note = notes_storage[note_id]
        
        return jsonify({
            "success": True,
            "encrypted_content": note['encrypted_content'],
            "title": note['title'],
            "cipher": note.get('cipher', 'all')
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/notes/<note_id>', methods=['DELETE'])
def delete_note(note_id):
    try:
        if note_id in notes_storage:
            del notes_storage[note_id]
            return jsonify({
                "success": True,
                "message": "Note deleted"
            })
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/demo', methods=['POST'])
def demo_encryption():
    """Show step-by-step encryption for educational purposes"""
    try:
        data = request.json
        text = data.get('text', 'Hello World')
        password = data.get('password', 'demo123')
        cipher_type = data.get('cipher', 'all')  # 'all', 'caesar', 'vigenere', 'aes'
        
        steps = []
        steps.append(f"Original: {text}")
        
        if cipher_type == 'all':
            # Show all three steps
            caesar = CaesarCipher(shift=7)
            vigenere = VigenereCipher(key="SECUREKEY123")
            aes = AESCipher(password)
            
            caesar_encrypted = caesar.encrypt(text)
            steps.append(f"Caesar: {caesar_encrypted}")
            
            vigenere_encrypted = vigenere.encrypt(caesar_encrypted)
            steps.append(f"Vigenère: {vigenere_encrypted}")
            
            aes_encrypted = aes.encrypt(vigenere_encrypted)
            steps.append(f"AES (Base64): {aes_encrypted}")
            
        elif cipher_type == 'caesar':
            # Caesar cipher only
            caesar = CaesarCipher(shift=7)
            caesar_encrypted = caesar.encrypt(text)
            steps.append(f"Caesar: {caesar_encrypted}")
            
        elif cipher_type == 'vigenere':
            # Vigenère cipher only
            vigenere = VigenereCipher(key="SECUREKEY123")
            vigenere_encrypted = vigenere.encrypt(text)
            steps.append(f"Vigenère: {vigenere_encrypted}")
            
        elif cipher_type == 'aes':
            # AES only
            aes = AESCipher(password)
            aes_encrypted = aes.encrypt(text)
            steps.append(f"AES (Base64): {aes_encrypted}")
        
        # Get cipher name for display
        cipher_names = {
            'all': 'All Three Ciphers',
            'caesar': 'Caesar Cipher Only',
            'vigenere': 'Vigenère Cipher Only',
            'aes': 'AES-256 Only'
        }
        
        cipher_explanations = {
            'all': {
                "caesar": "Each letter shifted by 7 positions",
                "vigenere": "Uses keyword 'SECUREKEY123' for variable shift",
                "aes": "AES-256 with CBC mode, password hashed with SHA-256"
            },
            'caesar': {
                "caesar": "Each letter shifted by 7 positions. Historical cipher used by Julius Caesar."
            },
            'vigenere': {
                "vigenere": "Uses keyword 'SECUREKEY123' for variable shifting. Classical polyalphabetic cipher."
            },
            'aes': {
                "aes": "AES-256 with CBC mode, password hashed with SHA-256. Modern military-grade encryption."
            }
        }
        
        return jsonify({
            "success": True,
            "steps": steps,
            "cipher_used": cipher_names.get(cipher_type, 'All Three Ciphers'),
            "explanation": cipher_explanations.get(cipher_type, cipher_explanations['all'])
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy", 
        "service": "Secure Notes Locker API",
        "notes_count": len(notes_storage),
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

@app.route('/api/ciphers', methods=['GET'])
def get_ciphers():
    """Get information about available ciphers"""
    return jsonify({
        "success": True,
        "ciphers": [
            {
                "id": "all",
                "name": "All Three Ciphers",
                "description": "Caesar → Vigenère → AES (Most Secure)",
                "strength": "Very Strong",
                "use_case": "Maximum security for sensitive data"
            },
            {
                "id": "caesar",
                "name": "Caesar Cipher",
                "description": "Historical cipher used by Julius Caesar (100 BC)",
                "strength": "Very Weak",
                "use_case": "Educational purposes only - easily breakable"
            },
            {
                "id": "vigenere",
                "name": "Vigenère Cipher",
                "description": "Classical polyalphabetic substitution cipher",
                "strength": "Medium",
                "use_case": "Historical interest - can be broken with modern techniques"
            },
            {
                "id": "aes",
                "name": "AES-256",
                "description": "Advanced Encryption Standard (256-bit key)",
                "strength": "Very Strong",
                "use_case": "Modern secure encryption used worldwide"
            }
        ]
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🔐 Secure Notes Locker API starting...")
    print(f"📝 Available ciphers: All Three, Caesar Only, Vigenère Only, AES Only")
    print(f"🌐 Server running on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)