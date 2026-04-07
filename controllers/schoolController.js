const db = require('../db');

// Add School Endpoint (Updated with consistent response format)
exports.addSchool = async (req, res, next) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid name is required' 
            });
        }
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid address is required' 
            });
        }
        if (typeof latitude !== 'number' || isNaN(latitude) || latitude < -90 || latitude > 90) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid latitude between -90 and 90 is required' 
            });
        }
        if (typeof longitude !== 'number' || isNaN(longitude) || longitude < -180 || longitude > 180) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid longitude between -180 and 180 is required' 
            });
        }

        // Insert into database
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [name.trim(), address.trim(), latitude, longitude]);

        // Consistent response format
        res.status(201).json({ 
            success: true,
            message: 'School added successfully',
            data: {
                schoolId: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: latitude,
                longitude: longitude
            }
        });

    } catch (error) {
        next(error);
    }
};

// List Schools Endpoint (Updated with consistent response format)
exports.listSchools = async (req, res, next) => {
    try {
        const { latitude, longitude, radius } = req.query;

        // Validation
        const userLat = parseFloat(latitude);
        const userLng = parseFloat(longitude);

        if (isNaN(userLat) || userLat < -90 || userLat > 90) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid latitude between -90 and 90 is required' 
            });
        }
        if (isNaN(userLng) || userLng < -180 || userLng > 180) {
            return res.status(400).json({ 
                success: false, 
                message: 'Valid longitude between -180 and 180 is required' 
            });
        }

        // SQL with Haversine formula
        let query = `
            SELECT 
                id, name, address, latitude, longitude, created_at,
                ROUND(
                    6371 * acos(
                        cos(radians(?)) * cos(radians(latitude)) *
                        cos(radians(longitude) - radians(?)) +
                        sin(radians(?)) * sin(radians(latitude))
                    ), 2
                ) AS distance
            FROM schools
            HAVING distance IS NOT NULL
        `;

        let queryParams = [userLat, userLng, userLat];

        // Add radius filter if provided
        if (radius && !isNaN(parseFloat(radius))) {
            query += ` AND distance <= ?`;
            queryParams.push(parseFloat(radius));
        }

        // Add sorting and limit
        query += ` ORDER BY distance ASC LIMIT 50`;

        const [schools] = await db.query(query, queryParams);

        res.status(200).json({
            success: true,
            message: 'Schools retrieved successfully',
            count: schools.length,
            userLocation: { latitude: userLat, longitude: userLng },
            schools: schools
        });

    } catch (error) {
        next(error);
    }
};