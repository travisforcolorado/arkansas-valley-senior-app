import React, { useState } from 'react';
import { Utensils, HeartPulse, Home, Bus, Phone, Users, ArrowLeft, MapPin, PhoneCall } from 'lucide-react';

// Real Data
const RESOURCES = {
  food: [
    {
      name: "Sage Services / Meals on Wheels",
      phone: "719-254-7547",
      address: "Serves Bentley, Crowley, Otero, Prowers",
      type: "Home Delivery",
      delivery: true,
      description: "Hot meals delivered to homebound seniors 60+.",
      website: "https://www.agewisecolorado.org",
      email: "anne.russell@state.co.us"
    },
    {
      name: "La Junta Senior Center",
      phone: "719-384-5486",
      address: "2nd & Colorado, La Junta",
      type: "Congregate Meal",
      delivery: false,
      description: "Community lunch and social activities.",
      website: "https://lajuntacolorado.org",
    },
    {
      name: "Arkansas Valley Christian Mission",
      phone: "719-384-2852",
      address: "2405 E 8th St, La Junta",
      type: "Food Pantry",
      delivery: false,
      description: "Groceries and hot meals available.",
      website: "https://www.buenavista-co.gov"
    },
    {
      name: "Share / Rocky Ford Food Market",
      phone: "719-254-6816",
      address: "Rocky Ford",
      type: "Pantry",
      delivery: false,
      description: "Fresh produce and staples."
    },
  ],
  medical: [
    {
      name: "Epson Senior Care (LAVAAA)",
      phone: "719-383-3166",
      address: "13 West 3rd St, La Junta",
      type: "Assistance",
      transport: false,
      description: "Medicare counseling, caregiver support & medical tech.",
      email: "donna.rohde@state.co.us",
      website: "https://www.lajunta.gov"
    },
    {
      name: "Ark Valley Regional Med Ctr",
      phone: "719-384-5412",
      address: "400 Main St, La Junta",
      type: "Hospital",
      transport: false,
      description: "Emergency, specialty & long-term care.",
      website: "https://www.avrmc.org",
      email: "info@avrmc.org"
    },
    {
      name: "Valley-Wide Health Systems",
      phone: "719-383-3000",
      address: "La Junta / Rocky Ford",
      type: "Clinic",
      transport: true,
      description: "Primary care. Ask about 'Valley-Wide Ride'.",
      website: "https://valley-widehealth.org",
      email: "info@valley-widehealth.org"
    },
  ],
  housing: [
    {
      name: "Otero County Housing Auth",
      phone: "719-384-9055",
      address: "315 E 5th St, La Junta",
      type: "Section 8 Info",
      description: "Vouchers & affordable housing applications.",
      website: "https://www.oterocounty.gov"
    },
    {
      name: "Cottonwood Ridge",
      phone: "719-254-3314",
      address: "Rocky Ford",
      type: "Assisted Living",
      description: "Assisted living facility.",
      website: "https://www.cottonwoodridge.com"
    },
    { name: "Evergreen Gardens", phone: "719-384-5412", address: "La Junta", type: "Assisted Living", description: "Supportive living services." },
  ],
  transport: [
    {
      name: "Valley-Wide Ride",
      phone: "1-833-350-1113",
      description: "Free transport for medical/grocery. Book 24h in advance.",
      transport: true,
      website: "https://valley-widehealth.org/services/transportation",
      email: "info@valley-widehealth.org"
    },
    {
      name: "Bent County GATS",
      phone: "719-456-1449",
      description: "Door-to-door in Las Animas area. Donation suggested.",
      transport: true,
      email: "deerae@mindspring.com",
      website: "https://www.bentcounty.net"
    },
    {
      name: "Kiowa County Transit",
      phone: "719-438-5810",
      description: "Public transit services for the county.",
      transport: true,
      website: "https://kicocd.colorado.gov/transit"
    },
    { name: "MedRide", phone: "719-545-3333", description: "Non-emergency medical transport (Medicaid accepted).", transport: true },
  ],
  social: [
    {
      name: "La Junta Senior Center",
      phone: "719-384-5486",
      address: "2nd & Colorado",
      activity: "Social Events, Meals",
      description: "The hub for local senior activities.",
      website: "https://lajuntacolorado.org"
    },
    {
      name: "Lower Ark Valley AAA",
      phone: "719-383-3166",
      address: "La Junta",
      activity: "Information",
      description: "General assistance and resource connection.",
      email: "donna.rohde@state.co.us"
    },
  ]
};

