import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import hashlib
import os

class CaesarCipher:
    def __init__(self, shift=7):
        self.shift = shift % 26
    
    def encrypt(self, text):
        result = ""
        for char in text:
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                result += chr((ord(char) - shift_base + self.shift) % 26 + shift_base)
            else:
                result += char
        return result
    
    def decrypt(self, text):
        result = ""
        for char in text:
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                result += chr((ord(char) - shift_base - self.shift) % 26 + shift_base)
            else:
                result += char
        return result

class VigenereCipher:
    def __init__(self, key="SECUREKEY"):
        self.key = key.upper()
    
    def _extend_key(self, length):
        return (self.key * (length // len(self.key) + 1))[:length]
    
    def encrypt(self, text):
        result = ""
        key = self._extend_key(len(text))
        
        for i, char in enumerate(text):
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                key_shift = ord(key[i]) - 65
                result += chr((ord(char) - shift_base + key_shift) % 26 + shift_base)
            else:
                result += char
        return result
    
    def decrypt(self, text):
        result = ""
        key = self._extend_key(len(text))
        
        for i, char in enumerate(text):
            if char.isalpha():
                shift_base = 65 if char.isupper() else 97
                key_shift = ord(key[i]) - 65
                result += chr((ord(char) - shift_base - key_shift) % 26 + shift_base)
            else:
                result += char
        return result

class AESCipher:
    def __init__(self, key):
        # Derive 32-byte key from password
        self.key = hashlib.sha256(key.encode()).digest()
    
    def encrypt(self, plaintext):
        # Generate random IV
        iv = os.urandom(16)
        
        # Pad the plaintext
        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(plaintext.encode()) + padder.finalize()
        
        # Create cipher
        cipher = Cipher(algorithms.AES(self.key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        
        # Encrypt
        ciphertext = encryptor.update(padded_data) + encryptor.finalize()
        
        # Return IV + ciphertext (will be encoded to base64)
        return base64.b64encode(iv + ciphertext).decode('utf-8')
    
    def decrypt(self, encrypted_data):
        # Decode from base64
        data = base64.b64decode(encrypted_data)
        
        # Extract IV and ciphertext
        iv = data[:16]
        ciphertext = data[16:]
        
        # Create cipher
        cipher = Cipher(algorithms.AES(self.key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        
        # Decrypt
        padded_plaintext = decryptor.update(ciphertext) + decryptor.finalize()
        
        # Unpad
        unpadder = padding.PKCS7(128).unpadder()
        plaintext = unpadder.update(padded_plaintext) + unpadder.finalize()
        
        return plaintext.decode('utf-8')

class EncryptionEngine:
    def __init__(self, password):
        self.caesar = CaesarCipher(shift=7)
        self.vigenere = VigenereCipher(key="SECUREKEY123")
        self.aes = AESCipher(password)
    
    def encrypt_note(self, text):
        # Three-layer encryption
        layer1 = self.caesar.encrypt(text)
        layer2 = self.vigenere.encrypt(layer1)
        layer3 = self.aes.encrypt(layer2)
        return layer3
    
    def decrypt_note(self, encrypted_text):
        # Three-layer decryption
        layer3 = self.aes.decrypt(encrypted_text)
        layer2 = self.vigenere.decrypt(layer3)
        layer1 = self.caesar.decrypt(layer2)
        return layer1
    
    def demonstrate_encryption(self, text):
        """For educational purposes - show each step"""
        steps = []
        steps.append(f"Original: {text}")
        steps.append(f"Caesar: {self.caesar.encrypt(text)}")
        steps.append(f"Vigenère: {self.vigenere.encrypt(self.caesar.encrypt(text))}")
        steps.append(f"AES (Base64): {self.aes.encrypt(self.vigenere.encrypt(self.caesar.encrypt(text)))}")
        return steps