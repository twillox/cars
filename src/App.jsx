import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Settings, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  Filter, 
  Calendar, 
  RotateCcw, 
  Heart, 
  FileText, 
  Sliders, 
  X, 
  CheckCircle2, 
  Phone, 
  Send, 
  Award, 
  Sparkles,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Check,
  Scale,
  Percent,
  Plus,
  ArrowLeft,
  Info,
  Activity,
  Compass
} from 'lucide-react';

// ==========================================
// INDIAN FORMATTING UTILITY
// ==========================================
const formatINR = (num) => {
  if (num >= 10000000) {
    return `₹ ${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹ ${(num / 100000).toFixed(1)} Lakh`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
};

// ==========================================
// MOCK DATA: PREMIUM VEHICLES (INDIAN CATALOG)
// ==========================================
const VEHICLES_DATABASE = [
  {
    id: "v1",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2021,
    price: 18400000, // ₹1.84 Cr
    mileage: 14200, // in km
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "3.0L Twin-Turbo H6",
    power: "443 HP",
    color: "Chalk Gray",
    acceleration: "3.5s (0-100)",
    rtoState: "Maharashtra (MH-12)",
    owners: "1st Owner",
    insurance: "Comprehensive till Sept 2026",
    images: [
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1611566141121-8134c470b11a?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "98/100",
    tags: ["Supercar", "Low Run", "MH Reg"],
    features: ["Sport Chrono Package", "BOSE Surround Sound", "PASM Suspension", "Carbon Fiber Inserts", "Active Aerodynamics"]
  },
  {
    id: "v2",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2022,
    price: 16800000, // ₹1.68 Cr
    mileage: 8900,
    fuel: "Electric",
    transmission: "Automatic",
    engine: "Dual Electric Motor",
    power: "637 HP",
    color: "Kemora Gray",
    acceleration: "3.1s (0-100)",
    rtoState: "Delhi (DL-3C)",
    owners: "1st Owner",
    insurance: "Zero Depreciation till Dec 2026",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "99/100",
    tags: ["Electric", "Performance", "DL Reg"],
    features: ["Matrix LED Laser Headlights", "All-Wheel Steering", "Adaptive Air Suspension", "Virtual cockpit", "360 Deg Camera"]
  },
  {
    id: "v3",
    brand: "BMW",
    model: "M4 Competition",
    year: 2022,
    price: 14200000, // ₹1.42 Cr
    mileage: 18400,
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "3.0L Twin-Turbo I6",
    power: "503 HP",
    color: "Isle of Man Green",
    acceleration: "3.8s (0-100)",
    rtoState: "Haryana (HR-26)",
    owners: "1st Owner",
    insurance: "Comprehensive till May 2027",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "96/100",
    tags: ["Track Machine", "Single Owner", "HR Reg"],
    features: ["Carbon Bucket Seats", "M Performance Exhaust", "Head-Up Display", "Adaptive M Suspension", "Carbon Roof"]
  },
  {
    id: "v4",
    brand: "Mercedes-Benz",
    model: "AMG GT 53",
    year: 2020,
    price: 12500000, // ₹1.25 Cr
    mileage: 26000,
    fuel: "Hybrid",
    transmission: "Automatic",
    engine: "3.0L Turbo I6 with EQ Boost",
    power: "429 HP",
    color: "Obsidian Black",
    acceleration: "4.4s (0-100)",
    rtoState: "Maharashtra (MH-02)",
    owners: "2nd Owner",
    insurance: "Comprehensive till Nov 2026",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "95/100",
    tags: ["Executive", "Luxury Cruiser", "MH Reg"],
    features: ["Burmester 3D Surround Sound", "Nappa Leather Interior", "Multibeam Active LED", "AMG Performance Exhaust"]
  },
  {
    id: "v5",
    brand: "Land Rover",
    model: "Defender 110 HSE",
    year: 2021,
    price: 11500000, // ₹1.15 Cr
    mileage: 12000,
    fuel: "Diesel",
    transmission: "Automatic",
    engine: "3.0L Mild Hybrid I6",
    power: "296 HP",
    color: "Eiger Grey",
    acceleration: "7.3s (0-100)",
    rtoState: "Karnataka (KA-03)",
    owners: "1st Owner",
    insurance: "Comprehensive till July 2026",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "97/100",
    tags: ["Luxury Offroader", "KA Reg"],
    features: ["Panoramic Slide Roof", "ClearSight Ground View Camera", "Meridian Sound", "Electronic Air Suspension"]
  },
  {
    id: "v6",
    brand: "Toyota",
    model: "Fortuner Legender",
    year: 2022,
    price: 4850000, // ₹48.5 Lakh
    mileage: 32000,
    fuel: "Diesel",
    transmission: "Automatic",
    engine: "2.8L Turbo Diesel",
    power: "201 HP",
    color: "Dual Tone Pearl White",
    acceleration: "9.8s (0-100)",
    rtoState: "Uttar Pradesh (UP-16)",
    owners: "1st Owner",
    insurance: "Comprehensive till Oct 2026",
    images: [
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?auto=format&fit=crop&q=80&w=1200"
    ],
    verified: true,
    inspectionScore: "94/100",
    tags: ["Highly Reliable", "Top Spec", "UP Reg"],
    features: ["Sequential LED Indicators", "Ambient Cabin Lighting", "Wireless Charger", "Hands-Free Kick Tailgate"]
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'inventory' | 'sell' | 'product'
  const [favorites, setFavorites] = useState([]);
  const [comparedCars, setComparedCars] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Detail / Active Product Page State
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Search/Filters State
  const [searchBrand, setSearchBrand] = useState('All');
  const [searchPriceRange, setSearchPriceRange] = useState(20000000); // max price limit in INR (2 Cr)
  const [searchFuel, setSearchFuel] = useState('All');
  const [searchTransmission, setSearchTransmission] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // EMI Calculator State
  const [emiVehiclePrice, setEmiVehiclePrice] = useState(9000000); // ₹90 Lakhs
  const [emiDownPayment, setEmiDownPayment] = useState(1800000); // ₹18 Lakhs
  const [emiInterestRate, setEmiInterestRate] = useState(8.5); // Local Indian standard rate
  const [emiTenure, setEmiTenure] = useState(60); // 5 Years in months

  // Forms State
  const [bookingFormData, setBookingFormData] = useState({
    vehicleId: '',
    name: '',
    phone: '',
    date: '',
    timeSlot: '',
    homeDelivery: false
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [sellForm, setSellForm] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    condition: 'Excellent',
    name: '',
    phone: ''
  });
  const [sellValuationResult, setSellValuationResult] = useState(null);

  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  const brandsList = ['All', ...new Set(VEHICLES_DATABASE.map(c => c.brand))];
  const fuelsList = ['All', ...new Set(VEHICLES_DATABASE.map(c => c.fuel))];
  const transmissionsList = ['All', ...new Set(VEHICLES_DATABASE.map(c => c.transmission))];

  const triggerToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredVehicles = useMemo(() => {
    let result = [...VEHICLES_DATABASE];
    if (searchBrand !== 'All') result = result.filter(v => v.brand === searchBrand);
    if (searchFuel !== 'All') result = result.filter(v => v.fuel === searchFuel);
    if (searchTransmission !== 'All') result = result.filter(v => v.transmission === searchTransmission);
    result = result.filter(v => v.price <= searchPriceRange);

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'year-desc') result.sort((a, b) => b.year - a.year);

    return result;
  }, [searchBrand, searchPriceRange, searchFuel, searchTransmission, sortBy]);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
      triggerToast("Removed from watchlist.");
    } else {
      setFavorites([...favorites, id]);
      triggerToast("Added to watchlist.");
    }
  };

  const toggleCompare = (car, e) => {
    if (e) e.stopPropagation();
    if (comparedCars.find(c => c.id === car.id)) {
      setComparedCars(comparedCars.filter(c => c.id !== car.id));
      triggerToast("Removed from comparison.");
    } else {
      if (comparedCars.length >= 3) {
        triggerToast("Maximum of 3 cars can be compared.");
        return;
      }
      setComparedCars([...comparedCars, car]);
      triggerToast(`Added ${car.brand} to compare list.`);
    }
  };

  const monthlyEMI = useMemo(() => {
    const principal = emiVehiclePrice - emiDownPayment;
    if (principal <= 0) return 0;
    const monthlyRate = (emiInterestRate / 12) / 100;
    const n = emiTenure;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return Math.round(emi || 0);
  }, [emiVehiclePrice, emiDownPayment, emiInterestRate, emiTenure]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingFormData.name || !bookingFormData.phone || !bookingFormData.date) {
      triggerToast("Please fill all required fields.");
      return;
    }
    setBookingSuccess(true);
    triggerToast("VIP Test Drive slot requested!");
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingFormData({ vehicleId: '', name: '', phone: '', date: '', timeSlot: '', homeDelivery: false });
    }, 4000);
  };

  const handleValuationSubmit = (e) => {
    e.preventDefault();
    if (!sellForm.brand || !sellForm.model || !sellForm.year || !sellForm.mileage) {
      triggerToast("Please fill in the details first.");
      return;
    }
    const baseValue = 4500000; // ₹45 Lakhs base valuation mapping
    const ageFactor = Math.max(0.3, 1 - (2026 - parseInt(sellForm.year)) * 0.08);
    const mileageFactor = Math.max(0.5, 1 - (parseInt(sellForm.mileage) || 30000) * 0.000004);
    const estimatedAmount = Math.round(baseValue * ageFactor * mileageFactor);
    
    setSellValuationResult({
      min: Math.round(estimatedAmount * 0.92),
      max: Math.round(estimatedAmount * 1.08),
      carName: `${sellForm.year} ${sellForm.brand} ${sellForm.model}`
    });
    triggerToast("Instant estimation calculated.");
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!callbackPhone) return;
    setCallbackSubmitted(true);
    triggerToast("Callback queued! We will ring you in 15 mins.");
    setTimeout(() => {
      setCallbackSubmitted(false);
      setCallbackPhone('');
    }, 3000);
  };

  const openProductPage = (car) => {
    setSelectedCar(car);
    setSelectedImageIndex(0);
    // Pre-populate EMI variables with this car's price
    setEmiVehiclePrice(car.price);
    setEmiDownPayment(Math.round(car.price * 0.20));
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F172A] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* TOAST NOTIFICATION WIDGET */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-800 animate-slide-up max-w-sm">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* FLOATING ACTION BUTTONS */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <a 
          href="https://wa.me/911234567890?text=Hi%20iCars%20India,%20I%20want%20to%20inquire%20about%20a%20premium%20pre-owned%20car." 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-bold text-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2C6.48 2 2 6.48 2 12.01c0 1.77.46 3.43 1.27 4.96L2 22l5.19-1.36c1.47.8 3.14 1.26 4.82 1.26 5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.012 2zm6.21 13.91c-.24.69-1.23 1.26-1.7 1.3-1.28.11-2.92-.37-5.59-1.48-2.73-1.14-4.48-3.92-4.62-4.11-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.27.54-.34.72-.34h.51c.16 0 .37.01.54.4.18.42.63 1.54.69 1.66.06.12.09.26.01.42-.08.16-.18.26-.29.41-.12.14-.25.32-.36.43-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.67.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-1.14.76-1.4.16-.26.32-.22.54-.14s1.4.66 1.64.78c.24.12.4.18.46.28.06.1.06.57-.18 1.26z"/>
          </svg>
          <span className="text-xs">Quick WhatsApp</span>
        </a>
      </div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-slate-200/60 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 md:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F172A] text-white shadow font-black text-lg italic">
                iC
              </div>
              <div>
                <span className="text-xl font-black text-[#0F172A] tracking-tight block leading-none">iCars</span>
                <span className="text-[9px] text-[#2563EB] font-bold tracking-widest uppercase">PREMIUM INVENTORY</span>
              </div>
            </div>

            {/* Direct Instant Navigation */}
            <nav className="flex w-full md:w-auto justify-center md:justify-start gap-2 mt-3 md:mt-0 overflow-x-auto">
              <button 
                onClick={() => { setCurrentPage('home'); setSearchBrand('All'); }}
               className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-[#0F172A]'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('inventory')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-[#0F172A]'}`}
              >
                Browse Cars
              </button>
              <button 
                onClick={() => setCurrentPage('sell')}
                className={`px-2 md:px-3 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-[#0F172A]'}`}
              >
                Sell Instantly
              </button>
            </nav>

            {/* Hot Action */}
            <div className="hidden sm:flex items-center gap-3">
              <a 
                href="tel:+9118005554227"
                className="flex items-center gap-1.5 bg-[#0F172A] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <Phone size={14} className="text-blue-400" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* RENDER PAGES */}
      {currentPage === 'home' && (
        <>
          {/* ==========================================
              MOBILE-FIRST HERO SECTION (CONVERSION FOCUS)
              ========================================== */}
          <section className="relative bg-gradient-to-b from-slate-100 to-white py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                
                {/* Hero Core CTAs */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} className="text-amber-500" />
                    <span>Certified Pre-Owned Luxury Match (India)</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-none">
                    Find Your <br className="hidden md:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      Perfect Drive
                    </span>
                  </h1>

                  <p className="text-sm md:text-base text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    Skip the generic dealer hassle. Browse handpicked certified performance vehicles with pristine service records, active FASTags, and clean RTO approvals.
                  </p>

                  {/* Immediate Lead Generators */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                    <button 
                      onClick={() => {
                        const target = document.getElementById('listings-grid');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-[#0F172A] text-white font-bold text-sm shadow-lg transition-all"
                    >
                      Browse Inventory
                    </button>
                    <button 
                      onClick={() => {
                        const target = document.getElementById('lead-booking-section');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-blue-600 text-white font-bold text-sm transition-all"
                    >
                      Book Free Test Drive
                    </button>
                  </div>

                  {/* Instant Trust Badges */}
                  <div className="grid grid-cols-3 gap-3 pt-4 max-w-sm mx-auto lg:mx-0 text-left text-xs text-slate-500 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>180-Pt Certified</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Zero Hidden Fees</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>5-Day Trial</span>
                    </div>
                  </div>
                </div>

                {/* Micro Spotlight Car Image - Instantly appealing */}
                <div className="lg:col-span-5">
                  <div 
                    onClick={() => openProductPage(VEHICLES_DATABASE[0])}
                    className="relative bg-white p-3 rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden cursor-pointer group"
                  >
                    <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600" 
                        alt="Porsche Spotlight" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 block">WEEKLY SPOTLIGHT</span>
                        <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors">Porsche 911 S (2021)</h4>
                      </div>
                      <span className="text-sm font-black text-[#0F172A]">₹ 1.84 Cr</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ==========================================
              HORIZONTAL QUICK BRAND SCROLLBAR
              ========================================== */}
          <section className="bg-white border-y border-slate-200/80 py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider shrink-0">Tap Brand:</span>
                
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
                  {brandsList.map(brand => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSearchBrand(brand);
                        const target = document.getElementById('listings-grid');
                        if (target) target.scrollIntoView({ behavior: 'smooth' });
                        triggerToast(`Filtering by ${brand}`);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${searchBrand === brand ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {brand === 'All' ? 'All Vehicles' : brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ==========================================
              VEHICLE SHOWCASE SECTION (Core focus)
              ========================================== */}
          <section id="listings-grid" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">Available Stock</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">Active Showroom</h2>
              </div>

              {/* Simple filter counters */}
              <div className="flex flex-wrap items-center gap-2">
                <select 
                  value={searchFuel} 
                  onChange={(e) => setSearchFuel(e.target.value)}
                  className="bg-white border border-slate-200 text-xs font-bold text-slate-700 py-1.5 px-2.5 rounded-lg focus:outline-none"
                >
                  <option value="All">All Power</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">EV Only</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-slate-200 text-xs font-bold text-slate-700 py-1.5 px-2.5 rounded-lg focus:outline-none"
                >
                  <option value="default">Default Sort</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Newest Year</option>
                </select>
              </div>
            </div>

            {/* THE VEHICLE GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map(car => {
                const isFavorite = favorites.includes(car.id);
                const isCompared = comparedCars.some(c => c.id === car.id);
                return (
                  <div 
                    key={car.id}
                    onClick={() => openProductPage(car)}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    {/* Visual block */}
                    <div className="relative h-48 bg-slate-900 overflow-hidden">
                      <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      
                      <div className="absolute top-3 left-3 bg-[#0F172A]/90 text-white text-[9px] font-black uppercase px-2 py-1 rounded">
                        ✓ Cert Score: {car.inspectionScore}
                      </div>

                      <div className="absolute top-3 right-3 flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={(e) => toggleCompare(car, e)}
                          className={`p-1.5 rounded-full backdrop-blur-md ${isCompared ? 'bg-blue-600 text-white' : 'bg-white/80 text-slate-700'}`}
                          title="Compare spec"
                        >
                          <Scale size={13} />
                        </button>
                        <button 
                          onClick={(e) => toggleFavorite(car.id, e)}
                          className={`p-1.5 rounded-full backdrop-blur-md ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-slate-700'}`}
                        >
                          <Heart size={13} className={isFavorite ? "fill-white" : ""} />
                        </button>
                      </div>
                    </div>

                    {/* Metadata specs */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{car.brand}</span>
                        <h3 className="text-base font-black text-[#0F172A] mt-0.5 truncate group-hover:text-blue-600 transition-colors">{car.model}</h3>
                        
                        <div className="grid grid-cols-3 gap-1 py-2 my-2 border-y border-slate-100 text-[11px] text-slate-500 font-semibold text-center">
                          <div>
                            <span className="block text-[#0F172A] font-bold">{car.year}</span>
                            Year
                          </div>
                          <div>
                            <span className="block text-[#0F172A] font-bold">{car.mileage.toLocaleString('en-IN')} km</span>
                            Odo Run
                          </div>
                          <div>
                            <span className="block text-[#0F172A] font-bold">{car.fuel}</span>
                            Engine
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block font-bold">Offer Price</span>
                          <span className="text-lg font-black text-[#0F172A]">{formatINR(car.price)}</span>
                        </div>

                        {/* Conversion Buttons */}
                        <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <a 
                            href={`https://wa.me/911234567890?text=Hi%20iCars,%20I%20am%20interested%20in%20the%20${car.brand}%20${car.model}%20priced%20at%20${formatINR(car.price)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-2.5 rounded-xl transition-colors"
                            title="WhatsApp Inquiry"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12.012 2C6.48 2 2 6.48 2 12.01c0 1.77.46 3.43 1.27 4.96L2 22l5.19-1.36c1.47.8 3.14 1.26 4.82 1.26 5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.012 2zm6.21 13.91c-.24.69-1.23 1.26-1.7 1.3-1.28.11-2.92-.37-5.59-1.48-2.73-1.14-4.48-3.92-4.62-4.11-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.27.54-.34.72-.34h.51c.16 0 .37.01.54.4.18.42.63 1.54.69 1.66.06.12.09.26.01.42-.08.16-.18.26-.29.41-.12.14-.25.32-.36.43-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.67.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-1.14.76-1.4.16-.26.32-.22.54-.14s1.4.66 1.64.78c.24.12.4.18.46.28.06.1.06.57-.18 1.26z"/>
                            </svg>
                          </a>
                          <button 
                            onClick={() => openProductPage(car)}
                            className="bg-[#0F172A] hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                          >
                            View Specs
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ==========================================
              VIP TEST DRIVE BOOKING (CONVERSION DRIVER)
              ========================================== */}
          <section id="lead-booking-section" className="py-12 bg-slate-100 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid md:grid-cols-12">
                
                {/* Visual USP Block */}
                <div className="md:col-span-5 bg-[#0F172A] p-6 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black mb-2">Reserve a Test Drive</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      Schedule a test slot at your doorstep or showroom. Comprehensive insurance and fast logistics fully handled by our delivery team.
                    </p>
                  </div>
                  <div className="space-y-2 text-[11px] font-bold text-blue-400">
                    <div>✓ Doorstep Delivery & Pickup</div>
                    <div>✓ Insured & Sanitised Drive</div>
                    <div>✓ Complete RTO Checklist Provided</div>
                  </div>
                </div>

                {/* Form Core */}
                <div className="md:col-span-7 p-6 sm:p-8">
                  {bookingSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-center space-y-3">
                      <span className="text-3xl block">🎉</span>
                      <h4 className="text-base font-bold text-emerald-900">VIP Test Drive Slot Requested!</h4>
                      <p className="text-xs text-emerald-700">Our concierge relationship officer will call you back within 3 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Select Car</label>
                        <select 
                          value={bookingFormData.vehicleId}
                          onChange={(e) => setBookingFormData(prev => ({ ...prev, vehicleId: e.target.value }))}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none text-slate-700"
                        >
                          <option value="">-- Choose active collection --</option>
                          {VEHICLES_DATABASE.map(v => (
                            <option key={v.id} value={v.id}>{v.brand} {v.model}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Name</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Rajesh Kumar"
                            value={bookingFormData.name}
                            onChange={(e) => setBookingFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">WhatsApp / Phone</label>
                          <input 
                            type="tel" 
                            required 
                            placeholder="+91 99999 99999"
                            value={bookingFormData.phone}
                            onChange={(e) => setBookingFormData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Preferred Date</label>
                          <input 
                            type="date" 
                            required 
                            value={bookingFormData.date}
                            onChange={(e) => setBookingFormData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Delivery Preference</label>
                          <select 
                            value={bookingFormData.homeDelivery ? 'yes' : 'no'}
                            onChange={(e) => setBookingFormData(prev => ({ ...prev, homeDelivery: e.target.value === 'yes' }))}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-semibold"
                          >
                            <option value="no">Visit Flagship Showroom</option>
                            <option value="yes">Bring to Home / Office</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-[#0F172A] text-white py-3 rounded-xl text-xs font-bold transition-all"
                      >
                        Book VIP Test Drive Slot
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </section>

          {/* ==========================================
              WHY CHOOSE US & LOCATIONS (MADHAPUR & NALLAGANDLA)
              ========================================== */}
          <section className="py-12 bg-white border-t border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="grid md:grid-cols-2 gap-10 items-start">
                
                {/* Why Choose Us Core Pillars */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Why iCars India</span>
                    <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">
                      Uncompromising Quality Standards
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Hyderabad’s most trusted portal for handpicked certified luxury & performance segment cars.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {/* Pillar 1 */}
                    <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-[#0F172A]">Certified 180-Point Inspection Blueprint</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">Every mechanical parameter, diagnostic fault scan, and safety component thoroughly evaluated and certified.</span>
                      </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                        <CheckCircle2 size={18} />
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-[#0F172A]">Transparent RTO History & Clear Title</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">100% verified RC details, zero accidental history, no active hypothetication, and fast ownership transfers.</span>
                      </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg shrink-0">
                        <Award size={18} />
                      </div>
                      <div>
                        <span className="block font-bold text-xs text-[#0F172A]">5-Day Peace of Mind Return Window</span>
                        <span className="block text-[11px] text-slate-500 mt-0.5">If the car doesn't fit your space or driving habit, we initiate a hassle-free, transparent returns process.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flagship Locations (Madhapur & Nallagandla) */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Our Flagship Hubs</span>
                    <h3 className="text-2xl font-black text-[#0F172A] tracking-tight">
                      Experience Hubs near you
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Walk in today for an interactive physical test session or expert valuation consultation.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Madhapur Experience Hub */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:border-blue-500/50 transition-colors space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                      <div className="pl-2">
                        <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2">
                          Primary Hub
                        </span>
                        <h4 className="font-black text-xs text-[#0F172A]">Madhapur Experience Hub</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Plot 45, Hitec City Main Road, opp. Metro Pillar C1652, Madhapur, Hyderabad, 500081.
                        </p>
                        <div className="pt-3 flex gap-2">
                          <a 
                            href="https://wa.me/911234567890?text=Hi%20iCars,%20I%20want%20to%20visit%20your%20Madhapur%20Flagship%20Hub."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-slate-200 text-slate-800 text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-slate-50 flex items-center gap-1 shrink-0"
                          >
                            <span>WhatsApp</span>
                          </a>
                          <a 
                            href="tel:+919999999999"
                            className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1 shrink-0"
                          >
                            <Phone size={10} />
                            <span>Call Hub</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Nallagandla Experience Hub */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:border-blue-500/50 transition-colors space-y-3 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                      <div className="pl-2">
                        <span className="inline-block bg-amber-50 text-amber-700 text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2">
                          Premium Hub
                        </span>
                        <h4 className="font-black text-xs text-[#0F172A]">Nallagandla Experience Hub</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          Shop 4, Citizens Hospital Road, opp. Aparna Sarovar, Nallagandla, Serilingampally, 500019.
                        </p>
                        <div className="pt-3 flex gap-2">
                          <a 
                            href="https://wa.me/911234567890?text=Hi%20iCars,%20I%20want%20to%20visit%20your%20Nallagandla%20Premium%20Hub."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-slate-200 text-slate-800 text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-slate-50 flex items-center gap-1 shrink-0"
                          >
                            <span>WhatsApp</span>
                          </a>
                          <a 
                            href="tel:+918888888888"
                            className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1.5 rounded hover:bg-blue-700 flex items-center gap-1 shrink-0"
                          >
                            <Phone size={10} />
                            <span>Call Hub</span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              
            </div>
          </section>

          {/* ==========================================
              INDIAN INTEREST RATE EMI CALCULATOR
              ========================================== */}
          <section id="finance-calculator-section" className="py-12 bg-slate-900 text-white relative">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">Automated Financing Broker</span>
                    <h2 className="text-3xl font-black tracking-tight text-white">
                      Customise Premium Finance Options
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      Fast pre-approvals via partners like HDFC Bank, ICICI Bank & Kotak Mahindra Prime.
                    </p>
                  </div>

                  <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                    {/* Price Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Target Vehicle Price</span>
                        <span className="text-white">{formatINR(emiVehiclePrice)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="2500000" 
                        max="20000000" 
                        step="500000"
                        value={emiVehiclePrice}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setEmiVehiclePrice(val);
                          if (emiDownPayment > val) setEmiDownPayment(Math.round(val * 0.2));
                        }}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    {/* Downpayment Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">Down Payment</span>
                        <span className="text-white">{formatINR(emiDownPayment)}</span>
                      </div>
                      <input 
                        type="range" 
                        min="500000" 
                        max={emiVehiclePrice * 0.8} 
                        step="200000"
                        value={emiDownPayment}
                        onChange={(e) => setEmiDownPayment(parseInt(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Interest Rate */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Interest Rate (APR %)</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            step="0.1" 
                            min="7" 
                            max="18"
                            value={emiInterestRate}
                            onChange={(e) => setEmiInterestRate(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                        </div>
                      </div>

                      {/* Tenure Selector */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 font-bold uppercase block">Duration Tenure</label>
                        <div className="grid grid-cols-3 gap-1">
                          {[36, 60, 84].map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setEmiTenure(m)}
                              className={`py-2 rounded-lg text-[10px] font-bold transition-all ${emiTenure === m ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
                            >
                              {m / 12} Yrs
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Summary Block */}
                <div className="lg:col-span-5">
                  <div className="bg-gradient-to-tr from-blue-700 to-indigo-900 p-6 rounded-2xl shadow-xl space-y-6">
                    <div>
                      <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider block">FINANCIAL OUTCOME</span>
                      <h3 className="text-xl font-bold mt-1">Indicative Instalment</h3>
                    </div>

                    <div>
                      <span className="text-4xl font-black text-white block tracking-tight">
                        {formatINR(monthlyEMI)}
                        <span className="text-xs text-blue-200 font-semibold italic"> / month</span>
                      </span>
                      <span className="text-[11px] text-blue-200 mt-1 block">
                        Principal amount of {formatINR(emiVehiclePrice - emiDownPayment)} over {emiTenure / 12} years tenure.
                      </span>
                    </div>

                    <button 
                      onClick={() => triggerToast("Financing application initiated.")}
                      className="w-full bg-white text-[#0F172A] hover:bg-slate-100 py-3 rounded-xl font-bold text-xs transition-all shadow"
                    >
                      Apply for Swift Loan Pre-Approval
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ==========================================
              INSTANT CALL BACK REQUEST
              ========================================== */}
          <section className="bg-slate-955 py-12 text-white border-t border-slate-800 bg-[#0F172A]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">Instant Callback Desk</span>
              <h3 className="text-2xl font-black">Want to Speak with an Appraiser or Representative?</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No IVR waiting queues. Enter your active Indian mobile number and we will connect you with our premium team within 15 minutes.
              </p>

              {callbackSubmitted ? (
                <div className="bg-white/10 p-4 rounded-xl text-xs max-w-sm mx-auto">
                  ✓ Mobile recorded. Connecting you now.
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter 10-digit mobile number"
                    pattern="[6-9][0-9]{9}"
                    value={callbackPhone}
                    onChange={(e) => setCallbackPhone(e.target.value)}
                    className="bg-slate-800 text-white border border-slate-700 px-4 py-3 rounded-xl text-xs flex-1 focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-white hover:text-[#0F172A] px-6 py-3 rounded-xl text-xs font-black transition-colors"
                  >
                    Request Callback
                  </button>
                </form>
              )}
            </div>
          </section>
        </>
      )}

      {/* ==========================================
          DEDICATED PRODUCT DETAILS PAGE (NEW)
          ========================================== */}
      {currentPage === 'product' && selectedCar && (
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          
          {/* Back Navigation Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <button 
              onClick={() => setCurrentPage('home')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              <ArrowLeft size={14} />
              <span>Back to Showroom</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">Share / Shortlist:</span>
              <button 
                onClick={() => toggleFavorite(selectedCar.id)}
                className={`p-2 rounded-xl border transition-all ${favorites.includes(selectedCar.id) ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-500'}`}
              >
                <Heart size={14} className={favorites.includes(selectedCar.id) ? "fill-red-500" : ""} />
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  triggerToast("Product page link copied to clipboard!");
                }}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-600"
                title="Copy Link"
              >
                <Plus size={14} className="rotate-45" />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Galleries & Exhaustive Specs */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Product Gallery Unit */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="relative h-64 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden bg-slate-950">
                  <img 
                    src={selectedCar.images[selectedImageIndex] || selectedCar.images[0]} 
                    alt={selectedCar.model} 
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded backdrop-blur-sm">
                    Image {selectedImageIndex + 1} of {selectedCar.images.length}
                  </div>
                </div>

                {/* Thumbnail sliders */}
                <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {selectedCar.images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${selectedImageIndex === i ? 'border-blue-600 scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Comprehensive Tech Specifications */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#0F172A] tracking-tight">Technical Specifications</h3>
                  <p className="text-xs text-slate-500 mt-1">Verified physical metrics and power output configuration of this machine.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Engine Capacity</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.engine}</span>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Power Class</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.power}</span>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Acceleration (0-100)</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.acceleration}</span>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Propulsion Type</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.fuel}</span>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Transmission Unit</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.transmission}</span>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Chassis Paint</span>
                    <span className="font-bold text-xs text-[#0F172A]">{selectedCar.color}</span>
                  </div>
                </div>

                {/* Ownership / Registry Metadata */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h4 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">Registry & Insurance Status</h4>
                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-blue-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">RTO Registration</span>
                        <span className="font-bold text-slate-700">{selectedCar.rtoState}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Ownership History</span>
                        <span className="font-bold text-slate-700">{selectedCar.owners}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-blue-600 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">Insurance coverage</span>
                        <span className="font-bold text-slate-700">{selectedCar.insurance}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Installed Features Checklist */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h4 className="text-xs font-black uppercase text-[#0F172A] tracking-wider">Premium Features Installed</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedCar.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-lg">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                        <span className="font-semibold">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Localized Hyderabad Delivery Hub Details */}
              <div className="bg-[#0F172A] text-white p-6 sm:p-8 rounded-3xl space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-blue-600 rounded-2xl">
                    <Compass size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Hyderabad Flagship Delivery Options</h3>
                    <p className="text-xs text-slate-400 mt-1">This vehicle is ready for inspection/handover at either of our Telangana flagship hubs.</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                    <span className="inline-block bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">Madhapur Hub</span>
                    <h4 className="font-bold text-xs">Ready for On-Road Testing</h4>
                    <p className="text-[11px] text-slate-400">Available immediately for a simulated highway test sequence from our primary Hitec City bypass hub.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                    <span className="inline-block bg-amber-500 text-[#0F172A] text-[9px] font-black uppercase px-2 py-0.5 rounded">Nallagandla Hub</span>
                    <h4 className="font-bold text-xs">Home delivery support available</h4>
                    <p className="text-[11px] text-slate-400">We can transport this car flatbed styled to your residence near Citizen's Hospital Road within 2 hours.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Price Lock, WhatsApp routing & Real-time Booking Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Premium Lock Price Box */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Certified Sale Price</span>
                  <span className="text-3xl font-black text-[#0F172A] mt-1 block">
                    {formatINR(selectedCar.price)}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                    ✓ Verified Clear Title & active FASTag included
                  </span>
                </div>

                <div className="space-y-2">
                  <a 
                    href={`https://wa.me/911234567890?text=Hi%20iCars%20India,%20I%20am%20interested%20in%20arranging%20a%20transaction%20discussion%20for%20the%20${selectedCar.brand}%20${selectedCar.model}%20priced%20at%20${formatINR(selectedCar.price)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-black text-xs transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.012 2C6.48 2 2 6.48 2 12.01c0 1.77.46 3.43 1.27 4.96L2 22l5.19-1.36c1.47.8 3.14 1.26 4.82 1.26 5.53 0 10.01-4.48 10.01-10.01C22.02 6.48 17.54 2 12.012 2zm6.21 13.91c-.24.69-1.23 1.26-1.7 1.3-1.28.11-2.92-.37-5.59-1.48-2.73-1.14-4.48-3.92-4.62-4.11-.14-.19-1.12-1.49-1.12-2.84 0-1.35.7-2.01.95-2.28.25-.27.54-.34.72-.34h.51c.16 0 .37.01.54.4.18.42.63 1.54.69 1.66.06.12.09.26.01.42-.08.16-.18.26-.29.41-.12.14-.25.32-.36.43-.12.13-.25.27-.11.51.14.24.62 1.03 1.33 1.67.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-1.14.76-1.4.16-.26.32-.22.54-.14s1.4.66 1.64.78c.24.12.4.18.46.28.06.1.06.57-.18 1.26z"/>
                    </svg>
                    <span>Instant WhatsApp Inquiry</span>
                  </a>

                  <button 
                    onClick={() => {
                      setBookingFormData(prev => ({ ...prev, vehicleId: selectedCar.id }));
                      const target = document.getElementById('lead-booking-section');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        triggerToast("Scheduled booking window loaded below!");
                      }
                    }}
                    className="w-full bg-[#0F172A] hover:bg-blue-600 text-white py-3 rounded-xl text-xs font-bold transition-all text-center"
                  >
                    Schedule Home Test Drive
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
                  * 100% money-back structural assurance guarantee included.
                </div>
              </div>

              {/* EMI Calculator Contextual Panel */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
                <div>
                  <span className="text-[10px] text-blue-400 font-bold uppercase block tracking-wider">EMI Breakdown Estimate</span>
                  <h4 className="text-base font-black text-white mt-0.5">Indicative Monthly Loan</h4>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Instalment value:</span>
                    <span className="font-bold text-white">{formatINR(monthlyEMI)} / mo</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Principal amount:</span>
                    <span>{formatINR(emiVehiclePrice - emiDownPayment)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Expected APR rate:</span>
                    <span>{emiInterestRate}% for {emiTenure / 12} Yrs</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const emiSec = document.getElementById('finance-calculator-section');
                    if (emiSec) {
                      emiSec.scrollIntoView({ behavior: 'smooth' });
                      triggerToast("Financing parameters synced with main calculator below!");
                    }
                  }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg text-xs font-bold transition-all"
                >
                  Adjust Loan Variables
                </button>
              </div>

              {/* RTO & History Audit Checkbox panel */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block">History Audit Check</span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>RTO registration checked & clear</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>No structural damage recorded</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span>Engine compression & fault scans verified</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </section>
      )}

      {/* ==========================================
          INVENTORY ARCHIVE (FAST ARCHIVE WITH HIGHEST VISIBILITY)
          ========================================== */}
      {currentPage === 'inventory' && (
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs text-slate-400 font-bold uppercase block">iCars Showroom</span>
            <h1 className="text-3xl font-black text-[#0F172A]">Browse active catalog</h1>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Short Instant Filter Options Sidebar */}
            <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200/80 space-y-5">
              <span className="font-bold text-[#0F172A] text-xs uppercase block pb-2 border-b border-slate-100">Quick Filters</span>
              
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Make / Brand</label>
                <select 
                  value={searchBrand} 
                  onChange={(e) => setSearchBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none text-slate-700"
                >
                  {brandsList.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Propulsion Type</label>
                <select 
                  value={searchFuel} 
                  onChange={(e) => setSearchFuel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none text-slate-700"
                >
                  {fuelsList.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">Price Limit</label>
                <input 
                  type="range" 
                  min="4000000" 
                  max="20000000" 
                  step="500000"
                  value={searchPriceRange}
                  onChange={(e) => setSearchPriceRange(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[11px] font-bold text-blue-600 block text-right">{formatINR(searchPriceRange)}</span>
              </div>

              <button 
                onClick={() => {
                  setSearchBrand('All');
                  setSearchFuel('All');
                  setSearchTransmission('All');
                  setSearchPriceRange(20000000);
                  triggerToast("Filters Reset");
                }}
                className="w-full text-center text-[10px] font-bold text-red-500 hover:underline pt-2 block"
              >
                Reset All Parameters
              </button>
            </div>

            {/* List block */}
            <div className="lg:col-span-9 space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map(car => (
                  <div 
                    key={car.id}
                    onClick={() => openProductPage(car)}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="relative h-44 bg-slate-900 overflow-hidden">
                      <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600">{car.brand}</span>
                        <h4 className="text-sm font-black text-[#0F172A] truncate group-hover:text-blue-600 transition-colors">{car.model}</h4>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                        <span className="text-base font-black text-[#0F172A]">{formatINR(car.price)}</span>
                        <span className="text-xs text-slate-400 font-bold">{car.year}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ==========================================
          INSTANT CAR VALUE ESTIMATOR (CONVERSION)
          ========================================== */}
      {currentPage === 'sell' && (
        <section className="py-12 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden">
            <div className="bg-[#0F172A] p-6 text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Instant Trade-in Valuation</span>
              <h1 className="text-2xl font-black">Generate Market Estimation</h1>
              <p className="text-slate-400 text-xs mt-1">Provide quick parameters to receive an instant real-time market value estimate.</p>
            </div>

            <div className="p-6">
              {sellValuationResult ? (
                <div className="text-center py-6 space-y-4">
                  <span className="text-4xl block">📈</span>
                  <h3 className="text-lg font-black text-[#0F172A]">{sellValuationResult.carName}</h3>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner inline-block">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Estimated Driveway Value Range</span>
                    <span className="text-3xl font-black text-blue-600">
                      {formatINR(sellValuationResult.min)} - {formatINR(sellValuationResult.max)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Subject to direct technical diagnostic checks. Our local Hyderabad appraiser will call you soon to finalize immediate payout transfer.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    <button 
                      onClick={() => {
                        triggerToast("Our appraiser team is connecting with you.");
                        setSellValuationResult(null);
                        setCurrentPage('home');
                      }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl"
                    >
                      Book Professional Inspection
                    </button>
                    <button 
                      onClick={() => setSellValuationResult(null)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
                    >
                      Calculate Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Make / Brand</label>
                      <input 
                        type="text" required placeholder="E.g., Audi, Toyota"
                        value={sellForm.brand}
                        onChange={(e) => setSellForm({ ...sellForm, brand: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Model Variant</label>
                      <input 
                        type="text" required placeholder="E.g., RS e-tron"
                        value={sellForm.model}
                        onChange={(e) => setSellForm({ ...sellForm, model: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Year</label>
                      <input 
                        type="number" required placeholder="E.g., 2021"
                        value={sellForm.year}
                        onChange={(e) => setSellForm({ ...sellForm, year: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Odometer Reading (KM)</label>
                      <input 
                        type="number" required placeholder="E.g., 22000"
                        value={sellForm.mileage}
                        onChange={(e) => setSellForm({ ...sellForm, mileage: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Name</label>
                      <input 
                        type="text" required placeholder="E.g., Rajesh Kumar"
                        value={sellForm.name}
                        onChange={(e) => setSellForm({ ...sellForm, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Mobile No</label>
                      <input 
                        type="tel" required placeholder="+91 XXXXX XXXXX"
                        pattern="[6-9][0-9]{9}"
                        value={sellForm.phone}
                        onChange={(e) => setSellForm({ ...sellForm, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-700 font-bold"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-[#0F172A] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-md mt-4"
                  >
                    Generate Algorithmic Value Estimation
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* COMPARISON BAR DRAWER */}
      {comparedCars.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-300 shadow-2xl z-40 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-black text-[#0F172A] hidden sm:inline">
              Compare List ({comparedCars.length}/3)
            </span>
            <div className="flex gap-2">
              {comparedCars.map(c => (
                <div key={c.id} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded text-[11px] font-bold">
                  <span>{c.brand} {c.model}</span>
                  <button onClick={() => setComparedCars(comparedCars.filter(car => car.id !== c.id))} className="text-red-500">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              {comparedCars.length > 1 && (
                <button 
                  onClick={() => {
                    setSelectedCar({
                      brand: "Compare",
                      model: comparedCars.map(c => c.brand).join(' vs '),
                      price: comparedCars.reduce((acc, curr) => acc + curr.price, 0) / comparedCars.length,
                      power: comparedCars.map(c => `${c.brand}: ${c.power}`).join(' | '),
                      acceleration: comparedCars.map(c => `${c.brand}: ${c.acceleration}`).join(' | '),
                      mileage: Math.round(comparedCars.reduce((acc, curr) => acc + curr.mileage, 0) / comparedCars.length),
                      images: [comparedCars[0].images[0]],
                      features: comparedCars.flatMap(c => c.tags),
                      inspectionScore: "Compare Mode"
                    });
                    setCurrentPage('product');
                  }}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded text-[11px] font-bold"
                >
                  Compare Specs
                </button>
              )}
              <button onClick={() => setComparedCars([])} className="text-[11px] text-red-500 font-bold hover:underline">
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MINI FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 py-10 border-t border-slate-800 text-center text-xs space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="font-black text-white text-sm">iCars Premium Group India</span>
          <span className="text-blue-400">|</span>
          <span className="text-slate-500">Express Delivery Nationwide</span>
        </div>
        <p className="text-[10px] text-slate-500 max-w-sm mx-auto px-4">
          Licensed luxury broker. Subject to active stock availability. All structural inspection parameters follow rigorous RTO compliance.
        </p>
      </footer>

    </div>
  );
}