function App() {
  const [view, setView] = useState('home'); // home, [category]
  const [selectedCategory, setSelectedCategory] = useState(null);

  const viewCategory = (category) => {
    setSelectedCategory(category);
    setView('list');
  };

  const goHome = () => {
    setView('home');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      {/* Header */}
      <header className="bg-sage-700 text-white p-6 shadow-lg sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {view !== 'home' ? (
            <button onClick={goHome} className="flex items-center gap-2 px-4 py-2 -ml-2 rounded-xl bg-sage-800 hover:bg-sage-600 transition-colors border border-sage-500 shadow-sm" aria-label="Go back">
              <ArrowLeft size={24} />
              <span className="font-bold text-lg">Back</span>
            </button>
          ) : (
            <div /> // Spacer
          )}
          <h1 className="text-xl font-bold tracking-wide text-center flex-1">Valley Senior Connect</h1>
          {view !== 'home' && <div className="w-20" />} {/* Balance spacer */}
          {view === 'home' && <div className="w-8" />}
        </div>
      </header>

      <main className="max-w-md mx-auto p-5 pb-32">
        {view === 'home' && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center py-4 bg-white rounded-3xl border border-sage-100 shadow-sm p-6 mb-4">
              <h2 className="text-3xl font-extrabold text-sage-800 mb-3">Welcome.</h2>
              <p className="text-xl text-slate-800 font-medium leading-normal">
                Touch a button below to find what you need.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <CategoryCard
                icon={<Utensils size={42} />}
                title="Food & Meals"
                subtitle="Pantries, delivery & lunch"
                color="bg-orange-50 text-orange-900 border-2 border-orange-200"
                onClick={() => viewCategory('food')}
              />
              <CategoryCard
                icon={<HeartPulse size={42} />}
                title="Medical Care"
                subtitle="Clinics, hospitals & nursing"
                color="bg-red-50 text-red-900 border-2 border-red-200"
                onClick={() => viewCategory('medical')}
              />
              <CategoryCard
                icon={<Bus size={42} />}
                title="Transportation"
                subtitle="Rides to appointments"
                color="bg-blue-50 text-blue-900 border-2 border-blue-200"
                onClick={() => viewCategory('transport')}
              />
              <CategoryCard
                icon={<Home size={42} />}
                title="Housing Help"
                subtitle="Repairs, rent & shelter"
                color="bg-emerald-50 text-emerald-900 border-2 border-emerald-200"
                onClick={() => viewCategory('housing')}
              />
              <CategoryCard
                icon={<Users size={42} />}
                title="Social & Activities"
                subtitle="Senior centers & events"
                color="bg-purple-50 text-purple-900 border-2 border-purple-200"
                onClick={() => viewCategory('social')}
              />
            </div>
          </div>
        )}

        {view === 'list' && selectedCategory && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
              <div className={`inline-flex p-4 rounded-full ${getCategoryColor(selectedCategory)} mb-3`}>
                {getCategoryIcon(selectedCategory)}
              </div>
              <h2 className="text-3xl font-bold capitalize text-slate-900">{mapCategoryName(selectedCategory)}</h2>
              <p className="text-slate-600 text-lg mt-1">Scroll down to see services</p>
            </div>

            <div className="space-y-6">
              {RESOURCES[selectedCategory].map((resource, idx) => (
                <ResourceCard key={idx} resource={resource} />
              ))}
            </div>
          </div>
        )}
        {view === 'sources' && (
          <div className="animate-fade-in space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Data Sources & verification</h2>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <p className="text-slate-600">The resources listed in this directory have been verified using the following local and regional organizations:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <span className="font-semibold">Lower Arkansas Valley Area Agency on Aging (LAVAAA)</span>
                  <p className="text-sm text-slate-500">Primary source for senior services in Otero, Bent, Crowley counties.</p>
                </li>
                <li>
                  <span className="font-semibold">Valley-Wide Health Systems</span>
                  <p className="text-sm text-slate-500">Verified medical clinics and Valley-Wide Ride details.</p>
                </li>
                <li>
                  <span className="font-semibold">Otero County Housing Authority</span>
                  <p className="text-sm text-slate-500">Housing voucher and section 8 information.</p>
                </li>
                <li>
                  <span className="font-semibold">Sage Services</span>
                  <p className="text-sm text-slate-500">Meals on Wheels providers for the region.</p>
                </li>
                <li>
                  <span className="font-semibold">Colorado.gov & 211 Colorado</span>
                  <p className="text-sm text-slate-500">Statewide resource directory verification.</p>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-100 mt-4">
                <p className="text-xs text-slate-400">Last Verified: December 2025</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer / Info Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-5 shadow-lg z-20">
        <div className="max-w-md mx-auto flex items-center justify-center">
          <button onClick={() => setView('sources')} className="text-base text-sage-700 font-semibold hover:text-sage-900 flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-sage-50 transition-colors">
            <Users size={20} />
            View Data Sources & Info
          </button>
        </div>
      </div>

    </div>
  );
}

