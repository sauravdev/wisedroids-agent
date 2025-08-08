# OG Images Directory

This directory contains Open Graph images for social media sharing.

## Image Specifications

- **Dimensions**: 1200×630 pixels
- **Format**: PNG or JPG
- **File Size**: Optimize for web (< 1MB)

## Required Images

### Core Pages

- `og-home.png` - Homepage (WiseDroids AI Agent Platform)
- `og-features.png` - Features page (AI Agent Features)
- `og-pricing.png` - Pricing page (WiseDroids Pricing)
- `og-agent-hub.png` - Agent Hub (Community Agents)
- `og-create-agent.png` - Create Agent (No-Code AI Agent Builder)

### Content Pages

- `og-blog.png` - Blog listing
- `og-docs.png` - Documentation
- `og-about.png` - About page
- `og-contact.png` - Contact page

## Design Guidelines

1. **Brand Consistency**: Use WiseDroids brand colors and typography
2. **Readability**: Ensure text is legible at small sizes
3. **Call-to-Action**: Include clear value proposition
4. **Visual Hierarchy**: Lead with the most important information
5. **Safe Zones**: Keep important content within 1000×500px center area

## Alt Text Guidelines

Use descriptive alt text following this pattern:
`<function>-<object>-<context>`

Examples:

- `wisedroids-ai-agent-platform-homepage.png`
- `create-agent-form-wisedroids.png`
- `agent-hub-marketplace-wisedroids.png`

## Implementation

Images are referenced in the SEO component and HTML head tags:

```html
<meta property="og:image" content="https://wisedroids.ai/og/og-home.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="WiseDroids AI Agent Platform" />
```

## Testing

Test your OG images using:

- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector
- Google's Rich Results Test
