import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'ecommerce-scaling',
    title: 'Scaling a UK Fashion Brand to £1M+ Revenue',
    client: 'LuxeWear London',
    category: 'Web Design & Marketing',
    challenge: 'LuxeWear was struggling with a slow Shopify site and inconsistent Facebook ad performance, leading to a high cost per acquisition.',
    solution: 'We rebuilt their storefront using a high-performance React-based headless architecture and implemented a data-driven PPC strategy focused on high-intent audiences.',
    results: [
      '245% Increase in Conversion Rate',
      '42% Reduction in Ad Spend Waste',
      'Site Load Time reduced to <800ms'
    ],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    fullStory: 'LuxeWear London came to us with a common problem: they had a great product but their digital infrastructure was holding them back. Their site was slow, especially on mobile, where 80% of their traffic originated. By moving to a headless commerce setup, we were able to deliver a lightning-fast experience that significantly boosted their conversion rate. Combined with our precision-targeted marketing campaigns, they saw a massive jump in ROI within the first 90 days.'
  },
  {
    id: 'ai-automation-efficiency',
    title: 'Reducing Operational Costs by 60% with AI',
    client: 'SwiftLogistics UK',
    category: 'AI Automation',
    challenge: 'SwiftLogistics was spending over 40 hours a week on manual lead qualification and data entry, delaying their response times to potential clients.',
    solution: 'We deployed a custom AI automation suite that handles initial customer inquiries, qualifies leads based on specific criteria, and automatically updates their CRM.',
    results: [
      '60% Reduction in Manual Admin Work',
      'Instant Lead Response Time',
      '£45k Annual Savings in Operational Costs'
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    fullStory: 'SwiftLogistics needed to scale without hiring a massive administrative team. We identified that their bottleneck was the initial qualification of leads. Our AI agents now handle the first point of contact, asking the right questions and only passing high-value leads to the sales team. This has not only saved them money but also improved their sales team\'s morale as they now focus only on closing deals.'
  },
  {
    id: 'seo-dominance',
    title: 'Dominating Local Search for a Professional Services Firm',
    client: 'Oakwood Legal',
    category: 'Digital Marketing (SEO)',
    challenge: 'Oakwood Legal was invisible in local search results for their primary services, losing out to competitors with inferior service but better online presence.',
    solution: 'We implemented a comprehensive Local SEO strategy, including technical site optimization, content authority building, and local citation management.',
    results: [
      'Ranked #1 for 15+ High-Intent Keywords',
      '300% Increase in Organic Leads',
      'Established as Local Market Leader'
    ],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop',
    fullStory: 'Oakwood Legal had a strong reputation offline but it wasn\'t reflecting online. We focused on building their digital authority through high-quality, relevant content that addressed their clients\' most pressing legal questions. By optimizing their technical SEO and Google Business Profile, we ensured they appeared at the top of search results exactly when potential clients were looking for their expertise.'
  }
];
