import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PoemPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const topRef = useRef(null);

    // Words that will fall during scrolling
    const fallingWords = [
        "light up the room", "talk like a storm", "the life of the party",
        "love people", "talk to everyone", "social butterfly",
        "enjoy the spotlight", "live for the backstage", "invisible broadcaster"
    ];

    // Track scroll position
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // Poem text with JSX formatting
    const poemLines = [
        <>I can <span className="font-bold">light up the room</span>, so bright and alive,<br/>Yet deep down inside, I just want to hide.</>,
        <>I <span className="font-bold">talk like a storm</span>, my words never cease,<br/>But silence, oh silence, it gives me peace.</>,
        <>I'm <span className="font-bold">the life of the party</span>, I glow, I ignite,<br/>Yet I long for the comfort of solitude's night.</>,
        <>I <span className="font-bold">love people</span>, their laughter, their cheer,<br/>But sometimes, I wish they'd all disappear.</>,
        <>I can <span className="font-bold">talk to everyone</span>, be bold and seen,<br/>But in my heart, I crave the unseen.</>,
        <>A <span className="font-bold">social butterfly</span> with a secret space,<br/>Dancing in crowds, then vanishing—no trace.</>,
        <>I <span className="font-bold">enjoy the spotlight</span>, its warmth, its grace,<br/>Yet I <span className="font-bold">live for the backstage</span>, my quiet place.</>,
        <>An <span className="font-bold">invisible broadcaster</span>, a fleeting light,<br/>Burning so brightly, then lost in the night.</>
    ];

    // Generate random position for falling words
    const getRandomPosition = () => {
        return {
            x: Math.random() * 70 - 35,
            rotate: Math.random() * 40 - 20,
        };
    };

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            {/* Reference for auto-focus on top */}
            <div ref={topRef} className="absolute top-0" />

            {/* Falling words animation */}
            {fallingWords.map((word, index) => (
                <motion.div
                    key={index}
                    className="fixed text-white text-opacity-10 font-mono pointer-events-none"
                    style={{
                        left: `${10 + (index * 9) % 80}%`,
                        top: 0,
                        fontSize: `${1 + Math.random()}rem`,
                        zIndex: 10,
                    }}
                    initial={{ y: -100, opacity: 0 }}
                    animate={scrollY > 50 ? {
                        y: '100vh',
                        opacity: [0, 0.4, 0.2, 0],
                        ...getRandomPosition()
                    } : { y: -100, opacity: 0 }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        delay: Math.random(),
                        ease: [0.2, 0.1, 0.3, 1]
                    }}
                >
                    {word}
                </motion.div>
            ))}

            {/* Main poem content */}
            <div className="container mx-auto px-4 py-16 max-w-2xl">
                <motion.div
                    className="p-8 border border-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="text-center mb-12">
                        <motion.h1
                            className="text-2xl md:text-3xl font-mono mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            THE SOCIALLY EXHAUSTED EXTROVERT
                        </motion.h1>

                        <motion.div
                            className="h-px w-16 bg-white mx-auto"
                            initial={{ width: 0 }}
                            animate={{ width: 64 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                    </div>

                    <div className="space-y-8 leading-relaxed text-lg font-serif">
                        {poemLines.map((line, index) => (
                            <motion.p
                                key={index}
                                className="mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.15, duration: 0.8 }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        className="mt-12 text-right italic text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        — Written by Vimal Suresh
                    </motion.div>
                </motion.div>
            </div>

            <div className="py-8 text-center text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} Vimal Suresh</p>
            </div>
        </div>
    );
};

export default PoemPage;