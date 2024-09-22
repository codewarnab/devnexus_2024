"use client";

import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChartThree from "../Charts/ChartThree";
import DataStatsOne from "../DataStats/DataStatsOne";
import ChartFive from "../Charts/ChartFive";

export default function ECommerce() {
  return (
    <div className="min-h-screen space-y-6 bg-gray-900 p-4 text-white">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-400">
        Conversit: Tailor-Made Chatbots for Your Unique Needs.
      </p>

      <DataStatsOne />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Payments Overview</h2>
          <ChartOne />
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Profit this week</h2>
          <ChartTwo />
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Languages spoken by visitors
          </h2>
          <ChartThree />
        </div>
        <div className="rounded-lg bg-gray-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Campaign Visitors</h2>
          <ChartFive />
        </div>
      </div>
    </div>
  );
}
