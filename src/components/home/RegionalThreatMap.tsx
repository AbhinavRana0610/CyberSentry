import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RegionalThreatMap() {
    return (
        <Card className="h-full border-t-4 border-t-blue-800 shadow-sm col-span-1 md:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">Regional Live Updates</CardTitle>
                <CardDescription>Hotspots for Phishing, UPI Fraud, and Identity Theft</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Placeholder for Map */}
                <div className="bg-slate-100 rounded-lg h-64 w-full flex items-center justify-center relative overflow-hidden border border-slate-200">
                    <p className="text-slate-400 font-medium z-10">Interactive India Map Visualization Placeholder</p>

                    {/* Fake Hotspots */}
                    <div className="absolute top-1/4 left-1/4">
                        <Badge variant="destructive" className="animate-pulse shadow-md">NCR: Phishing</Badge>
                    </div>
                    <div className="absolute bottom-1/3 right-1/4">
                        <Badge variant="destructive" className="animate-pulse shadow-md bg-orange-600 hover:bg-orange-700">Bangalore: UPI Scams</Badge>
                    </div>
                    <div className="absolute top-1/3 right-1/3">
                        <Badge variant="destructive" className="animate-pulse shadow-md bg-yellow-600 hover:bg-yellow-700">Mumbai: KYC Fraud</Badge>
                    </div>
                </div>
                <div className="mt-4 flex gap-4 text-xs text-slate-500 justify-end">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> High Activity</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Moderate</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span> Monitoring</span>
                </div>
            </CardContent>
        </Card>
    );
}
