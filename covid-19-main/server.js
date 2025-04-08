const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// In-memory storage for COVID-19 data
let covidCasesData = {};
let vaccinationStatusData = {};
let hospitalResourcesData = {};

// ------------------------- COVID-19 Cases Endpoints -------------------------

// GET /covid/cases - Retrieve current COVID-19 case numbers for all regions
app.get('/covid/cases', (req, res) => {
  res.json(covidCasesData);
});

// GET /covid/cases/:region - Retrieve detailed COVID-19 statistics for a specific region
app.get('/covid/cases/:region', (req, res) => {
  const region = req.params.region.toLowerCase();
  const data = covidCasesData[region];

  if (data) {
    res.json({ region, ...data });
  } else {
    res.status(404).json({ error: `No COVID-19 data found for region: ${region}` });
  }
});

// POST /covid/cases/update - Update COVID-19 cases for a specific region
app.post('/covid/cases/update', (req, res) => {
  const { region, active_cases, recoveries, deaths } = req.body;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  covidCasesData[region.toLowerCase()] = {
    active_cases: active_cases || 0,
    recoveries: recoveries || 0,
    deaths: deaths || 0,
  };

  res.json({ message: `COVID-19 data updated for region: ${region}` });
});

// ------------------------- Vaccination Status Endpoints -------------------------

// GET /covid/vaccination-status - Provide information on vaccination progress for all regions
app.get('/covid/vaccination-status', (req, res) => {
  res.json(vaccinationStatusData);
});

// POST /covid/vaccination-status/update - Update vaccination status for a specific region
app.post('/covid/vaccination-status/update', (req, res) => {
  const { region, total_doses, percentage_vaccinated } = req.body;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  vaccinationStatusData[region.toLowerCase()] = {
    total_doses: total_doses || 0,
    percentage_vaccinated: percentage_vaccinated || 0,
  };

  res.json({ message: `Vaccination status updated for region: ${region}` });
});

// ------------------------- Hospital Resources Endpoints -------------------------

// GET /covid/hospitals/resources - Get availability of hospital resources by region
app.get('/covid/hospitals/resources', (req, res) => {
  res.json(hospitalResourcesData);
});

// GET /covid/hospitals/resources/:region - Get hospital resources for a specific region
app.get('/covid/hospitals/resources/:region', (req, res) => {
  const region = req.params.region.toLowerCase();
  const data = hospitalResourcesData[region];

  if (data) {
    res.json({ region, ...data });
  } else {
    res.status(404).json({ error: `No hospital resources data found for region: ${region}` });
  }
});

// POST /covid/hospitals/resources/update - Update hospital resource availability for a region
app.post('/covid/hospitals/resources/update', (req, res) => {
  const { region, available_beds, ventilators_available, icu_capacity } = req.body;

  if (!region) {
    return res.status(400).json({ error: 'Region is required' });
  }

  hospitalResourcesData[region.toLowerCase()] = {
    available_beds: available_beds || 0,
    ventilators_available: ventilators_available || 0,
    icu_capacity: icu_capacity || 0,
  };

  res.json({ message: `Hospital resources updated for region: ${region}` });
});

// ------------------------- Server Initialization -------------------------

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
