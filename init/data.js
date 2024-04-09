const hospitalNames = [
    "General Hospital", "St. Mary's Hospital", "City Hospital", "Memorial Hospital", "University Hospital",
    "Community Hospital", "Regional Hospital", "Medical Center", "Children's Hospital", "Veterans Hospital"
];
const descriptions = ["Full-service hospital", "Specialized care", "Emergency services available", "State-of-the-art facilities"];
const locations = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
const countries = ["USA", "Canada", "UK", "Germany", "France", "Australia", "Japan", "China", "India", "Brazil"];
function generateRandom() {
    const randomNum = 1000 + Math.random() * 1000;
    return Math.round(randomNum / 100) * 100;
  }
  function generateRandomdui() {
    const randomNum = 2000 + Math.random() * 2000;
    return Math.round(randomNum / 100) * 100;
  }
// Generate random data entry
const generateRandomData=()=>{
    let title = hospitalNames[Math.floor(Math.random() * hospitalNames.length)];
    let description = descriptions[Math.floor(Math.random() * descriptions.length)];
   // let image = images[Math.floor(Math.random() * images.length)];
    let lowprice =generateRandom();// Random low price between 500 and 5500
    let highprice =generateRandomdui(); // Random high price between lowPrice + 100 and lowPrice + 600
    let location = locations[Math.floor(Math.random() * locations.length)];
    let country = countries[Math.floor(Math.random() * countries.length)];
    let owner="660dbe309e12bcb4fe779402";
    return { title, description, lowprice, highprice, location, country,owner };
};
const data = [];
for (let i = 0; i < 100; i++) {
    const randomData = generateRandomData();
    data.push(randomData);
}
module.exports={data:data};