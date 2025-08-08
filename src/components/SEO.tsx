import React from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
}

export function SEO({ 
  title, 
  description, 
  canonical = 'https://wisedroids.ai',
  ogImage = 'https://wisedroids.ai/og/og-home.png',
  structuredData,
  faqData 
}: SEOProps) {
  const fullTitle = title.includes('WiseDroids') ? title : `${title} — WiseDroids`;
  
  React.useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonical);
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonical);
    }
    
    const ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (ogImageMeta) {
      ogImageMeta.setAttribute('content', ogImage);
    }
    
    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', fullTitle);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
    
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute('content', ogImage);
    }
  }, [title, description, canonical, ogImage, fullTitle]);

  return (
    <>
      {/* Page-specific structured data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* FAQ structured data */}
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqData.map(item => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      )}
    </>
  );
}

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  features: {
    title: 'Features — WiseDroids AI Agent Platform',
    description: 'Explore instant deployment, Streamlit preview & powerful security guardrails for enterprise-grade AI agents.',
    canonical: 'https://wisedroids.ai/features',
    ogImage: 'https://wisedroids.ai/og/og-features.png'
  },
  pricing: {
    title: 'Pricing — WiseDroids',
    description: 'See free, Starter ₹999/mo & Enterprise options. Scale unlimited agents with advanced security.',
    canonical: 'https://wisedroids.ai/pricing',
    ogImage: 'https://wisedroids.ai/og/og-pricing.png'
  },
  agentHub: {
    title: 'Agent Hub — Discover & Deploy AI Agents',
    description: 'Browse community-built agents for social media, recruiting, fitness & more. Deploy in one click.',
    canonical: 'https://wisedroids.ai/agent-hub',
    ogImage: 'https://wisedroids.ai/og/og-agent-hub.png'
  },
  createAgent: {
    title: 'Create AI Agent Online (No Code)',
    description: 'Build a custom AI agent with text prompts. Generate code, preview via Streamlit & deploy instantly.',
    canonical: 'https://wisedroids.ai/create-agent',
    ogImage: 'https://wisedroids.ai/og/og-create-agent.png',
    faqData: [
      {
        question: "Do I need to write code to build an agent?",
        answer: "No. Type what you want, WiseDroids auto-generates the code & UI."
      },
      {
        question: "Can I embed my agent in another site?",
        answer: "Yes—export as Streamlit, Vercel or iframe snippet."
      },
      {
        question: "How long does it take to create an agent?",
        answer: "Just a few minutes! Describe your agent and we'll generate the code instantly."
      }
    ]
  }
};
