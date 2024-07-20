import admin from 'firebase-admin';
import dotenv from "dotenv"
dotenv.config()

const serviceAccount = {
  "type": "service_account",
  "project_id": "visionary-9f018",
  "private_key_id": "ba816815ab067f86ac49e62d97d40fd85a23e4a8",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDXsgG2WRTMFk9H\nDTKQYxzzbv7w/R2bvtJJNRs/RmBmp7qEvSB/1yCE9bKIUKiUIWsIfK1+aYQVrymK\nnHfg2GkoRRFrg55ebLC1hgIWzJeYaO2ZkfA2ygK7l1R4w4bAKT6/8ytga0WAzV2O\nJkjq8ZYadQf2AZUHG6OVbqqJOBU/dmbYt1Tk2FeILI/W97FgPLvQcqSVVFgvuVQZ\nNnETxHQvaKl/DLh2ls2j2GhNEiYEt5XNBJBeGvBmZyaDws6cf4VQv8PE0/tPfoah\neGXYknUYJeiIDaTfR2+0khNutKPIof7ryWr3Wdh6XGSJNPMTbUSn7tb6uT4QRX60\nreZoJXFXAgMBAAECggEAAcMStftDDKbplTH0FrzQHWpyf1a9yX5yaOZERDBFGBGW\nRzZ5W5i6t0chSCBsV7OLqLZM3cmaPp+8HGc86+Hs53ZCPfX4Bx60LqJh0z/1qbNi\nk2Xze/u6Dp6ricYQz7xrkmLm/epv5JkMP3Heg6zRwsX9VxR/LQ6i2VvC6vuf/JmO\n9HzgKJDhSyMW+bDJnCho5hfTdcc0kx0Cik14+o8P78Hf/wIGpcX4BHD9JKlDG5ub\nRbEh3XBcD1ip6sx/EXO1NkYHWMTn5m1AWqS0N9udHNyPNJGNW/GghSUANu2aIC5i\nPhj9yNccFQwBHdqaDHXxF9SS+9DQFWQKYnsm+w18oQKBgQD5h+1QBIhlVbssPBle\ngchgBPRdxS1YM+s+/oOz0a05Wd1ZxXm//4j6CoZj1cvuTRQAmxcQK81bXwt2Va2t\n2oFuBvqUMZhaN9xNQ/U36jHs/1SVO1tyfbwfxHkwuCy9DTXBgg2YNuFY73jtgHPN\nx2Wfa6dcDZhgya3jfq1C+d4GOwKBgQDdSYV074UdrXpYXBBjbgx3fW47edAa9h1S\nvXkZDYWtjoMS5tBkYIL0K50p7lKCTKOdbtcP7f4khXOlqlyD4//wFjA6HbuPl9aM\n+HBLddtJJzgTcJMTD/vwlpSPsgnDWaGkq4jXNiCTgC0gYET3o520MWpGSqVkbTCH\nR+QnqVljlQKBgHDN5RdmZS7CWfI+XQ2fSDE4LCxz5fLYzcFVl75jzJZ/rJRXtJl6\ncLbwqR5a2W0qRR+c/QkfdB+ZUPo282QDwr01xHPYE9K9LAd18FZNtjI4n0kzYzzX\n4ILP9CV1LSxt215WZ8TnEmp9H8LmbfOZ77PpG+h+cONYaRbN/o+nm5pfAoGAeq3g\n5BRJ+0sKsePQXh9LoA8UxrpgqiHZ3d4XPdFmU/LXLepyi8OJti5bwjxS19P/PS+O\n4VDy/XJSy/xnr+L+KC9U61NCgXgPRTYSo3MicCrjBrv5fa714MrKb+OnT/roB2/l\nvFJQuxVrbzCP6650pspifbeye7uhFM7BaU+UtAUCgYA5JRNGi83Ciw8y/mtjXP1r\nzM9Emp++i1wYZAR5sNeRkbcSPfzdSY5k1jyV8adwKFkZuJEDJa4Hoh5X95TYFPbG\nJmfkAMzw1kEz9IdLwX+cI+4vl/zyxlhSQ1lO7TTqSQPddE6n1wUIpz2nN7GzIvRx\nApY2seU8MAR4M38RNHQ6uQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-k9wr7@visionary-9f018.iam.gserviceaccount.com",
  "client_id": "117732565804773679354",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k9wr7%40visionary-9f018.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.storageBucket, 
});

export default admin;
