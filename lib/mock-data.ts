import { siteConfig } from '@/lib/site-config';

export type Gift = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  priceCents: number;
  collectedCents: number;
  participants: string[];
  allowShared: boolean;
  status: 'available' | 'completed';
};

export const mockGifts: Gift[] = [
  {
    id: '1',
    slug: 'geladeira-french-door',
    title: 'Geladeira French Door',
    description: 'Espaço, praticidade e acabamento premium para o nosso novo lar.',
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=1200&q=80',
    priceCents: 689000,
    collectedCents: 276000,
    participants: ['Marina', 'Carlos', 'Beatriz'],
    allowShared: true,
    status: 'available',
  },
  {
    id: '2',
    slug: 'sofa-linho-organico',
    title: 'Sofá em Linho Orgânico',
    description: 'Conforto elegante para os nossos domingos de filme.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    priceCents: 459000,
    collectedCents: 112000,
    participants: ['Julia', 'Renan'],
    allowShared: true,
    status: 'available',
  },
  {
    id: '3',
    slug: 'tv-oled-65',
    title: 'TV OLED 65”',
    description: 'Para assistir filmes, séries e rever nossos vídeos favoritos.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
    priceCents: 399900,
    collectedCents: 399900,
    participants: ['Paulo', 'Fernanda', 'Thiago'],
    allowShared: true,
    status: 'completed',
  },
  {
    id: '4',
    slug: 'maquina-de-lavar',
    title: 'Máquina de Lavar',
    description: 'Eficiência e cuidado para a rotina da nossa casa.',
    imageUrl: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
    priceCents: 349900,
    collectedCents: 78000,
    participants: ['Lia'],
    allowShared: true,
    status: 'available',
  },
  {
    id: '5',
    slug: 'fogao-cooktop',
    title: 'Fogão Cooktop',
    description: 'Nosso convite para jantares especiais e receitas em dupla.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    priceCents: 269900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
  {
    id: '6',
    slug: 'air-fryer-premium',
    title: 'Air Fryer Premium',
    description: 'Praticidade bonita até nos pequenos momentos.',
    imageUrl: 'https://images.unsplash.com/photo-1585515656973-597dd5c90834?auto=format&fit=crop&w=1200&q=80',
    priceCents: 89900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
  {
    id: '7',
    slug: 'jogo-de-cama-egipcio',
    title: 'Jogo de Cama Egípcio',
    description: 'Toque suave e atmosfera de hotel boutique.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    priceCents: 139900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
  {
    id: '8',
    slug: 'cafeteira-italiana',
    title: 'Cafeteira Italiana',
    description: 'Para começar a vida juntos com aroma de café fresco.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    priceCents: 129900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
  {
    id: '9',
    slug: 'kit-pratos-ceramica',
    title: 'Kit Pratos em Cerâmica',
    description: 'Detalhes que deixam cada mesa mais especial.',
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80',
    priceCents: 119900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
  {
    id: '10',
    slug: 'batedeira-artisan',
    title: 'Batedeira Artisan',
    description: 'Receitas afetivas, aniversários e celebrações futuras.',
    imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=1200&q=80',
    priceCents: 249900,
    collectedCents: 0,
    participants: [],
    allowShared: false,
    status: 'available',
  },
];

export const mockStoryMoments = [
  {
    title: 'O primeiro encontro',
    text: 'Um café que virou horas de conversa, risos leves e a sensação rara de estar exatamente onde se deveria estar.',
  },
  {
    title: 'A viagem inesquecível',
    text: 'Entre estradas, playlists e paisagens, entendemos que queríamos construir uma vida inteira um ao lado do outro.',
  },
  {
    title: 'O pedido',
    text: 'Com o coração acelerado e olhos marejados, o “sim” veio cercado de silêncio bonito, abraço forte e futuro.',
  },
];

export const mockCoupleGallery = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=80',
];

export const mockHoneymoon = {
  title: siteConfig.honeymoonTitle,
  targetCents: siteConfig.honeymoonTargetCents,
  collectedCents: 420000,
  totalQuotas: 100,
  soldQuotas: 42,
  contributors: ['Marina', 'Felipe', 'Joana', 'Lucas', 'Paula'],
};
