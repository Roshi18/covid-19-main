async function fetchHospitalResources() {
    try {
        showLoading();
        const region = document.getElementById('region').value;
        if (!region) throw new Error("Please enter a region");

        const response = await fetch(`http://localhost:3000/covid/hospitals/resources?region=${region}`);
        if (!response.ok) throw new Error("Failed to fetch hospital resources");
        
        const data = await response.json();
        document.getElementById('hospital-output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

async function updateHospitalResources() {
    try {
        const region = document.getElementById('region').value;
        const available_beds = document.getElementById('available_beds').value;
        const ventilators_available = document.getElementById('ventilators_available').value;
        const icu_capacity = document.getElementById('icu_capacity').value;

        if (!region) throw new Error("Please enter a region");

        showLoading();
        const response = await fetch(`http://localhost:3000/covid/hospitals/resources/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ region, available_beds, ventilators_available, icu_capacity })
        });

        const data = await response.json();
        alert(JSON.stringify(data));
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

async function fetchCovidCases() {
    try {
        showLoading();
        const response = await fetch(`http://localhost:3000/covid/cases`);
        if (!response.ok) throw new Error("Failed to fetch COVID-19 cases");
        
        const data = await response.json();
        document.getElementById('cases-output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

async function updateCovidCases() {
    try {
        const active_cases = document.getElementById('active_cases').value;
        const recoveries = document.getElementById('recoveries').value;
        const deaths = document.getElementById('deaths').value;

        showLoading();
        const response = await fetch(`http://localhost:3000/covid/cases/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ active_cases, recoveries, deaths })
        });

        const data = await response.json();
        alert(JSON.stringify(data));
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

async function fetchVaccinationStatus() {
    try {
        showLoading();
        const response = await fetch(`http://localhost:3000/covid/vaccination`);
        if (!response.ok) throw new Error("Failed to fetch vaccination status");

        const data = await response.json();
        document.getElementById('vaccination-output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

async function updateVaccinationStatus() {
    try {
        const total_doses = document.getElementById('total_doses').value;
        const percentage_vaccinated = document.getElementById('percentage_vaccinated').value;

        showLoading();
        const response = await fetch(`http://localhost:3000/covid/vaccination/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ total_doses, percentage_vaccinated })
        });

        const data = await response.json();
        alert(JSON.stringify(data));
    } catch (error) {
        alert(error.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}
