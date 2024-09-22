// app/api/builder/check-url/route.ts
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BuilderData from "@/models/BuilderModel";

export async function GET(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Get the URL to check from the query parameters
        const urlToCheck = req.nextUrl.searchParams.get('url');

        if (!urlToCheck) {
            return NextResponse.json({
                success: false,
                message: 'URL parameter is required',
            }, { status: 400 });
        }

        // Check if the URL exists in the database
        const isUrlAvailable = !(await BuilderData.exists({ botUrl: urlToCheck }));

        // Return the result
        return NextResponse.json({
            success: true,
            isAvailable: isUrlAvailable,
        }, { status: 200 });
    } catch (error) {
        console.error('Error checking URL availability:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to check URL availability',
        }, { status: 500 });
    }
}
