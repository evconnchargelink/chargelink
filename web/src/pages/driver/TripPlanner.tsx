import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRoute, FaBolt, FaClock, FaDollarSign, FaStar, FaExclamationCircle, FaCloud, FaPlus, FaMinus, FaChevronRight, FaChevronDown, FaCar, FaLeaf } from 'react-icons/fa';
import { IoMdThunderstorm } from 'react-icons/io';
import { MdNavigation } from 'react-icons/md';

const TripPlanner = () => {
  const [startLocation, setStartLocation] = useState('delhi');
  const [destination, setDestination] = useState('jaipur');
  const [minBatteryArrival, setMinBatteryArrival] = useState(20);
  const [vehicle, setVehicle] = useState({ name: 'Tata Nexon EV', range: 312 });
  const [battery, setBattery] = useState(25);
  const [chargingSpeed, setChargingSpeed] = useState('balanced');
  const [chargeTo, setChargeTo] = useState(80);
  const [maxDetour, setMaxDetour] = useState(10);
  const [selectedNetworks, setSelectedNetworks] = useState(['Any Network']);
  const [selectedRoute, setSelectedRoute] = useState('nh48');
  const [isPlanning, setIsPlanning] = useState(false);

  const networks = [
    'Tata Power EZ Charge',
    'Ather Grid',
    'ChargePoint',
    'Fortum Charge',
    'IOCL',
    'Statiq',
    'ChargeMOD',
    'Any Network'
  ];

  const routes = [
    {
      id: 'nh48',
      name: 'Via NH48',
      description: 'A direct route via National Highway 48, approximately 264 km, taking about 4.5 hours of driving time.',
      distance: 264,
      duration: 4.5,
      stops: 1,
      cost: 0,
      features: 'Direct route with minimal detours.'
    },
    {
      id: 'nh48-mahendragarh',
      name: 'Via NH48 with a stop at Mahendragarh',
      description: 'A slightly longer route via NH48 with an additional stop at Mahendragarh for charging, approximately 274 km and 5.5 hours of driving time.',
      distance: 274,
      duration: 5.5,
      stops: 2,
      cost: 0,
      features: 'Additional charging opportunity at Mahendragarh.'
    },
    {
      id: 'expressway',
      name: 'Via Delhi-Mumbai Expressway',
      description: 'A faster route via Delhi-Mumbai Expressway, approximately 300 km, taking about 5.5 hours of driving time.',
      distance: 300,
      duration: 5.5,
      stops: 1,
      cost: 0,
      features: 'Faster route with higher speed limits'
    }
  ];

  const toggleNetwork = (network:any) => {
    if (network === 'Any Network') {
      setSelectedNetworks(['Any Network']);
    } else {
      if (selectedNetworks.includes(network)) {
        const filtered = selectedNetworks.filter(n => n !== network && n !== 'Any Network');
        setSelectedNetworks(filtered.length > 0 ? filtered : ['Any Network']);
      } else {
        setSelectedNetworks([...selectedNetworks.filter(n => n !== 'Any Network'), network]);
      }
    }
  };

  const handlePlanTrip = () => {
    setIsPlanning(true);
    setTimeout(() => {
      setIsPlanning(false);
      alert('Trip planned successfully! Your route has been optimized.');
    }, 1500);
  };

  const currentRoute = routes.find(r => r.id === selectedRoute) || routes[0];

  return (
    <div className="h-full bg-slate-50 text-white overflow-y-scroll">
      {/* Header */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-800 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-full text-sm mb-6">
            <FaBolt className="w-4 h-4" />
            AI-Powered Route Planning
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">
            Plan Your <span className="text-emerald-400">Electric</span> Journey
          </h1>
          <p className="text-slate-400 text-lg">
            Smart charging stops, real-time availability, weather-aware routing — all powered by AI.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Trip Planning */}
        <div className="lg:col-span-1 space-y-6">
          {/* Plan Your Trip Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-900 p-2 rounded-lg">
                <MdNavigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-slate-900 font-bold">Plan Your Trip</h2>
                <p className="text-slate-500 text-sm">Enter your route details</p>
              </div>
            </div>

            {/* Starting Point */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Starting Point
              </label>
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-3 text-slate-900 pl-10 relative"
                placeholder="Enter starting point"
              />
              <FaMapMarkerAlt className="w-4 h-4 text-slate-400 " />
            </div>

            {/* Destinations */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-slate-700 font-medium">Destinations</label>
                <button className="flex items-center gap-1 text-emerald-600 text-sm hover:text-emerald-700 transition">
                  <FaPlus className="w-4 h-4" />
                  Add Stop
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="border border-slate-200 rounded-lg p-3">
                  <div className="text-slate-400 text-xs mb-1">Final Destination</div>
                  <div className="flex items-center gap-2">
                    <MdNavigation className="w-4 h-4 text-red-500" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="text-slate-900 flex-1 outline-none"
                      placeholder="Enter destination"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pl-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border-2 border-slate-300 rounded accent-emerald-500"
                  />
                  <span className="text-slate-500 text-sm">Min battery on arrival</span>
                  <select
                    value={minBatteryArrival}
                    onChange={(e) => setMinBatteryArrival(parseInt(e.target.value))}
                    className="ml-auto text-slate-900 font-medium border-none outline-none bg-transparent cursor-pointer"
                  >
                    {[10, 15, 20, 25, 30].map(val => (
                      <option key={val} value={val}>{val}%</option>
                    ))}
                  </select>
                  <FaChevronDown className="w-3 h-3 text-slate-400 -ml-2" />
                </div>
              </div>
            </div>

            {/* Vehicle */}
            <div className="mb-6">
              <label className="text-slate-700 font-medium mb-2 block">Vehicle</label>
              <select
                value={vehicle.name}
                onChange={(e) => {
                  const vehicles = {
                    'Tata Nexon EV': { name: 'Tata Nexon EV', range: 312 },
                    'MG ZS EV': { name: 'MG ZS EV', range: 419 },
                    'Hyundai Kona': { name: 'Hyundai Kona', range: 452 }
                  };
                  const selectedVehicle = vehicles[e.target.value as keyof typeof vehicles];
                  if (selectedVehicle) {
                    setVehicle(selectedVehicle);
                  }
                }}
                className="w-full flex items-center gap-2 border border-slate-200 rounded-lg p-3 text-slate-900 cursor-pointer"
              >
                <option value="Tata Nexon EV">Tata Nexon EV - 312 km</option>
                <option value="MG ZS EV">MG ZS EV - 419 km</option>
                <option value="Hyundai Kona">Hyundai Kona - 452 km</option>
              </select>
            </div>

            {/* Current Battery */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FaBolt className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-700 font-medium">Current Battery</span>
                <span className="ml-auto text-emerald-600 font-bold text-xl">{battery}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={battery}
                  onChange={(e) => setBattery(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${battery}%, #e2e8f0 ${battery}%, #e2e8f0 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>10%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Charging Preferences */}
            <div className="space-y-4 mb-6">
              <h3 className="text-slate-700 font-medium text-sm uppercase tracking-wide">Charging Preferences</h3>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-700 flex items-center gap-2">
                    <FaBolt className="w-3 h-3" />
                    Charging Speed
                  </label>
                </div>
                <select
                  value={chargingSpeed}
                  onChange={(e) => setChargingSpeed(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-900 cursor-pointer"
                >
                  <option value="fast">Fast Charging</option>
                  <option value="balanced">Balanced</option>
                  <option value="slow">Slow & Economical</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-700">Charge to</label>
                  <span className="text-emerald-600 font-bold">{chargeTo}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={chargeTo}
                  onChange={(e) => setChargeTo(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${chargeTo}%, #e2e8f0 ${chargeTo}%, #e2e8f0 100%)`
                  }}
                />
                <p className="text-slate-500 text-xs mt-1">80% is optimal for fast charging speed</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-slate-700">Max Detour</label>
                  <span className="text-slate-900 font-medium">{maxDetour} km</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  value={maxDetour}
                  onChange={(e) => setMaxDetour(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${(maxDetour/50)*100}%, #e2e8f0 ${(maxDetour/50)*100}%, #e2e8f0 100%)`
                  }}
                />
              </div>

              {/* Preferred Networks */}
              <div>
                <label className="text-slate-700 font-medium mb-2 block">Preferred Networks</label>
                <div className="flex flex-wrap gap-2">
                  {networks.map(network => (
                    <button
                      key={network}
                      onClick={() => toggleNetwork(network)}
                      className={`px-3 py-1 rounded-full text-xs transition ${
                        selectedNetworks.includes(network)
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {network}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-emerald-600 text-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                20 chargers available in real-time
              </div>
            </div>

            {/* Plan Button */}
            <button
              onClick={handlePlanTrip}
              disabled={isPlanning}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPlanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Planning...
                </>
              ) : (
                <>
                  <FaChevronRight className="w-5 h-5" />
                  Plan My Trip
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weather Impact Alert */}
          <div className="bg-blue-500 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex items-start gap-3">
              <FaCloud className="w-6 h-6 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Weather Impact</h3>
                <p className="text-blue-50 text-sm mb-3">
                  High Delhi temperatures and approaching heavy conditions with very unhealthy air quality. Residents should exercise caution, especially those with respiratory conditions. Electric vehicle users may experience a significant reduction in range due to the poor air quality.
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <FaExclamationCircle className="w-4 h-4" />
                  <span>~30% range reduction expected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-100 mt-1">
                  <IoMdThunderstorm className="w-4 h-4" />
                  <span>Very unhealthy air quality expected on December 10-11 in both Delhi and Jaipur.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Routes */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-slate-900">
              <FaRoute className="w-5 h-5" />
              <h3 className="font-bold text-lg">Alternative Routes</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {routes.map(route => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`bg-white border-2 rounded-xl p-4 text-left transition hover:shadow-lg ${
                    selectedRoute === route.id ? 'border-emerald-500' : 'border-slate-200'
                  }`}
                >
                  <h4 className="text-slate-900 font-bold mb-2">{route.name}</h4>
                  <p className="text-slate-600 text-sm mb-3">{route.description}</p>
                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-2">
                    <div className="flex items-center gap-1">
                      <FaClock className="w-4 h-4" />
                      {route.duration}h
                    </div>
                    <div className="flex items-center gap-1">
                      <FaDollarSign className="w-4 h-4" />
                      {route.cost}
                    </div>
                    <div>{route.stops} stops</div>
                  </div>
                  <div className="text-emerald-600 text-sm flex items-center gap-1">
                    <FaChevronRight className="w-4 h-4" />
                    {route.features}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Summary */}
          <div className="bg-slate-800 rounded-2xl p-6 shadow-xl text-white">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <FaExclamationCircle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Trip Summary</h3>
              </div>
              <span className="text-emerald-400 text-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                Route Optimized
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">DISTANCE</div>
                <div className="text-3xl font-bold">{currentRoute.distance}</div>
                <div className="text-slate-400 text-sm">kilometers</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">DURATION</div>
                <div className="text-3xl font-bold">{currentRoute.duration}</div>
                <div className="text-slate-400 text-sm">hours</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">STOPS</div>
                <div className="text-3xl font-bold">{currentRoute.stops}</div>
                <div className="text-slate-400 text-sm">charging</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">EST. COST</div>
                <div className="text-3xl font-bold text-emerald-400">₹ {currentRoute.cost}</div>
                <div className="text-slate-400 text-sm">total</div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 bg-slate-700 rounded-xl h-64 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-500">Map visualization</div>
              </div>
              {/* Map markers */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <FaMapMarkerAlt className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-1/4 right-1/3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <MdNavigation className="w-5 h-5 text-white" />
              </div>
              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 25% 25% Q 40% 40%, 66% 75%" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="10,5" />
              </svg>
            </div>
          </div>

          {/* Route Details */}
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <h3 className="text-slate-900 font-bold text-lg mb-4">Your Route</h3>
            
            {/* Start */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-slate-900 font-medium">Start: {startLocation}</div>
                <div className="text-slate-500 text-sm">Battery: {battery}%</div>
              </div>
            </div>

            {/* Stop 1 */}
            <div className="border border-slate-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="text-slate-900 font-bold">Gurugram, Cyberpark Charger</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        Gurugram, Haryana
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-slate-900 font-medium">5.0</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium flex items-center gap-1">
                      <FaBolt className="w-3 h-3" />
                      25kW
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1">
                      <FaClock className="w-3 h-3" />
                      160 min
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs flex items-center gap-1">
                      <FaDollarSign className="w-3 h-3" />
                      0
                    </span>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">✓ Available</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{battery}%</span>
                      <span className="text-emerald-600 font-medium">{chargeTo}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: `${chargeTo}%` }}></div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">
                    Strategically located near Delhi, this charger offers a balanced charging speed and cost, making it ideal for the first stop.
                  </p>

                  <button
                    onClick={() => alert('Booking charger at Gurugram, Cyberpark')}
                    className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Book This Stop
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Final Destination */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <MdNavigation className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-slate-900 font-medium">Final Destination: {destination}</div>
                <div className="text-slate-500 text-sm">Arrive with at least {minBatteryArrival}% battery</div>
              </div>
            </div>
          </div>

          {/* Trip Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FaExclamationCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-yellow-900 font-bold">Trip Tips</h3>
            </div>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start gap-2">
                <FaChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Start with a full charge to maximize range.</span>
              </li>
              <li className="flex items-start gap-2">
                <FaChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Monitor battery levels closely, especially in adverse weather conditions.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;