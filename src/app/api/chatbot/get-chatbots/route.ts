import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BuilderData from "@/models/BuilderModel";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Parse the query parameters
        const userId = req.nextUrl.searchParams.get('userId');
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'User ID is required',
            }, { status: 400 });
        }

        // Find the documents based on the user ID
        const builderDataArray = await BuilderData.find({ userId }).select('botDetails botUrl'); // Include botUrl

        if (builderDataArray.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'No bot details found for the given user ID',
            }, { status: 404 });
        }

        // Extract the bot details and botUrl for each document
        const botDetailsArray = builderDataArray.map(({ botDetails, botUrl }) => ({
            id: botDetails._id.toString(),
            name: botDetails.name,
            avatar: botDetails.avatar,
            botUrl: botUrl, // Include botUrl in the response
        }));

        // Return the array of bot details
        return NextResponse.json({
            success: true,
            botDetails: botDetailsArray,
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching bot details:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to fetch bot details',
        }, { status: 500 });
    }
}
