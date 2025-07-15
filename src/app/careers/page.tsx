
import { ContentLayout } from '@/components/layout/content-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const jobOpenings = [
  {
    title: 'Senior Frontend Engineer (React/Next.js)',
    location: 'Remote',
    type: 'Full-time',
    description:
      'We are looking for an experienced frontend engineer to help us build and scale our creator-facing platform. You will be responsible for building beautiful, high-performance user interfaces.',
  },
  {
    title: 'AI/ML Engineer (GenAI)',
    location: 'Remote',
    type: 'Full-time',
    description:
      'Join our AI team to work on the core models that power EffectSpark. You will research, train, and deploy generative models that inspire creativity for millions of users.',
  },
  {
    title: 'Community Manager',
    location: 'Remote',
    type: 'Part-time',
    description:
      'Help us grow and nurture our community of TikTok effect creators. You will be the voice of EffectSpark, engaging with users on social media and our Discord server.',
  },
];

export default function CareersPage() {
  return (
    <ContentLayout title="Join Our Team">
      <div className="text-center mb-12">
        <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          We're on a mission to empower creators with the power of AI. If you're
          passionate about creativity, technology, and community, we'd love for
          you to join us.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-headline text-center">
          Current Openings
        </h2>
        {jobOpenings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobOpenings.map((job) => (
              <Card key={job.title} className="bg-card/50 flex flex-col">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="outline">{job.location}</Badge>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="#">
                      Apply Now <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            There are no open positions at the moment, but we're always looking
            for talented people. Feel free to reach out!
          </p>
        )}
      </div>
    </ContentLayout>
  );
}
