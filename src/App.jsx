// src/App.jsx
import {Rocket, Wand2, Sparkles, ArrowRight, MoveRight, Cloud, BookText, Eye, GitCommitHorizontal} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '/src/components/ui/card.jsx';
import {Button} from '/src/components/ui/button.jsx';
import {Link, NavLink} from "react-router-dom";
import {motion} from 'framer-motion';
import {useState} from 'react';

function LandingPage() {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isGlitching, setIsGlitching] = useState(false);

    // Philosophical quotes that change randomly
    const uncertainQuotes = [
        "The path appears only as you walk it",
        "Certainty is an illusion, embrace the flux",
        "Every creation begins with not-knowing",
        "The weather of ideas changes like the sky"
    ];
    const [currentQuote, setCurrentQuote] = useState(uncertainQuotes[0]);

    const randomizeQuote = () => {
        setIsGlitching(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * uncertainQuotes.length);
            setCurrentQuote(uncertainQuotes[randomIndex]);
            setIsGlitching(false);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors overflow-hidden">
            {/* Animated background elements */}
            <div className="">

                <div className="fixed inset-0 -z-10 opacity-10">
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-primary"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                width: Math.random() * 300 + 100,
                                height: Math.random() * 300 + 100,
                                opacity: 0.1
                            }}
                            animate={{
                                x: [null, Math.random() * window.innerWidth],
                                y: [null, Math.random() * window.innerHeight],
                                transition: {
                                    duration: Math.random() * 30 + 20,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }
                            }}
                        />
                    ))}
                </div>

            </div>




            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24 text-center relative">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    className="max-w-3xl mx-auto"
                >

                    <div>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            onMouseEnter={() => setIsGlitching(true)}
                            onMouseLeave={() => setIsGlitching(false)}
                        >
                            <span className={`text-primary ${isGlitching ? 'text-glitch' : ''}`}>Pouncert</span>
                        </motion.h2>
                    </div>


                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6"
                        onMouseEnter={() => setIsGlitching(true)}
                        onMouseLeave={() => setIsGlitching(false)}
                    >
                        The Power of <span className={`text-primary ${isGlitching ? 'text-glitch' : ''}`}>Uncertain Creation</span>
                    </motion.h2>

                    <NavLink to="may_be_machine">
                         <span
                             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 dark:bg-primary/20 dark:border dark:border-primary/30">
                              <Sparkles className="w-4 h-4"/>
                             Uncertain Creation
                           </span>

                    </NavLink>

                    <motion.p
                        className={`text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed ${isGlitching ? 'opacity-70' : ''}`}
                        onClick={randomizeQuote}
                        whileHover={{scale: 1.02}}
                    >
                        {currentQuote}
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link  to="/weather">
                            <Button  size="lg" className="gap-2 group cursor-grab">
                                <Cloud className="w-5 h-5"/>
                                Weather as Metaphor
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="gap-2">
                            <BookText className="w-5 h-5"/>
                            Philosophical Forecast
                        </Button>
                    </div>
                </motion.div>
            </section>

            {/* Core Principles */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.p
                        className="text-lg text-muted-foreground italic"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                    >
                        "Some of the most profound innovations emerge from not having all the answers upfront"
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.1}}
                            viewport={{once: true, margin: "-100px"}}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                        >
                            <Card
                                className={`relative overflow-hidden transition-all ${hoveredCard === index ? 'border-primary shadow-lg' : ''}`}>
                                {hoveredCard === index && (
                                    <motion.div
                                        className="absolute inset-0 bg-primary/5"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                    />
                                )}
                                <CardHeader>
                                    <div
                                        className={`bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-colors ${hoveredCard === index ? 'bg-primary/20' : ''}`}>
                                        <principle.icon
                                            className={`text-primary w-6 h-6 transition-transform ${hoveredCard === index ? 'scale-110' : ''}`}/>
                                    </div>
                                    <CardTitle>{principle.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {principle.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Interactive Uncertainty Meter */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    className="bg-background border rounded-xl p-8 max-w-2xl mx-auto text-center"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <Eye className="w-6 h-6 text-primary"/>
                        <h3 className="text-2xl font-bold">Current Uncertainty Index</h3>
                    </div>

                    <div className="h-4 bg-muted rounded-full overflow-hidden mb-6">
                        <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{width: '0%'}}
                            animate={{width: `${Math.random() * 70 + 30}%`}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "mirror",
                                repeatDelay: 1
                            }}
                        />
                    </div>

                    <p className="text-muted-foreground italic">
                        "This meter fluctuates like creative confidence - never stable, always evolving"
                    </p>
                </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4 py-32 text-center">
                <motion.div
                    className="max-w-2xl mx-auto bg-primary/5 p-8 rounded-xl dark:bg-primary/10 dark:border dark:border-primary/20 relative overflow-hidden"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                >
                    <GitCommitHorizontal className="absolute -left-10 -top-10 text-primary/10 w-32 h-32 -rotate-45"/>
                    <Sparkles className="absolute -right-10 -bottom-10 text-primary/10 w-32 h-32 rotate-12"/>

                    <h3 className="text-2xl font-bold mb-4 relative z-10">
                        Ready to Embrace the Unknown?
                    </h3>
                    <p className="text-muted-foreground mb-6 relative z-10">
                        This journey is better with companions. Stay updated as the vision unfolds.
                    </p>
                    <Button size="lg" className="gap-2 group relative z-10">
                        Get Updates
                        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </Button>
                </motion.div>
            </section>
        </div>
    )
}

const principles = [
    {
        icon: Wand2,
        title: "Uncertain Vision",
        description: "The final form reveals itself through the process of creation, not before."
    },
    {
        icon: GitCommitHorizontal,
        title: "Iterative Progress",
        description: "Each version improves upon the last, guided by real feedback."
    },
    {
        icon: Eye,
        title: "Confident Uncertainty",
        description: "Not knowing the exact destination, but trusting the direction."
    }
]


export default function App() {
    return (
        <LandingPage/>
    )
}