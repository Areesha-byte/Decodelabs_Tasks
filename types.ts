export interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  ipoTrace?: {
    inputRaw: string;
    inputSanitized: string;
    processMatchRule: string;
    processLogic: string;
    outputRaw: string;
  };
}

export interface ChatbotRule {
  id: string;
  keywords: string[];
  response: string;
  description: string;
  pythonBranch: string;
}

export interface CaseStudy {
  industry: string;
  icon: string;
  challenge: string;
  ruleBasedApproach: string;
  modernAIApproach: string;
  exampleScenario: string;
}
