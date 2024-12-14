const axios = require('axios');

module.exports.getCoordinates = async (req, res, next) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const { address } = req.query;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            const coordinates = {
                ltd: location.lat,
                lng: location.lng
            };
            return res.status(200).json(coordinates);
        } else {
            return res.status(404).json({ message: 'Unable to fetch coordinates', status: response.data.status, error_message: response.data.error_message || 'No additional error message provided by Google Maps API' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while fetching coordinates', error: error.message });
    }
};


module.exports.getDistance = async (req, res, next) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ message: 'Origin and destination are required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'ZERO_RESULTS') {
                return res.status(404).json({ message: 'No routes found' });
            }
            const distanceTime = {
                distance: element.distance,
                duration: element.duration
            };
            return res.status(200).json(distanceTime);
        } else {
            return res.status(404).json({ message: 'Unable to fetch distance and time', status: response.data.status, error_message: response.data.error_message || 'No additional error message provided by Google Maps API' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while fetching distance and time', error: err.message });
    }
};

module.exports.getSuggestions = async (req, res, next) => {
    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ message: 'Query is required' });
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const suggestions = response.data.predictions
                .map(prediction => prediction.description)
                .filter(value => value);
            return res.status(200).json(suggestions);
        } else {
            return res.status(404).json({ message: 'Unable to fetch suggestions', status: response.data.status, error_message: response.data.error_message || 'No additional error message provided by Google Maps API' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'An error occurred while fetching suggestions', error: err.message });
    }
};