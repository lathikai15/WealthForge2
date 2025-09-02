from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

API_KEY = "d4eac0b7-866d-11f0-a562-0200cd936042"  # Your 2Factor.in API key

# Send OTP
@app.route("/send-otp", methods=["POST"])
def send_otp():
    data = request.json
    phone = data.get("phone")
    url = f"https://2factor.in/API/V1/{API_KEY}/SMS/{phone}/AUTOGEN"
    try:
        response = requests.get(url)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Verify OTP
@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    data = request.json
    session_id = data.get("sessionId")
    otp = data.get("otp")
    url = f"https://2factor.in/API/V1/{API_KEY}/SMS/VERIFY/{session_id}/{otp}"
    try:
        response = requests.get(url)
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
