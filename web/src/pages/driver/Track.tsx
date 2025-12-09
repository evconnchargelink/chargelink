import MapWithRouting from "../../components/Map";
import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaRoute,
  FaChargingStation,
} from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { createPortal } from "react-dom";

const TripDetailsContainer = () => {
  const [copied, setCopied] = useState(false);
  const accessCode = "847293";
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute bottom-8 right-5 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
      >
        ▶
      </button>
    );
  }

  return createPortal(
    <div className="absolute bottom-5 right-5 h-fit w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
      <div className="relative">
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            ▼
          </button>
        </div>

        {/* Header Section */}
        <div className="bg-black text-white p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">Trip Details</h2>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <FaChargingStation className="w-5 h-5" />
            </div>
          </div>
          <p className="text-gray-300 text-xs">
            Your charging session information
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-6">
          {/* Charger Information */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaChargingStation className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                  Charging Station
                </p>
                <p className="text-xs font-semibold text-black">EV Station 1</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaRoute className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                  Distance
                </p>
                <p className="text-xs font-semibold text-black">12.5 km</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-black transition-colors">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <FaClock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                  Estimated Time
                </p>
                <p className="text-xs font-semibold text-black">15 mins</p>
              </div>
            </div>
          </div>

          {/* Access Code Section */}
          <div className="bg-black text-white rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <BsShieldCheck className="w-4 h-4" />
              <p className="text-xs font-medium uppercase tracking-wide">
                Access Code
              </p>
            </div>
            <div className="flex items-center justify-between bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="text-base font-bold tracking-[0.3em] font-mono">
                  {accessCode}
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                className="w-7 h-7 bg-white text-black rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <span className="text-xs font-bold">✓</span>
                ) : (
                  <MdContentCopy className="w-3 h-3" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-3">
              Use this code to access the charging station
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Contact Host Section */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <FaPhoneAlt className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                    Call Host
                  </p>
                  <p className="text-xs font-semibold text-black">
                    +91 720 270 2626
                  </p>
                </div>
              </div>
              <a
                href="tel:+917202702626"
                className="px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-xs"
              >
                Call
              </a>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Station Active</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const Track = () => {
  return (
    <div className="w-full h-full flex flex-1 relative">
      <MapWithRouting />

      <div className="">
        <TripDetailsContainer />
      </div>
    </div>
  );
};

export default Track;
