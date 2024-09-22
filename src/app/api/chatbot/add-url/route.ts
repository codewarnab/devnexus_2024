// app/api/builder/update/route.ts
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BuilderData from "@/models/BuilderModel";

export async function PUT(req: NextRequest) {
    try {
        
        await dbConnect();

        // Parse the request body
        const { id, botUrl } = await req.json();


        // Update the botUrl for the specified document
        const updatedData = await BuilderData.findByIdAndUpdate(
            id,
            { botUrl },
            { new: true }
        );

        if (!updatedData) {
            return NextResponse.json({
                success: false,
                message: 'No chatbot detail found with the given ID',
            }, { status: 404 });
        }

        // Return a success response
        return NextResponse.json({
            success: true,
            message: 'Bot URL updated successfully',
            data: updatedData
        }, { status: 200 });
    } catch (error) {
        console.error('Error updating bot URL:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to update bot URL',
        }, { status: 500 });
    }
}
