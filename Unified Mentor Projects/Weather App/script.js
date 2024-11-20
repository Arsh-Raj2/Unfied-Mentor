const container = document.querySelector('.split-container');
const searchBox = document.querySelector('.search-box');
const weatherInfo = document.querySelector('.weather-info');
const API_KEY = '577f765212754811b99100556241711';

searchBox.querySelector('button').addEventListener('click', () => {
    getWeather();
});

searchBox.querySelector('input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

async function getWeather() {
    const city = searchBox.querySelector('input').value;

    if (city === '') {
        showPopup('Please enter a city name!');
        return;
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
        );
        
        const data = await response.json();

        if (data.error) {
            alert('City not found. Please check the spelling and try again.');
            return;
        }

        weatherInfo.style.display = 'block';

         document.querySelector('.temperature').innerHTML = `${parseInt(data.current.temp_c)}°C`;
        document.querySelector('.condition').innerHTML = data.current.condition.text;
        document.querySelector('.location span').innerHTML = `${data.location.name}, ${data.location.country}`;
        document.querySelector('.weather-box img').src = `https:${data.current.condition.icon}`;
        
        document.querySelector('.humidity span').innerHTML = `${data.current.humidity}%`;
        document.querySelector('.wind span').innerHTML = `${data.current.wind_kph} km/h`;
        document.querySelector('.feels-like span').innerHTML = `${parseInt(data.current.feelslike_c)}°C`;

        weatherInfo.classList.add('fade-in');

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Something went wrong. Please try again later.');
    }
}

const weatherQuotes = [
    {
        text: "Wherever you go, no matter what the weather, always bring your own sunshine.",
        author: "Anthony J. D'Angelo"
    },
    {
        text: "Climate is what we expect, weather is what we get.",
        author: "Mark Twain"
    },
    {
        text: "There's no such thing as bad weather, only inappropriate clothing.",
        author: "Ranulph Fiennes"
    },
    {
        text: "The weather and my mood have little connection. I have my dark moods when the sun is shining and my bright moods when the sky is grey.",
        author: "Gustav Mahler"
    },
    {
        text: "A change in the weather is sufficient to recreate the world and ourselves.",
        author: "Marcel Proust"
    }
];

function getNewQuote() {
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    const randomIndex = Math.floor(Math.random() * weatherQuotes.length);
    
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = weatherQuotes[randomIndex].text;
        quoteAuthor.textContent = `- ${weatherQuotes[randomIndex].author}`;
        quoteText.style.opacity = '1';
        quoteAuthor.style.opacity = '1';
    }, 500);
}

function initializeBackgroundClouds() {
    const weatherSection = document.querySelector('.weather-section');
    const cloudContainer = document.createElement('div');
    cloudContainer.className = 'background-clouds';
    weatherSection.appendChild(cloudContainer);

     const cloudStyles = document.createElement('style');
    cloudStyles.textContent = `
        .background-clouds {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        }

        .moving-cloud {
            position: absolute;
            font-size: 40px;
            color: rgba(255, 255, 255, 0.2);
            animation: floatCloud linear infinite;
        }

        @keyframes floatCloud {
            0% {
                transform: translateX(-100px);
            }
            100% {
                transform: translateX(calc(100vw + 100px));
            }
        }
    `;
    document.head.appendChild(cloudStyles);

    function createCloud() {
        const cloud = document.createElement('div');
        cloud.className = 'moving-cloud';
        cloud.textContent = '☁️';
        cloud.style.top = Math.random() * 100 + '%';
        cloud.style.animationDuration = (Math.random() * 20 + 30) + 's';
        cloudContainer.appendChild(cloud);

        cloud.addEventListener('animationend', () => cloud.remove());
    }

    for (let i = 0; i < 10; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'moving-cloud';
        cloud.textContent = '☁️';
        cloud.style.top = Math.random() * 100 + '%';
        cloud.style.left = Math.random() * 100 + '%';
        cloud.style.animationDuration = (Math.random() * 20 + 30) + 's';
        cloudContainer.appendChild(cloud);
    }

    setInterval(createCloud, 10000);
}

document.addEventListener('DOMContentLoaded', initializeBackgroundClouds);

