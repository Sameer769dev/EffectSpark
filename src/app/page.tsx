import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart,
  Bot,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Heart,
  HelpCircle,
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

const featureCards = [
  {
    icon: Bot,
    title: 'AI Effect Generator',
    description: 'Generate novel TikTok effect ideas based on trending content analysis.',
  },
  {
    icon: TrendingUp,
    title: 'Virality Predictor',
    description: 'Get a virality score for your ideas based on novelty, interactivity, and trends.',
  },
  {
    icon: Lightbulb,
    title: 'Implementation Hints',
    description: 'Receive suggestions and starting points to bring your effects to life in Effect House.',
  },
  {
    icon: Heart,
    title: 'Save Favorites',
    description: 'Organize your best ideas on a personal board for easy access and reference.',
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 md:py-32">
          <div className="container">
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground animate-fade-in">
              Stop Scrolling, Start Creating
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground animate-fade-in delay-200">
              The AI co-pilot for viral TikTok effects. Generate endless ideas,
              predict virality, and stay ahead of the trends.
            </p>
            <div className="mt-8 flex justify-center gap-4 animate-fade-in delay-400">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/generator">
                  Start Creating for Free <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Go From Idea to Viral in 3 Steps
              </h2>
              <p className="mt-2 text-muted-foreground">
                Simplify your creative workflow and let AI handle the heavy
                lifting.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center bg-card/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>1. Describe Your Idea</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Start with a simple prompt, a theme, or even creative constraints like "face mesh only."</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>2. AI Generates Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Our AI brainstorms dozens of unique effect ideas, complete with descriptions and virality scores.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>3. Create & Go Viral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Use the implementation hints and insights to build your next hit effect in Effect House.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Your All-In-One Creator Studio
              </h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to spark creativity and build with
                confidence.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((feature, index) => (
                <Card key={index} className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Ideas Teaser */}
        <section className="py-20 bg-secondary/30">
            <div className="container grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Never Run Out of Ideas</h2>
                    <p className="text-muted-foreground text-lg">
                        Our AI analyzes the latest TikTok trends to generate fresh, relevant, and high-potential effect ideas for you, complete with a predicted virality score. See what's bubbling up right now.
                    </p>
                     <Button asChild className="font-semibold">
                        <Link href="/generator">
                        Try the Generator <ArrowRight />
                        </Link>
                    </Button>
                </div>
                <div className="space-y-4">
                     <Card className="bg-card transform hover:scale-105 transition-transform duration-300">
                        <CardHeader>
                            <CardTitle>Retro Game Overlays</CardTitle>
                            <CardDescription>Interactive 8-bit style games using face triggers.</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Virality Score:</span>
                            <span className="font-bold text-lg text-primary">88</span>
                        </CardFooter>
                    </Card>
                    <Card className="bg-card transform hover:scale-105 transition-transform duration-300 ml-8">
                        <CardHeader>
                            <CardTitle>AI Pet Sidekick</CardTitle>
                            <CardDescription>A cute, customizable AI creature that reacts to your expressions.</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Virality Score:</span>
                            <span className="font-bold text-lg text-primary">92</span>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Loved by Top Effect Creators
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="italic">"EffectSpark is my secret weapon for brainstorming. The virality predictor is scarily accurate."</p>
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
               <Card className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="italic">"I used to get creator's block all the time. Now I just fire up EffectSpark and have dozens of ideas in minutes."</p>
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
              <Card className="bg-card/50 border-border/50">
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
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-secondary/30">
          <div className="container max-w-3xl mx-auto">
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
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Ready to Spark Your Next Viral Hit?
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
              Join thousands of creators and supercharge your brainstorming process today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/generator">
                  Get Started for Free <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

       {/* Footer */}
      <footer className="border-t border-border/40 py-8">
          <div className="container flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                   <Sparkles className="h-6 w-6 text-primary" />
                   <span className="font-bold font-headline text-lg">EffectSpark</span>
              </div>
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EffectSpark. All rights reserved.</p>
              <nav className="flex gap-4 mt-4 md:mt-0">
                  <Link href="#features" className="text-sm hover:text-primary">Features</Link>
                  <Link href="#faq" className="text-sm hover:text-primary">FAQ</Link>
              </nav>
          </div>
      </footer>
    </div>
  );
}
