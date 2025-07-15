
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart2,
  BrainCircuit,
  Lightbulb,
  Rocket,
  Save,
  Search,
  Sparkles,
  TrendingUp,
  Wand2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { AnimatedDiv } from '@/components/animated-div';
import { cn } from '@/lib/utils';
import React from 'react';
import { MagneticButton } from '@/components/magnetic-button';

const featureCards = [
  {
    icon: Sparkles,
    title: 'Endless Inspiration',
    description: 'AI that never runs out of ideas, keeping your creativity flowing.',
  },
  {
    icon: TrendingUp,
    title: 'Trend-Aware Suggestions',
    description: 'Based on viral TikTok content to keep your effects relevant.',
  },
  {
    icon: BrainCircuit,
    title: 'Creative Constraints',
    description: 'Challenge modes to unlock new concepts and push boundaries.',
  },
  {
    icon: Save,
    title: 'Save & Share Boards',
    description: 'Moodboards for every idea you love, ready for collaboration.',
  },
  {
    icon: Rocket,
    title: 'Virality Predictor',
    description: 'See what could go big before you build and invest your time.',
  },
];

const faqItems = [
    {
        question: "What is EffectSpark?",
        answer: "EffectSpark is an AI-powered brainstorming tool for TikTok creators. It helps you generate fresh effect ideas, analyze trends, and predict an idea's potential for virality, streamlining your creative process."
    },
    {
        question: "How does the AI work?",
        answer: "Our AI is trained on a massive dataset of successful TikTok effects and trends. It analyzes patterns, styles, and user engagement to generate new, relevant, and creative ideas tailored to your prompts and constraints."
    },
    {
        question: "Is EffectSpark free to use?",
        answer: "Yes, EffectSpark offers a generous free tier that allows you to explore core features like the idea generator and trend analyzer. We may introduce premium features in the future for power users and creative teams."
    },
    {
        question: "Can I link my TikTok account?",
        answer: "Yes! You can link your TikTok account on the Profile page to get more personalized insights and track your effect history over time. This feature is currently in beta."
    }
];

const SocialLink = ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={cn("text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110 hover:-translate-y-1", className)}>
        {children}
    </Link>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 332" {...props} className="h-5 w-5">
        <path fill="currentColor" d="M81.5 194.1c-5.8-3.4-11.9-6.2-18-8.4v-56.1c3.5 1.1 6.8 2.3 10.2 3.6v-57.9c-3.4-.9-6.8-1.8-10.2-2.7V19.9c32.3 0 59.4 26.9 59.4 60.2 0 33.3-27.1 60.2-59.4 60.2-1.5 0-3-.1-4.4-.2v56.5c24.4 9.1 47.9 20.3 69.1 34.3v-58.3c-20.4-12.8-42.3-24.3-64.7-33.4z"></path>
        <path fill="currentColor" d="M149.2 0v180.6c-26.2 15.3-54.7 26.9-84.7 34.3V158c29.1-7.2 56.4-19.1 80.3-34.3V0h4.4z" opacity="0.5"></path>
        <path fill="currentColor" d="M208.6 19.9v57.9c-3.4 1-6.8 1.9-10.2 2.7v57.9c3.4-1.2 6.8-2.5 10.2-3.6v56.1c-6.1 2.2-12.2 5-18 8.4-22.4 9.1-44.3 20.6-64.7 33.4v58.3c21.2-14 44.7-25.2 69.1-34.3 26-9.6 51.5-22.1 74.3-37.2 22.9-15.1 43.1-33.1 60.2-53.5 17.1-20.4 30.6-43.7 39.9-69.1 1.5-4.1 2.9-8.2 4.1-12.4h-58.3c-1.2 3.8-2.5 7.6-4.1 11.3-8.8 23.8-22.1 45-39.2 63.1-17.1 18-36.8 33.4-58.8 45.8v-57.9c25.2-11.3 48.7-25.5 69.8-42.5 21.1-17.1 39.2-37.1 53.5-59.4 14.3-22.2 24.3-46.8 29.5-73.4h58.3c-9.1 26.6-22.8 51.2-40.6 73.4-17.8 22.2-38.9 41.5-62.8 57.2z"></path>
    </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props} className="h-5 w-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props} className="h-5 w-5">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

