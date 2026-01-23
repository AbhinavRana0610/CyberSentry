"use client";

import React, { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// URL for World Atlas TopoJSON (standard reliable source)
const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Basic type for GeoJSON geometry properties
interface GeoGeometry {
    rsmKey: string;
    id?: string;
    properties: {
        name?: string;
        [key: string]: any;
    };
}

type ThreatLocation = {
    id: string;
    city: string;
    issue: string;
    coordinates: [number, number]; // [Longitude, Latitude]
    severity: "critical" | "high" | "elevated" | "emerging";
    colorHex: string;
};

// STRICTLY REAL COORDINATES [Lng, Lat]
const LOCATIONS: ThreatLocation[] = [
    {
        id: "ncr",
        city: "New Delhi (NCR)",
        issue: "Phishing & Sextortion",
        coordinates: [77.2090, 28.6139],
        severity: "critical",
        colorHex: "#DC2626", // red-600
    },
    {
        id: "jaipur",
        city: "Jaipur",
        issue: "OLX Fraud",
        coordinates: [75.7873, 26.9124],
        severity: "high",
        colorHex: "#EA580C", // orange-600
    },
    {
        id: "mumbai",
        city: "Mumbai",
        issue: "Bank Inv. Fraud",
        coordinates: [72.8777, 19.0760],
        severity: "elevated",
        colorHex: "#CA8A04", // yellow-600
    },
    {
        id: "bengaluru",
        city: "Bengaluru",
        issue: "Tech Support Fraud",
        coordinates: [77.5946, 12.9716],
        severity: "emerging",
        colorHex: "#9333EA", // purple-600
    },
    {
        id: "chennai",
        city: "Chennai",
        issue: "FedEx/Courier Fraud",
        coordinates: [80.2707, 13.0827],
        severity: "emerging",
        colorHex: "#2563EB", // blue-600
    },
    {
        id: "kolkata",
        city: "Kolkata",
        issue: "Loan App Harassment",
        coordinates: [88.3639, 22.5726],
        severity: "high",
        colorHex: "#EA580C", // orange-600
    },
    {
        id: "jamtara",
        city: "Jamtara (Jharkhand)",
        issue: "KYC & OTP Fraud",
        coordinates: [86.8000, 23.9640],
        severity: "critical",
        colorHex: "#DC2626", // red-600
    },
];

export function RegionalThreatMap() {
    const [tooltipContent, setTooltipContent] = useState<string | null>(null);

    // Optimized projection config for India
    const projectionConfig = useMemo(() => ({
        scale: 1000,
        center: [78.9629, 22.5937] as [number, number]
    }), []);

    return (
        <Card className="h-full border-t-4 border-t-blue-800 shadow-sm w-full flex flex-col">
            <CardHeader className="pb-2 flex-none">
                <CardTitle className="text-lg font-bold text-slate-800 flex justify-between items-center">
                    <span>Regional Live Updates</span>
                    <Badge variant="outline" className="text-xs font-normal">Live Feed • Real-time Geo-Plotting</Badge>
                </CardTitle>
                <CardDescription>Real-time guided map of cyber fraud hotspots across India (Mercator Projection)</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[400px] relative overflow-hidden p-0 flex items-center justify-center bg-slate-50/50">
                <div className="w-full max-w-[600px] aspect-[4/3] relative">

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={projectionConfig}
                        width={800}
                        height={600}
                        className="w-full h-full"
                        role="img"
                        aria-label="Map of India displaying cyber threat locations"
                        style={{ width: "100%", height: "auto" }}
                    >
                        {/* Render India Geography */}
                        <Geographies geography={GEO_URL}>
                            {({ geographies }: { geographies: GeoGeometry[] }) =>
                                geographies.map((geo) => {
                                    // Filter for India (ID 356 or name India)
                                    // World Atlas usually uses numeric ID strings
                                    const isIndia = geo.id === "356" || geo.properties.name === "India";
                                    if (!isIndia) return null;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            style={{
                                                default: { fill: "#E2E8F0", stroke: "#94A3B8", strokeWidth: 0.5, outline: "none" },
                                                hover: { fill: "#CBD5E1", stroke: "#64748B", strokeWidth: 0.75, outline: "none" },
                                                pressed: { fill: "#E2E8F0", stroke: "#94A3B8", strokeWidth: 0.5, outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* Render Markers with Permanent Labels */}
                        {LOCATIONS.map((loc) => {
                            // Determine label direction based on longitude
                            // Longitude > 78 (East India) -> Label flows Left (End)
                            // Longitude < 78 (West/South India) -> Label flows Right (Start)
                            // This ensures labels mostly point inwards towards the landmass
                            const isEast = loc.coordinates[0] > 78;
                            const textAnchor = isEast ? "end" : "start";
                            const xOffset = isEast ? -12 : 12;

                            return (
                                <Marker key={loc.id} coordinates={loc.coordinates}>
                                    <g
                                        className="cursor-pointer group focus:outline-none"
                                        role="button"
                                        aria-label={`${loc.city}: ${loc.issue}`}
                                        tabIndex={0}
                                        onMouseEnter={() => setTooltipContent(`${loc.city}: ${loc.issue}`)}
                                        onMouseLeave={() => setTooltipContent(null)}
                                        onFocus={() => setTooltipContent(`${loc.city}: ${loc.issue}`)}
                                        onBlur={() => setTooltipContent(null)}
                                    >
                                        {/* Pulse Effect */}
                                        <circle r={16} fill={loc.colorHex} opacity={0.2} className="animate-ping" />

                                        {/* Core Marker */}
                                        <circle r={4} fill={loc.colorHex} stroke="#fff" strokeWidth={1.5} />

                                        {/* Permanent Label Group */}
                                        <g style={{ pointerEvents: 'none' }}>
                                            {/* Text Halo (Background Stroke) for Readability */}
                                            <text
                                                textAnchor={textAnchor}
                                                x={xOffset}
                                                y={-2}
                                                className="font-sans text-[11px] font-extrabold fill-transparent stroke-white stroke-[3px] opacity-90"
                                                style={{ strokeLinejoin: "round" }}
                                            >
                                                {loc.city}
                                            </text>
                                            <text
                                                textAnchor={textAnchor}
                                                x={xOffset}
                                                y={9}
                                                className="font-sans text-[9px] font-bold fill-transparent stroke-white stroke-[3px] opacity-90"
                                                style={{ strokeLinejoin: "round" }}
                                            >
                                                {loc.issue}
                                            </text>

                                            {/* Foreground Text */}
                                            <text
                                                textAnchor={textAnchor}
                                                x={xOffset}
                                                y={-2}
                                                className="font-sans text-[11px] font-extrabold fill-slate-800"
                                            >
                                                {loc.city}
                                            </text>
                                            <text
                                                textAnchor={textAnchor}
                                                x={xOffset}
                                                y={9}
                                                className="font-sans text-[9px] font-bold fill-slate-600 uppercase tracking-tight"
                                            >
                                                {loc.issue}
                                            </text>
                                        </g>
                                    </g>
                                </Marker>
                            );
                        })}
                    </ComposableMap>

                    {/* Legend Overlay */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-md border border-slate-200 text-xs space-y-2 pointer-events-none">
                        <div className="font-semibold text-slate-700 mb-1 border-b pb-1">Threat Intensity</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span> Critical</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-600 mr-2"></span> High</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-600 mr-2"></span> Elevated</div>
                        <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span> Emerging</div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}
