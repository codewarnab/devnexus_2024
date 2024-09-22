// app/api/builder/save/route.ts
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BuilderData from "@/models/BuilderModel";

export async function POST(req: NextRequest) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const body = await req.json();

        // Print the parsed body to the console
        console.log(body);

        // Create a new document in the BuilderData collection
        const newBuilderData = new BuilderData(body);

        // Save the document to the database
        const savedData = await newBuilderData.save();

        // Return a success response
        return NextResponse.json({
            success: true,
            message: 'Chatbot detail saved successfully',
            id: savedData._id.toString(),
        }, { status: 201 });
    } catch (error) {
        console.error('Error saving chatbot detail:', error);
        return NextResponse.json({
            success: false,
            message: 'Failed to save chatbot detail',
        }, { status: 500 });
    }
}
