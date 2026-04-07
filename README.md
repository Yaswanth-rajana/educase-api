# 🚀 School Management API

A production-ready Node.js REST API to manage school data with **geospatial proximity search** using the Haversine formula.

---

## 🌐 Live API

🔗 https://educase-api-production-d094.up.railway.app

---

## 📌 Features

* ✅ Add new schools with validation
* 📍 List schools sorted by proximity to user location
* 🌍 SQL-based **Haversine formula** for accurate distance calculation
* 🎯 Radius-based filtering (find nearby schools)
* ⚡ Optimized queries with LIMIT for performance
* 🔐 Environment-based configuration (.env)
* 🧱 Clean architecture (routes, controllers, middleware)
* 🛠️ Centralized error handling
* 📊 Consistent API response format

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL (Railway)
* **Deployment:** Railway
* **Tools:** Postman, GitHub

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Yaswanth-rajana/educase-api.git
cd educase-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
DB_PORT=your_port
```

### 4️⃣ Run the Server

```bash
npm start
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 API Endpoints

### 🔹 1. Health Check

**GET /**

```json
{
  "message": "School Management API is running",
  "status": "ok"
}
```

---

### 🔹 2. Add School

**POST /addSchool**

#### Request Body:

```json
{
  "name": "ABC School",
  "address": "Hyderabad",
  "latitude": 17.385,
  "longitude": 78.4867
}
```

#### Response:

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "schoolId": 1
  }
}
```

---

### 🔹 3. List Schools

**GET /listSchools?latitude=17.4&longitude=78.5**

#### Response:

```json
{
  "success": true,
  "count": 2,
  "schools": [
    {
      "name": "ABC School",
      "distance": 2.18
    }
  ]
}
```

---

### 🔹 4. Radius Filter (Bonus Feature 🔥)

**GET /listSchools?latitude=17.4&longitude=78.5&radius=10**

👉 Returns only schools within 10 km

---

## 🧠 Technical Highlight

> Distance calculation is performed at the **database level using the Haversine formula**, ensuring efficient and scalable geospatial queries.

---

## 📬 Postman Collection

🔗 https://gist.github.com/Yaswanth-rajana/624dfa64f8fedb8f4439886be25336e9

---

## 🚀 Deployment

* Hosted on Railway
* Connected to managed MySQL database
* Environment variables secured

---

## 📊 Project Structure

```
educase-api/
│── config/
│── controllers/
│── routes/
│── middleware/
│── server.js
│── package.json
```

---

## 👨‍💻 Author

**Yaswanth Rajana**

---

## ⭐ Final Note

This project demonstrates:

* Backend API design
* Database integration
* Geospatial query optimization
* Real-world deployment practices

---

🔥 *Built as part of a Node.js backend assignment with production-level practices.*
