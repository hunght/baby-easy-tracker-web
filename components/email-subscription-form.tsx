'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubscribed(true);
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="w-full">
      {isSubscribed ? (
        <div className="rounded-md border border-success/20 bg-success/10 p-4 text-success dark:bg-success/20 dark:text-success">
          <p className="text-center font-medium">
            Thank you for subscribing! We&apos;ll keep you updated on the latest
            news and releases.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0"
        >
          <div className="flex-grow">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              disabled={isSubmitting}
              aria-label="Email address"
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-brand-gradient px-6 font-semibold text-white shadow-md shadow-primary/20 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      )}
    </div>
  );
}