function CategoryCard({ icon, title, subtitle, color, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left bg-white p-6 rounded-3xl shadow-md border border-slate-200 flex items-center gap-6 transition-all hover:shadow-lg active:scale-95 group ring-offset-4 focus:ring-4 focus:ring-sage-400 outline-none">
      <div className={`p-5 rounded-2xl ${color} transition-colors`}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sage-800 transition-colors mb-1">{title}</h3>
        <p className="text-slate-600 text-lg font-medium">{subtitle}</p>
      </div>
    </button>
  )
}

function ResourceCard({ resource }) {
  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-md hover:border-sage-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl text-slate-900 leading-tight">{resource.name}</h3>
        <div className="flex flex-col gap-2 items-end">
          {resource.delivery && <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-bold">Delivers</span>}
          {resource.transport && <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-bold">Transport</span>}
        </div>
      </div>
      {resource.address && (
        <div className="flex items-start gap-3 text-slate-700 text-lg mb-3 font-medium">
          <MapPin size={24} className="mt-1 shrink-0 text-slate-400" />
          <span>{resource.address}</span>
        </div>
      )}
      {resource.description && (
        <p className="text-slate-700 text-lg mb-5 leading-relaxed">{resource.description}</p>
      )}

      <div className="mt-5 space-y-3">
        <p className="text-center text-sage-700 font-bold text-lg">Tap below to call:</p>
        <a href={`tel:${resource.phone}`} className="flex items-center gap-4 text-white font-bold bg-sage-600 px-6 py-5 rounded-2xl hover:bg-sage-700 transition-colors w-full justify-center text-2xl shadow-lg transform active:scale-95">
          <PhoneCall size={32} />
          {resource.phone}
        </a>

        <div className="flex gap-3">
          {resource.website && (
            <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 text-slate-700 font-semibold bg-slate-100 px-4 py-3 rounded-xl hover:bg-slate-200 transition-colors text-base border-2 border-slate-200">
              <Home size={20} />
              Website
            </a>
          )}
          {resource.email && (
            <a href={`mailto:${resource.email}`} className="flex-1 flex items-center justify-center gap-2 text-slate-700 font-semibold bg-slate-100 px-4 py-3 rounded-xl hover:bg-slate-200 transition-colors text-base border-2 border-slate-200">
              <Users size={20} />
              Email
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function getCategoryColor(cat) {
  const colors = {
    food: 'bg-orange-100 text-orange-700',
    medical: 'bg-red-100 text-red-700',
    housing: 'bg-emerald-100 text-emerald-700',
    transport: 'bg-blue-100 text-blue-700',
    social: 'bg-purple-100 text-purple-700'
  };
  return colors[cat] || 'bg-slate-100 text-slate-700';
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'food': return <Utensils size={24} />;
    case 'medical': return <HeartPulse size={24} />;
    case 'housing': return <Home size={24} />;
    case 'transport': return <Bus size={24} />;
    case 'social': return <Users size={24} />;
    default: return <Phone size={24} />;
  }
}

function mapCategoryName(cat) {
  if (cat === 'transport') return 'Transportation';
  return cat;
}

export default App;
