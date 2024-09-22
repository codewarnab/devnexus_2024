// models/BuilderData.js
import mongoose from 'mongoose';

// Define the schema for the organization details
const organizationDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    websiteUrl: { type: String, match: /^(https?:\/\/[^\s$.?#].[^\s]*)?$/i, default: '' },
    address: { type: String, required: true },
    contactInfo: {
        type: String,
        match: /^([\w-]+@([\w-]+\.)+[a-zA-Z]{2,}|^\+?[1-9]\d{1,14}$|^\d{10}$)?$/,
        default: ''
    },
    
});

// Define the schema for opening hours
const openingHoursSchema = new mongoose.Schema({
    open: { type: String, default: 'Closed' },
    close: { type: String, default: 'Closed' }
});

// Define the schema for bot appearance
const botAppearanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tone: { type: String, enum: ['formal', 'friendly', 'playful', 'informative'], required: true },
    avatar: { type: String, match: /^(https?:\/\/[^\s$.?#].[^\s]*)?$/i, default: '' },
    welcomeMessage: { type: String, required: true }
});

// Define the schema for ticket prices
const ticketPricesSchema = new mongoose.Schema({
    adultPrice: { type: Number, min: 0, default: null },
    childPrice: { type: Number, min: 0, default: null },
    foreignerPrice: { type: Number, min: 0, default: null },
    addOns: {
        cloakRoomCharges: { type: Number, min: 0, default: null },
        guidedTour: { type: Number, min: 0, default: null },
        highEndCamera: { type: Number, min: 0, default: null },
        customAddOns: [{
            name: { type: String, required: true },
            price: { type: Number, min: 0, required: true }
        }]
    }
});

// Define the schema for context setup
const contextSetupSchema = new mongoose.Schema({
    largeText: { type: String, default: '' },
    contextFileUrl: { type: String, match: /^(https?:\/\/[^\s$.?#].[^\s]*)?$/i, required: true },
    customQuestions: [{
        questionText: { type: String },
        textAreaValue: { type: String }
    }]
});

// Define the schema for welcome questions
const welcomeQuestionsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true }
});

// Define the main schema with all nested schemas
const builderDataSchema = new mongoose.Schema({
    welcomeQuestions: [welcomeQuestionsSchema],
    organizationDetails: { type: organizationDetailsSchema, required: true },
    hours: { type: Map, of: openingHoursSchema },
    botDetails: { type: botAppearanceSchema, required: true },
    ticketPrices: { type: ticketPricesSchema, required: true },
    contextSetup: { type: contextSetupSchema, required: true },
    botUrl: { type: String, default: '' },
    userId: { type: String, required: true }
});


export default mongoose.models.BuilderData || mongoose.model('BuilderData', builderDataSchema);
