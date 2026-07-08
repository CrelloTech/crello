"use client";

import { useState } from "react";

import ContactButton from "@/components/contact/ContactButton";
import ContactOverlay from "@/components/contact/ContactOverlay";

export default function Hero() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <ContactButton
                onClick={() => setOpen(true)}
            />

            <ContactOverlay
                open={open}
                onClose={() => setOpen(false)}
            />

        </>

    );

}