function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'custom-popup';
    
    popup.innerHTML = `
        <div class="popup-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .custom-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            z-index: 1000;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateX(150%);
            animation: slideIn 0.5s forwards, slideOut 0.5s forwards 3s;
            display: flex;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .popup-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .popup-content i {
            font-size: 24px;
            color: #ff4757;
        }

        @keyframes slideIn {
            to { transform: translateX(0); }
        }

        @keyframes slideOut {
            to { transform: translateX(150%); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    getNewQuote();
});

const cities = [
    // Major World Cities
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Moscow', 'Dubai',
    'Mumbai', 'Beijing', 'Sydney', 'Rome', 'Madrid', 'Toronto', 'Singapore',
    'Istanbul', 'Bangkok', 'Cairo', 'Delhi', 'Manila', 'Seoul', 'Shanghai',
    
    // US Cities
    'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia',
    'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin',
    'Jacksonville', 'Fort Worth', 'Columbus', 'San Francisco', 'Charlotte',
    'Indianapolis', 'Seattle', 'Denver', 'Boston', 'Las Vegas',
    
    // Indian Cities
    'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune',
    'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
    'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Patna',
    'Vadodara', 'Ghaziabad', 'Ludhiana','Chandigarh','Deoghar','Shimla','Manali','Mysore','Ujjain','Mandi','Mohali','Chail','Kufri',
    
    // European Cities
    'Amsterdam', 'Vienna', 'Brussels', 'Copenhagen', 'Helsinki',
    'Athens', 'Dublin', 'Oslo', 'Lisbon', 'Stockholm',
    'Warsaw', 'Budapest', 'Prague', 'Barcelona', 'Milan',
    'Munich', 'Frankfurt', 'Geneva', 'Venice', 'Florence',
    
    // Asian Cities
    'Hong Kong', 'Jakarta', 'Kuala Lumpur', 'Taipei', 'Osaka',
    'Kyoto', 'Busan', 'Guangzhou', 'Shenzhen', 'Chengdu',
    'Hanoi', 'Ho Chi Minh City', 'Yangon', 'Dhaka', 'Karachi',
    
    // Australian Cities
    'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast',
    'Canberra', 'Newcastle', 'Wollongong', 'Logan City', 'Hobart',
    
    // African Cities
    'Lagos', 'Johannesburg', 'Cape Town', 'Nairobi', 'Accra',
    'Addis Ababa', 'Casablanca', 'Durban', 'Pretoria', 'Alexandria',
    
    // South American Cities
    'São Paulo', 'Buenos Aires', 'Rio de Janeiro', 'Lima', 'Bogotá',
    'Santiago', 'Caracas', 'Montevideo', 'Quito', 'Asunción',
    
    // Middle Eastern Cities
    'Abu Dhabi', 'Doha', 'Riyadh', 'Kuwait City',
    'Muscat', 'Manama', 'Amman', 'Beirut', 'Tehran',
    
    // Canadian Cities
    'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton',
    'Quebec City', 'Winnipeg', 'Hamilton', 'Halifax', 'Victoria'
].sort(); 

const indianCities = [
    // Major Metropolitan Cities
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
    
    // Maharashtra
    'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Amravati', 'Nanded',
    'Kolhapur', 'Sangli', 'Jalgaon', 'Akola', 'Latur', 'Dhule', 'Ahmednagar',
    'Chandrapur', 'Parbhani', 'Jalna', 'Bhusawal', 'Navi Mumbai', 'Panvel',
    'Satara', 'Beed', 'Yavatmal', 'Osmanabad', 'Nandurbar', 'Wardha',
    
    // West Bengal
    'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman',
    'Malda', 'Baharampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni',
    'Dhulian', 'Ranaghat', 'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip'
].sort();

const allCities = [...new Set([...cities, ...indianCities])].sort();

const searchInput = document.querySelector('.search-box input');
const suggestionsBox = document.createElement('div');
suggestionsBox.className = 'suggestions-box';
searchInput.parentElement.appendChild(suggestionsBox);

const suggestionStyles = document.createElement('style');
suggestionStyles.textContent = `
    .suggestions-box {
        position: absolute;
        top: 100%;
        left: 0;
        width: calc(100% - 60px);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 10px;
        margin-top: 5px;
        max-height: 200px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .suggestion-item {
        padding: 10px 20px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .suggestion-item:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .search-box {
        position: relative;
    }

    .suggestions-box::-webkit-scrollbar {
        width: 5px;
    }

    .suggestions-box::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.3);
        border-radius: 5px;
    }
