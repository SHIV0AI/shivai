/**
 * Example Component Integrations with Analytics
 * Copy and adapt these examples to add analytics to your components
 */

// ==================== EXAMPLE 1: Contact Form with Conversion Tracking ====================

import { useAnalytics } from '@/hooks/useAnalytics';
import { useState } from 'react';

export function ContactFormWithAnalytics() {
  const analytics = useAnalytics();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track form submission attempt
      analytics.trackEvent({
        category: 'contact',
        action: 'form_submit_started',
        label: 'contact_form',
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Track successful conversion
      analytics.trackConversion('contact_form_submission', 1, {
        form_type: 'contact',
        source: 'main_page',
      });

      // Track in GA4
      analytics.trackEvent({
        category: 'contact',
        action: 'form_submitted',
        label: 'contact_form',
        metadata: {
          submission_type: 'contact_inquiry',
        },
      });

      // Show success message
      alert('Message sent successfully!');
    } catch (error) {
      // Track error
      analytics.trackEvent({
        category: 'contact',
        action: 'form_error',
        label: error instanceof Error ? error.message : 'Unknown error',
      });

      alert('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-section="contact">
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Message" required />
      <button 
        type="submit" 
        disabled={loading}
        data-cta="contact_form_submit"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

// ==================== EXAMPLE 2: CTA Button with Tracking ====================

interface CTAButtonProps {
  label: string;
  ctaName: string;
  section?: string;
  onClick?: () => void | Promise<void>;
}

export function CTAButton({ label, ctaName, section, onClick }: CTAButtonProps) {
  const analytics = useAnalytics();

  const handleClick = async () => {
    // Track CTA click
    analytics.trackCTAClick(ctaName, section);

    // Track user interaction
    analytics.trackUserInteraction('click', ctaName, {
      section,
      timestamp: new Date().toISOString(),
    });

    // Call custom handler if provided
    if (onClick) {
      await onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      data-cta={ctaName}
      data-section={section}
      className="cta-button"
    >
      {label}
    </button>
  );
}

// Usage:
// <CTAButton 
//   label="Get Started" 
//   ctaName="get_started"
//   section="hero"
//   onClick={() => console.log('CTA clicked')}
// />

// ==================== EXAMPLE 3: Feature Usage Tracking ====================

import { useRef, useEffect } from 'react';

interface FeatureComponentProps {
  featureName: string;
  children: React.ReactNode;
}

export function FeatureTracker({ featureName, children }: FeatureComponentProps) {
  const analytics = useAnalytics();
  const startTimeRef = useRef<number>(Date.now());
  const interactionCountRef = useRef<number>(0);

  const trackInteraction = () => {
    interactionCountRef.current++;

    analytics.trackFeatureUsage(featureName, 'interaction', {
      interaction_count: interactionCountRef.current,
      session_duration: Math.round((Date.now() - startTimeRef.current) / 1000),
    });
  };

  useEffect(() => {
    // Track feature view
    analytics.trackFeatureUsage(featureName, 'view', {
      timestamp: new Date().toISOString(),
    });

    return () => {
      // Track feature exit
      const sessionDuration = Math.round((Date.now() - startTimeRef.current) / 1000);
      analytics.trackFeatureUsage(featureName, 'exit', {
        total_interactions: interactionCountRef.current,
        session_duration: sessionDuration,
      });
    };
  }, [featureName, analytics]);

  return (
    <div onClick={trackInteraction}>
      {children}
    </div>
  );
}

// ==================== EXAMPLE 4: Link Tracking ====================

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  analyticsLabel?: string;
}

export function TrackedLink({ href, children, analyticsLabel }: TrackedLinkProps) {
  const analytics = useAnalytics();

  const handleClick = () => {
    // Check if external link
    const isExternal = !href.startsWith('/');

    if (isExternal) {
      analytics.trackExternalLink(href, analyticsLabel || href);
    } else {
      analytics.trackEvent({
        category: 'navigation',
        action: 'internal_link_click',
        label: href,
      });
    }
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

// ==================== EXAMPLE 5: Pricing Plan Selection ====================

interface PricingPlan {
  name: string;
  price: number;
  features: string[];
}

interface PricingComponentProps {
  plans: PricingPlan[];
  onSelectPlan: (plan: PricingPlan) => void;
}

export function PricingComponent({ plans, onSelectPlan }: PricingComponentProps) {
  const analytics = useAnalytics();

  const handleSelectPlan = (plan: PricingPlan) => {
    // Track pricing plan selection
    analytics.trackEvent({
      category: 'pricing',
      action: 'plan_selected',
      label: plan.name,
      value: plan.price,
      metadata: {
        features_count: plan.features.length,
        billing_period: 'monthly',
      },
    });

    // Track as conversion
    analytics.trackConversion('pricing_plan_selected', plan.price, {
      plan_name: plan.name,
      features: plan.features.join(','),
    });

    // Call callback
    onSelectPlan(plan);
  };

  return (
    <div className="pricing-plans">
      {plans.map(plan => (
        <div key={plan.name} className="plan-card">
          <h3>{plan.name}</h3>
          <p className="price">${plan.price}</p>
          <ul>
            {plan.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <button 
            onClick={() => handleSelectPlan(plan)}
            data-cta="select_plan"
            data-plan={plan.name}
          >
            Select Plan
          </button>
        </div>
      ))}
    </div>
  );
}

// ==================== EXAMPLE 6: Newsletter Signup ====================

export function NewsletterSignup() {
  const analytics = useAnalytics();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track signup attempt
      analytics.trackEvent({
        category: 'newsletter',
        action: 'signup_started',
        metadata: { email_domain: email.split('@')[1] },
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Track successful conversion
      analytics.trackConversion('newsletter_signup', 1, {
        email_domain: email.split('@')[1],
      });

      // Track in feature
      analytics.trackFeatureUsage('newsletter', 'signup_completed', {
        email_domain: email.split('@')[1],
      });

      setEmail('');
      alert('Subscribed!');
    } catch (error) {
      analytics.trackEvent({
        category: 'newsletter',
        action: 'signup_error',
        label: error instanceof Error ? error.message : 'Unknown',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-section="newsletter">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading} data-cta="newsletter_signup">
        {loading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}

// ==================== EXAMPLE 7: 3D Model Interaction ====================

interface ThreeDModelProps {
  modelName: string;
}

export function ThreeDModel({ modelName }: ThreeDModelProps) {
  const analytics = useAnalytics();
  const startTimeRef = useRef<number>(Date.now());
  const interactionCountRef = useRef<number>(0);

  const handleRotation = () => {
    interactionCountRef.current++;

    analytics.trackFeatureUsage(modelName, 'rotation', {
      interaction_count: interactionCountRef.current,
      session_duration: Math.round((Date.now() - startTimeRef.current) / 1000),
    });
  };

  const handleZoom = () => {
    interactionCountRef.current++;

    analytics.trackFeatureUsage(modelName, 'zoom', {
      interaction_count: interactionCountRef.current,
      session_duration: Math.round((Date.now() - startTimeRef.current) / 1000),
    });
  };

  useEffect(() => {
    // Track 3D model view
    analytics.trackFeatureUsage(modelName, 'view', {
      viewer_type: '3d_canvas',
    });

    return () => {
      // Track exit
      analytics.trackFeatureUsage(modelName, 'exit', {
        total_interactions: interactionCountRef.current,
        session_duration: Math.round((Date.now() - startTimeRef.current) / 1000),
      });
    };
  }, [modelName, analytics]);

  return (
    <div className="three-d-viewer">
      <div 
        className="canvas"
        onWheel={handleZoom}
        onMouseMove={handleRotation}
      >
        {/* 3D model content */}
      </div>
      <div className="controls">
        <button onClick={handleRotation}>Rotate</button>
        <button onClick={handleZoom}>Zoom</button>
      </div>
    </div>
  );
}

// ==================== EXAMPLE 8: Video Player with Tracking ====================

interface VideoPlayerProps {
  videoName: string;
  videoUrl: string;
}

export function VideoPlayerWithAnalytics({ videoName, videoUrl }: VideoPlayerProps) {
  const analytics = useAnalytics();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    analytics.trackFeatureUsage(videoName, 'play', {
      timestamp: new Date().toISOString(),
    });
  };

  const handlePause = () => {
    if (videoRef.current) {
      analytics.trackFeatureUsage(videoName, 'pause', {
        current_time: videoRef.current.currentTime,
      });
    }
  };

  const handleComplete = () => {
    analytics.trackConversion('video_watched', 1, {
      video_name: videoName,
      duration: videoRef.current?.duration,
    });
  };

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      controls
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleComplete}
    />
  );
}

// ==================== EXAMPLE 9: Demo Request Form ====================

export function DemoRequestForm() {
  const analytics = useAnalytics();
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    plan: 'enterprise',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Track demo request
      analytics.trackConversion('demo_request', 1, {
        company: formData.company,
        plan: formData.plan,
      });

      analytics.trackEvent({
        category: 'demo',
        action: 'request_submitted',
        label: formData.plan,
        metadata: {
          company: formData.company,
          email_domain: formData.email.split('@')[1],
        },
      });

      alert('Demo request submitted!');
    } catch (error) {
      analytics.trackEvent({
        category: 'demo',
        action: 'request_error',
        label: error instanceof Error ? error.message : 'Unknown',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} data-section="demo">
      <input
        type="text"
        placeholder="Company Name"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <select
        value={formData.plan}
        onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
      >
        <option value="starter">Starter</option>
        <option value="professional">Professional</option>
        <option value="enterprise">Enterprise</option>
      </select>
      <button type="submit" data-cta="demo_request">
        Request Demo
      </button>
    </form>
  );
}

// ==================== EXPORT ALL EXAMPLES ====================

// These are example implementations - copy and adapt as needed for your components

