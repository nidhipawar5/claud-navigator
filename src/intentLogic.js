export const analyzeIntent = (prompt) => {
  const p = prompt.toLowerCase();
  
  if (p.includes('code') || p.includes('app') || p.includes('scrape') || p.includes('refactor') || p.includes('script') || p.includes('build')) {
    return {
      task: 'Complex Coding & Execution',
      recommendation: {
        id: 'agent',
        title: 'Multi-step Agent',
        reason: 'This task requires terminal access, iterative testing, and complex reasoning to build correctly.',
        tokens: '~1200+',
        quality: 'Very High',
        confidence: '92%',
        badge: 'high'
      },
      options: [
        { id: 'agent', title: 'Multi-step Agent', tokens: '~1200+', quality: 'Very High', confidence: '92%', isRec: true },
        { id: 'skill', title: 'Coding Skill', tokens: '~500 - 800', quality: 'High', confidence: '65%' },
        { id: 'prompt', title: 'Direct Prompt', tokens: '~300', quality: 'Medium', confidence: '40%' },
      ]
    };
  } else if (p.includes('pitch') || p.includes('document') || p.includes('slides') || p.includes('presentation') || p.includes('deck')) {
    return {
      task: 'Structured Content Creation',
      recommendation: {
        id: 'workflow',
        title: 'Structured Workflow',
        reason: 'Long-form documents require iterative refinement and precise formatting. Workflows guarantee higher structural quality.',
        tokens: '~650 - 800',
        quality: 'High',
        confidence: '89%',
        badge: 'high'
      },
      options: [
        { id: 'workflow', title: 'Structured Workflow', tokens: '~650 - 800', quality: 'High', confidence: '89%', isRec: true },
        { id: 'prompt', title: 'Direct Prompt', tokens: '~300 - 450', quality: 'Medium', confidence: '60%' },
        { id: 'agent', title: 'Multi-step Agent', tokens: '~1200+', quality: 'Very High', confidence: '75%' },
      ]
    };
  } else if (p.includes('search') || p.includes('news') || p.includes('data') || p.includes('latest')) {
    return {
      task: 'Information Retrieval / Data Processing',
      recommendation: {
        id: 'skill',
        title: 'Dedicated Skill',
        reason: 'This task requires real-time web access or specialized processing tools rather than just general reasoning.',
        tokens: '~200 - 400',
        quality: 'High',
        confidence: '95%',
        badge: 'high'
      },
      options: [
        { id: 'skill', title: 'Dedicated Skill', tokens: '~200 - 400', quality: 'High', confidence: '95%', isRec: true },
        { id: 'agent', title: 'Multi-step Agent', tokens: '~800+', quality: 'High', confidence: '80%' },
        { id: 'prompt', title: 'Direct Prompt', tokens: '~100', quality: 'Low', confidence: '30%' },
      ]
    };
  } else {
    // Default to Direct Prompt
    return {
      task: 'Standard Q&A',
      recommendation: {
        id: 'prompt',
        title: 'Direct Prompt',
        reason: 'This is a straightforward query. Direct execution is the fastest method with the lowest token cost.',
        tokens: '~50 - 150',
        quality: 'High',
        confidence: '99%',
        badge: 'high'
      },
      options: [
        { id: 'prompt', title: 'Direct Prompt', tokens: '~50 - 150', quality: 'High', confidence: '99%', isRec: true },
        { id: 'workflow', title: 'Structured Workflow', tokens: '~300 - 500', quality: 'High', confidence: '40%' },
      ]
    };
  }
};
