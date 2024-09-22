import { z } from 'zod';

// Define validation schemas
const organizationDetailsSchema = z.object({
    name: z.string().min(2, "Organization name must be at least 2 characters long."),
    type: z.string().min(1, "Please select Organization  type "),
    websiteUrl: z.string().url("Invalid website URL.").optional(),
    address: z.string().min(5, "Address must be at least 5 characters long."),
    contactInfo: z.string()
        .regex(/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,}$/, "Invalid email address.")
        .or(z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number."))
        .or(z.string().regex(/^\d{10}$/, "Invalid mobile number."))
        .optional(),
    
});



const priceSchema = (ticketType: string) =>
    z
        .union([z.number(), z.string()])
        .nullable()
        .refine(val => val !== '', `Enter a non-empty ${ticketType} price.`)  // Ensure value is not an empty string
        .transform(val => (val === null ? null : Number(val)))
        .refine(
            val => val === null || val >= 0,
            `Enter a non-negative ${ticketType} price.`
        );


const openingHoursSchema = z.record(
    z.object({
        open: z.string().optional().default('Closed'),
        close: z.string().optional().default('Closed'),
    })
);

const botAppearanceSchema = z.object({
    name: z.string().min(2, "Bot name is required and must be 2 character long ."),
    tone: z.enum(['formal', 'friendly', 'playful', 'informative']),
    avatar: z.string().url().optional(),
    welcomeMessage: z.string().min(1, "Bot welcome message is required."),
});

const ticketPricesSchema = z.object({
    adultPrice: priceSchema('adult'),
    childPrice: priceSchema('child'),
    foreignerPrice: priceSchema('foreigner'),
    addOns: z.object({
        cloakRoomCharges: priceSchema('cloak room').optional(),
        guidedTour: priceSchema('guided tour').optional(),
        highEndCamera: priceSchema('high-end camera').optional(),
        customAddOns: z.array(z.object({
            name: z.string().min(1, "Add-on name is required."),
            price: z.number().refine(val => val >= 0, "Add-on price must be a non-negative number."),
        })).optional(),
    }),
});
const contextSetupSchema = z.object({
    largeText: z.string().optional(),
    contextFileUrl: z.string().url("Please provide a valid URL for the context file."),
    customQuestions: z.array(z.object({
        questionText: z.string(),
        textAreaValue: z.string().min(1, "Custom question text is required."),
    })).optional(),
});

const welcomeQuestionsSchema = z.array(z.object({
    id: z.string(),
    text: z.string().min(1, "Welcome question text is required."),
})).refine((questions) => questions.length > 0, {
    message: "At least one welcome question is required.",
});

// Main schema for merged data
export const mergedDataSchema = z.object({
     welcomeQuestions: welcomeQuestionsSchema,
    organizationDetails: organizationDetailsSchema,
    hours: openingHoursSchema,
    botDetails: botAppearanceSchema,
    ticketPrices: ticketPricesSchema,
    contextSetup: contextSetupSchema,
    userId: z.string().min(1, "User ID is required."),
});

