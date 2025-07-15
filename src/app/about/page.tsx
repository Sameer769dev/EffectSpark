
import { ContentLayout } from '@/components/layout/content-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sparkles, Users, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <ContentLayout title="About Us">
      <div className="space-y-8">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              At EffectSpark, our mission is to empower the next generation of
              digital creators. We believe that creativity should be limitless
              and accessible to everyone. We're building tools that bridge the
              gap between imagination and creation, helping TikTok effect
              artists, designers, and developers to bring their most ambitious
              ideas to life faster than ever before.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-primary" />
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              We are a passionate team of developers, designers, and TikTok
              enthusiasts who were once in your shoes. We've spent countless
              hours brainstorming, hitting creative blocks, and searching for
              that next viral idea. EffectSpark was born from our shared desire
              for a smarter, more intuitive creative process.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>
              We envision a future where AI acts as a creative co-pilot,
              augmenting human creativity rather than replacing it. We're
              committed to ethical AI development and fostering a vibrant
              community where creators can learn, share, and grow together. Join
              us on this journey to spark the future of digital effects.
            </p>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
