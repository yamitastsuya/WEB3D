import React, { useEffect } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Achievements from "./sections/Achievements.jsx";
import Oldstudents from "./sections/Oldstudents.jsx";
import Footer from "./sections/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget.jsx";
import Countdown from "./sections/Countdown.jsx";
import Guestbook from "./sections/Guestbook.jsx";

const Home = () => {
    useEffect(() => {
        const scrollToId = localStorage.getItem("scrollToSection");
        if (scrollToId) {
            setTimeout(() => {
                const el = document.getElementById(scrollToId);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                localStorage.removeItem("scrollToSection");
            }, 400); // Delay để đảm bảo phần tử đã render
        }
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <Countdown />
            <About />
            <Guestbook />
            <Achievements />
            <Oldstudents />
            <ScrollToTop />
            <ChatWidget />
            <Footer />
        </>
    );
};

export default Home;
