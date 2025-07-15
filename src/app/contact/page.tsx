
import { ContentLayout } from '@/components/layout/content-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, MessageSquare, Twitter } from 'lucide-react';

export default function ContactPage() {
  return (
    <ContentLayout title="Get in Touch">
      <p className="text-muted-foreground mb-8 text-center">
        Have a question, feedback, or a partnership inquiry? We'd love to hear
        from you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center bg-card/50">
          <CardHeader>
            <Mail className="mx-auto h-12 w-12 text-primary" />
            <CardTitle>Email Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For general inquiries and support.
            </p>
            <Button asChild>
              <Link href="mailto:hello@effectspark.com">hello@effectspark.com</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center bg-card/50">
          <CardHeader>
            <Twitter className="mx-auto h-12 w-12 text-primary" />
            <CardTitle>Follow Us on X</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Stay updated and send us a DM.
            </p>
            <Button asChild>
              <Link href="https://x.com/effectspark" target="_blank">@effectspark</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center bg-card/50">
          <CardHeader>
            <MessageSquare className="mx-auto h-12 w-12 text-primary" />
            <CardTitle>Community Discord</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Join the conversation with other creators.
            </p>
            <Button asChild variant="outline">
              <Link href="#" target="_blank">Join Server</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}
