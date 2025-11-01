
import { RagDocument, Domain } from '../types';

export const RAG_BENCH_DATA: RagDocument[] = [
  // Biomedical
  {
    id: 'bio_1',
    domain: 'Biomedical',
    question: 'What is the function of astrocytes in the central nervous system?',
    context: 'Astrocytes are star-shaped glial cells in the brain and spinal cord. They perform many functions, including biochemical support of endothelial cells that form the blood-brain barrier, provision of nutrients to the nervous tissue, maintenance of extracellular ion balance, and a role in the repair and scarring process of the brain and spinal cord following traumatic injuries.',
    answer: 'Astrocytes provide biochemical support to blood-brain barrier cells, supply nutrients, maintain ion balance, and aid in repair and scarring after injury.'
  },
  {
    id: 'bio_2',
    domain: 'Biomedical',
    question: 'How does CRISPR-Cas9 work for gene editing?',
    context: 'The CRISPR-Cas9 system consists of two key molecules that introduce a change into the DNA. These are: the Cas9 enzyme, which acts as a pair of "molecular scissors" that can cut the two strands of DNA at a specific location in thegenome, and a piece of RNA called guide RNA (gRNA). The gRNA is designed to find and bind to a specific sequence in the DNA. The gRNA has RNA bases that are complementary to those of the target DNA sequence. This means that the gRNA will only bind to the target sequence and no other regions of the genome.',
    answer: 'CRISPR-Cas9 uses a Cas9 enzyme to cut DNA and a guide RNA (gRNA) to direct the enzyme to a specific genetic sequence for editing.'
  },
  // General Knowledge
  {
    id: 'gk_1',
    domain: 'General Knowledge',
    question: 'Why is the sky blue?',
    context: 'The Earth\'s atmosphere is composed of various gases and particles. As sunlight enters the atmosphere, it collides with these molecules. Blue light is scattered in all directions by the tiny molecules of air in Earth\'s atmosphere. Blue is scattered more than other colors because it travels as shorter, smaller waves. This is why we see a blue sky most of the time. This phenomenon is called Rayleigh scattering.',
    answer: 'The sky appears blue because blue sunlight is scattered more than other colors by the molecules in the atmosphere, a process known as Rayleigh scattering.'
  },
    {
    id: 'gk_2',
    domain: 'General Knowledge',
    question: 'What is the process of photosynthesis?',
    context: 'Photosynthesis is the process used by plants, algae, and certain bacteria to harness energy from sunlight and turn it into chemical energy. The process converts carbon dioxide and water into glucose (a sugar to feed the plant) and oxygen. Chlorophyll, the green pigment in plants, is crucial for capturing the light energy that drives these reactions.',
    answer: 'Photosynthesis is a process where plants use sunlight, water, and carbon dioxide to create their food (glucose) and release oxygen, with chlorophyll playing a key role in capturing light energy.'
  },
  // Legal
  {
    id: 'legal_1',
    domain: 'Legal',
    question: 'What is a "tort"?',
    context: 'In common law jurisdictions, a tort is a civil wrong that causes a claimant to suffer loss or harm, resulting in legal liability for the person who commits the tortious act. It can include intentional infliction of emotional distress, negligence, financial losses, injuries, invasion of privacy, and many other things. Torts are distinct from crimes, which are wrongs against the state.',
    answer: 'A tort is a civil wrong that causes someone harm or loss, leading to legal liability for the person responsible. It is different from a crime.'
  },
  // Customer Support
  {
    id: 'support_1',
    domain: 'Customer Support',
    question: 'How do I reset my password if I\'ve forgotten it?',
    context: 'To reset your password, navigate to the login page and click the "Forgot Password?" link. You will be prompted to enter the email address associated with your account. Once submitted, we will send you an email with a secure link to create a new password. Please check your spam folder if you do not see the email within a few minutes.',
    answer: 'Go to the login page, click "Forgot Password?", enter your email, and use the link sent to your inbox to create a new password.'
  },
  // Finance
  {
    id: 'finance_1',
    domain: 'Finance',
    question: 'What is the difference between a stock and a bond?',
    context: 'A stock represents ownership (equity) in a corporation, giving the stockholder a claim on a portion of the company\'s assets and earnings. A bond, on the other hand, is a form of debt that a company or government issues to investors. When you buy a bond, you are lending money to the issuer in exchange for periodic interest payments and the return of the bond\'s principal amount at maturity.',
    answer: 'A stock is an equity share representing ownership in a company, while a bond is a debt instrument where you lend money to an entity for interest payments and principal return.'
  }
];
