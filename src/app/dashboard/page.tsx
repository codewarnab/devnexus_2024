import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";

export const metadata: Metadata = {
    title:
        "Conversfi - get your business online with our dashboard kit",
    description: "get insights on your business with our dashboard kit",
};

export default function Dashboard() {
    return (
        <>
            <DefaultLayout>
                <ECommerce />
            </DefaultLayout>
        </>
    );
}