const heroHeadline = "Generate Viral TikTok Effect Ideas in Seconds – Powered by AI";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-center min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 motion-safe:animate-background-pan bg-gradient-to-br from-background via-purple-900/10 to-teal-900/20 -z-10"></div>
          <div className="container relative">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
              {heroHeadline.split("").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block motion-safe:animate-letter-in transition-all duration-300 ease-in-out hover:text-primary hover:-translate-y-2 hover:drop-shadow-[0_0_10px_hsl(var(--primary))]"
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground motion-safe:animate-fade-in" style={{ animationDelay: '0.8s' }}>
              Whether you're a beginner or pro, our AI inspires creative, trending AR filter ideas tailored just for TikTok.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 motion-safe:animate-fade-in" style={{ animationDelay: '1s' }}>
              <MagneticButton>
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/generator">
                    <Wand2 /> Try it Free
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link href="#how-it-works">
                    <BarChart2 /> See How It Works
                  </Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-secondary/30">
          <div className="container">
            <AnimatedDiv className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Turn Creativity into Virality – Here’s How
              </h2>
              <p className="mt-2 text-muted-foreground">
                Simplify your creative workflow and let AI handle the heavy
                lifting.
              </p>
            </AnimatedDiv>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <AnimatedDiv style={{ animationDelay: '0.2s' }}>
                  <Card className="text-center bg-card/50 group h-full transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 hover:shadow-lg">
                    <CardHeader>
                      <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <Lightbulb className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>1. Describe Your Style or Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Choose a vibe, trend, or creative constraint.</p>
                    </CardContent>
                  </Card>
                </AnimatedDiv>
                <AnimatedDiv style={{ animationDelay: '0.4s' }}>
                  <Card className="text-center bg-card/50 group h-full transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 hover:shadow-lg">
                    <CardHeader>
                      <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <Sparkles className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>2. AI Suggests Effect Ideas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Get tailored, ready-to-use effect prompts.</p>
                    </CardContent>
                  </Card>
                </AnimatedDiv>
                <AnimatedDiv style={{ animationDelay: '0.6s' }}>
                  <Card className="text-center bg-card/50 group h-full transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-2 hover:shadow-lg">
                    <CardHeader>
                      <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle>3. Build, Post, Go Viral</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Bring ideas to life in TikTok Effect House.</p>
                    </CardContent>
                  </Card>
                </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20">
          <div className="container">
            <AnimatedDiv className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Designed for TikTok Effect Creators
              </h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to spark creativity and build with
                confidence.
              </p>
            </AnimatedDiv>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featureCards.map((feature, index) => (
                <AnimatedDiv key={index} style={{ animationDelay: `${index * 0.15}s` }}>
                  <Card className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card hover:-translate-y-2 transition-all text-left h-full">
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Ideas Teaser */}
        <section className="py-20 bg-secondary/30">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <AnimatedDiv className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">What’s Hot Right Now?</h2>
                    <p className="text-muted-foreground text-lg">
                        Our AI analyzes the latest TikTok trends to generate fresh, relevant, and high-potential effect ideas for you, complete with a predicted virality score.
                    </p>
                     <Button asChild className="font-semibold">
                        <Link href="/generator">
                        Try the Generator <ArrowRight />
                        </Link>
                    </Button>
                </AnimatedDiv>
                <div className="space-y-4">
                     <AnimatedDiv style={{ animationDelay: '0.2s' }}>
                        <Card className="bg-card motion-safe:animate-float motion-safe:hover:animate-pulse hover:scale-105 transition-transform duration-300">
                            <CardHeader>
                                <CardTitle>Invisible Dance Challenge AR</CardTitle>
                                <CardDescription>Based on trending sound: #speedramp</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-center">
                                <span className="text-sm font-bold">🔥🔥🔥</span>
                                <span className="font-bold text-lg text-primary">88</span>
                            </CardFooter>
                        </Card>
                     </AnimatedDiv>
                     <AnimatedDiv style={{ animationDelay: '0.4s' }}>
                        <Card className="bg-card motion-safe:animate-float [animation-delay:0.7s] ml-8 motion-safe:hover:animate-pulse hover:scale-105 transition-transform duration-300">
                            <CardHeader>
                                <CardTitle>AI Pet Sidekick</CardTitle>
                                <CardDescription>A cute, customizable AI creature that reacts to your expressions.</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-center">
                                <span className="text-sm font-bold">🔥🔥🔥🔥🔥</span>
                                <span className="font-bold text-lg text-primary">92</span>
                            </CardFooter>
                        </Card>
                    </AnimatedDiv>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <AnimatedDiv className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Loved by Creators Worldwide
              </h2>
            </AnimatedDiv>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatedDiv style={{ animationDelay: '0.2s' }}>
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="pt-6">
                    <p className="italic">"I built 3 effects this week with ideas from this tool – one already hit 500k views!"</p>
                  </CardContent>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src="https://placehold.co/40x40.png"
                        alt="Creator"
                        width={40}
                        height={40}
                        className="rounded-full"
                        data-ai-hint="creator avatar"
                      />
                      <div>
                        <CardTitle className="text-base">@ViralCreator101</CardTitle>
                        <CardDescription>1.2M Followers</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </AnimatedDiv>
               <AnimatedDiv style={{ animationDelay: '0.4s' }}>
                 <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="pt-6">
                    <p className="italic">“Finally a tool that thinks like a creative.”</p>
                  </CardContent>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src="https://placehold.co/40x40.png"
                        alt="Creator"
                        width={40}
                        height={40}
                        className="rounded-full"
                        data-ai-hint="creator avatar"
                      />
                      <div>
                        <CardTitle className="text-base">@AR_Magician</CardTitle>
                        <CardDescription>850k Followers</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                 </Card>
               </AnimatedDiv>
              <AnimatedDiv style={{ animationDelay: '0.6s' }}>
                <Card className="bg-card/50 border-border/50 h-full">
                  <CardContent className="pt-6">
                    <p className="italic">"The implementation hints are a lifesaver. It helps me bridge the gap between a cool idea and a real effect."</p>
                  </CardContent>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src="https://placehold.co/40x40.png"
                        alt="Creator"
                        width={40}
                        height={40}
                        className="rounded-full"
                        data-ai-hint="creator avatar"
                      />
                      <div>
                        <CardTitle className="text-base">@FilterQueen</CardTitle>
                        <CardDescription>2.5M Followers</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-secondary/30">
          <AnimatedDiv className="container max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Frequently Asked Questions
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full mt-8">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className='text-lg hover:no-underline'>{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedDiv>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container text-center">
            <AnimatedDiv>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Ready to Go Viral?
              </h2>
            </AnimatedDiv>
            <AnimatedDiv style={{ animationDelay: '0.2s' }}>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
                Join thousands of creators and supercharge your brainstorming process today.
              </p>
            </AnimatedDiv>
            <AnimatedDiv className="mt-8 flex flex-col sm:flex-row justify-center gap-4" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="font-semibold">
                <Link href="/generator">
                  <Rocket /> Generate My First Idea
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold">
                <Link href="#how-it-works">
                  <Search /> Watch Demo
                </Link>
              </Button>
            </AnimatedDiv>
          </div>
        </section>
      </main>

      {/* Footer */}
      <AnimatedDiv>
        <footer className="border-t border-border/40 py-12 bg-secondary/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline text-lg">EffectSpark</span>
                </div>
                <p className="text-muted-foreground text-sm">Made by creators for creators.</p>
                <div className="flex space-x-4">
                  <SocialLink href="#" className="motion-safe:animate-pulse"><TikTokIcon /></SocialLink>
                  <SocialLink href="#"><InstagramIcon /></SocialLink>
                  <SocialLink href="#"><XIcon /></SocialLink>
                </div>
              </div>
              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold font-headline mb-3">Product</h4>
                  <nav className="flex flex-col space-y-2">
                    <Link href="/generator" className="text-sm hover:text-primary transition-colors">Generator</Link>
                    <Link href="#features" className="text-sm hover:text-primary transition-colors">Features</Link>
                    <Link href="#faq" className="text-sm hover:text-primary transition-colors">FAQ</Link>
                  </nav>
                </div>
                <div>
                  <h4 className="font-semibold font-headline mb-3">Company</h4>
                  <nav className="flex flex-col space-y-2">
                    <Link href="#" className="text-sm hover:text-primary transition-colors">About</Link>
                    <Link href="#" className="text-sm hover:text-primary transition-colors">Contact</Link>
                    <Link href="#" className="text-sm hover:text-primary transition-colors">Careers</Link>
                  </nav>
                </div>
                <div>
                  <h4 className="font-semibold font-headline mb-3">Legal</h4>
                  <nav className="flex flex-col space-y-2">
                    <Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
                  </nav>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} EffectSpark. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </AnimatedDiv>
    </div>
  );
}
