import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Create Your Custom Chatbot | Organization Bot Builder",
  description: "Fill out the form to create a custom chatbot tailored to your organization's needs, whether it's a zoo, museum, park, or eco park.",
};


const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
