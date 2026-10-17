export type DomainId = 'react' | 'nodejs' | 'python' | 'java' | 'javascript' | 'sql' | 'git';

export interface Domain {
  id: DomainId;
  name: string;
  emoji: string;
  gradient: string;
  iconBg: string;
}

export const domains: Domain[] = [
  {
    id: 'react',
    name: 'React',
    emoji: '⚛️',
    gradient: 'from-cyan-400 to-blue-500',
    iconBg: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    emoji: '🟢',
    gradient: 'from-green-400 to-emerald-500',
    iconBg: 'from-green-400 to-emerald-500',
  },
  {
    id: 'python',
    name: 'Python',
    emoji: '🐍',
    gradient: 'from-yellow-400 to-blue-500',
    iconBg: 'from-yellow-400 to-blue-500',
  },
  {
    id: 'java',
    name: 'Java',
    emoji: '☕',
    gradient: 'from-orange-400 to-red-500',
    iconBg: 'from-orange-400 to-red-500',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    emoji: 'JS',
    gradient: 'from-yellow-300 to-yellow-500',
    iconBg: 'from-yellow-300 to-yellow-500',
  },
  {
    id: 'sql',
    name: 'SQL',
    emoji: '🗄️',
    gradient: 'from-blue-400 to-indigo-500',
    iconBg: 'from-blue-400 to-indigo-500',
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    emoji: '🔧',
    gradient: 'from-orange-400 to-red-500',
    iconBg: 'from-orange-400 to-red-500',
  },
];

export const domainMap: Record<string, DomainId> = {
  react: 'react',
  nodejs: 'nodejs',
  'node.js': 'nodejs',
  'node': 'nodejs',
  python: 'python',
  java: 'java',
  javascript: 'javascript',
  js: 'javascript',
  sql: 'sql',
  git: 'git',
  'git&github': 'git',
  'git & github': 'git',
};

export function normalizeDomainId(raw: string | undefined): DomainId | null {
  if (!raw) return null;
  const cleaned = raw.toLowerCase().trim().replace(/\s+/g, '');
  if (cleaned in domainMap) return domainMap[cleaned];
  // try removing ".js"
  const noJs = cleaned.replace(/\.js$/, '');
  if (noJs in domainMap) return domainMap[noJs];
  // direct match against valid ids
  if (cleaned === 'react' || cleaned === 'nodejs' || cleaned === 'python' ||
      cleaned === 'java' || cleaned === 'javascript' || cleaned === 'sql' || cleaned === 'git') {
    return cleaned as DomainId;
  }
  return null;
}

export function getDomain(id: DomainId): Domain | undefined {
  return domains.find((d) => d.id === id);
}