`;
document.head.appendChild(suggestionStyles);

const worldCities = [
    ...cities,
    
    // India (States & Union Territories)
    // Andhra Pradesh
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry', 'Tirupati',
    'Kakinada', 'Kadapa', 'Anantapur', 'Vizianagaram', 'Eluru', 'Ongole', 'Nandyal', 'Machilipatnam',
    
    // Arunachal Pradesh
    'Itanagar', 'Naharlagun', 'Pasighat', 'Tawang', 'Ziro', 'Bomdila', 'Aalo', 'Tezu',
    
    // Assam
    'Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Tinsukia', 'Jorhat', 'Bongaigaon', 'Tezpur',
    'Karimganj', 'Hailakandi', 'Diphu', 'Goalpara', 'North Lakhimpur', 'Dhubri', 'Sibsagar',
    
    // Bihar
    'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif',
    'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Bettiah', 'Saharsa', 'Sasaram',
    
    // Chhattisgarh
    'Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Rajnandgaon', 'Raigarh', 'Jagdalpur', 'Dhamtari',
    'Ambikapur', 'Mahasamund', 'Durg', 'Chirmiri', 'Bhatapara', 'Dalli-Rajhara', 'Naila Janjgir',

    // ... Continue with all states and cities

    // International Cities (Continent-wise)
    // Europe
    'Paris', 'London', 'Berlin', 'Madrid', 'Rome', 'Amsterdam', 'Brussels', 'Vienna',
    'Stockholm', 'Copenhagen', 'Oslo', 'Helsinki', 'Warsaw', 'Prague', 'Budapest', 'Athens',
    
    // North America
    'New York', 'Los Angeles', 'Chicago', 'Toronto', 'Vancouver', 'Montreal', 'Mexico City',
    'Miami', 'San Francisco', 'Las Vegas', 'Seattle', 'Boston', 'Washington DC', 'Atlanta',
    
    // Asia
    'Tokyo', 'Shanghai', 'Beijing', 'Seoul', 'Singapore', 'Bangkok', 'Kuala Lumpur', 'Jakarta',
    'Manila', 'Ho Chi Minh City', 'Hanoi', 'Taipei', 'Hong Kong', 'Osaka', 'Kyoto',
    
    // Middle East
    'Dubai', 'Abu Dhabi', 'Doha', 'Riyadh', 'Kuwait City', 'Muscat', 'Manama', 'Tehran',
    'Baghdad', 'Amman', 'Beirut', 'Jerusalem', 'Tel Aviv', 'Istanbul', 'Ankara',
    
    // Africa
    'Cairo', 'Lagos', 'Johannesburg', 'Cape Town', 'Nairobi', 'Casablanca', 'Tunis',
    'Addis Ababa', 'Dakar', 'Accra', 'Dar es Salaam', 'Khartoum', 'Algiers', 'Rabat',
    
    // South America
    'São Paulo', 'Rio de Janeiro', 'Buenos Aires', 'Lima', 'Bogotá', 'Santiago',
    'Caracas', 'Montevideo', 'Quito', 'La Paz', 'Asunción', 'Brasília', 'Salvador',
    
    // Australia & Oceania
    'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Auckland', 'Wellington',
    'Christchurch', 'Gold Coast', 'Canberra', 'Hobart', 'Darwin', 'Suva', 'Port Moresby'
].sort();

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    suggestionsBox.innerHTML = '';

    if (value.length > 0) {
        const filteredCities = worldCities.filter(city => 
            city.toLowerCase().includes(value)
        ).slice(0, 10); // Show top 10 matches

        if (filteredCities.length > 0) {
            filteredCities.forEach(city => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = city;
                div.addEventListener('click', () => {
                    searchInput.value = city;
                    suggestionsBox.style.display = 'none';
                });
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else {
            suggestionsBox.style.display = 'none';
        }
    } else {
        suggestionsBox.style.display = 'none';
    }
});

function fuzzyMatch(pattern, str) {
    pattern = pattern.toLowerCase();
    str = str.toLowerCase();
    let patternIdx = 0;
    let strIdx = 0;
    while (patternIdx < pattern.length && strIdx < str.length) {
        if (pattern[patternIdx] === str[strIdx]) patternIdx++;
        strIdx++;
    }
    return patternIdx === pattern.length;
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
        suggestionsBox.style.display = 'none';
    }
});

searchInput.addEventListener('focus', () => {
    const popup = document.createElement('div');
    popup.className = 'info-popup';
    popup.innerHTML = "If your place doesn't show up, still enter your place name. It will show the information!";
    document.body.appendChild(popup);

    const style = document.createElement('style');
    style.textContent = `
        .info-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(40, 167, 69, 0.2);
            backdrop-filter: blur(10px);
            padding: 20px 30px;
            border-radius: 15px;
            color: #fff;
            z-index: 1000;
            border: 1px solid rgba(40, 167, 69, 0.3);
            animation: fadeInOut 4s forwards;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(40, 167, 69, 0.2);
            font-weight: 500;
            font-size: 1.1rem;
        }

        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -40%); }
            10% { opacity: 1; transform: translate(-50%, -50%); }
            90% { opacity: 1; transform: translate(-50%, -50%); }
            100% { opacity: 0; transform: translate(-50%, -60%); }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => popup.remove(), 4000);
});
  