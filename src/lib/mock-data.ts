export type Request = {
  id: string;
  resident: string;
  neighborhood: string;
  description: string;
  risk: "Alto" | "Médio" | "Baixo";
  thumbnail: string;
};

export const requests: Request[] = [
  {
    id: "r1",
    resident: "Dona Maria",
    neighborhood: "Ibura",
    description: "Trinca diagonal na parede dos fundos após chuvas fortes.",
    risk: "Alto",
    thumbnail: "https://images.unsplash.com/photo-1530819568329-97653eafbbfa?w=400&h=300&fit=crop",
  },
  {
    id: "r2",
    resident: "Seu Antônio",
    neighborhood: "Nova Descoberta",
    description: "Erosão no talude próximo à escadaria.",
    risk: "Alto",
    thumbnail: "https://images.unsplash.com/photo-1582737049818-04e5d8aac56a?w=400&h=300&fit=crop",
  },
  {
    id: "r3",
    resident: "Dona Lúcia",
    neighborhood: "Alto José do Pinho",
    description: "Infiltração no teto, mancha de umidade aumentando.",
    risk: "Médio",
    thumbnail: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=300&fit=crop",
  },
  {
    id: "r4",
    resident: "Sr. José",
    neighborhood: "Ibura",
    description: "Muro de contenção com rachaduras horizontais.",
    risk: "Médio",
    thumbnail: "https://images.unsplash.com/photo-1597844808175-3f7556ad5d5d?w=400&h=300&fit=crop",
  },
];

export type Mission = {
  id: string;
  title: string;
  neighborhood: string;
  distanceKm: number;
  weightKg: number;
  resident: string;
};

export const missions: Mission[] = [
  {
    id: "m1",
    title: "Transportar 5 sacos de cimento",
    neighborhood: "Ibura",
    distanceKm: 1.2,
    weightKg: 50,
    resident: "Dona Maria",
  },
  {
    id: "m2",
    title: "Entregar calha de drenagem pluvial",
    neighborhood: "Nova Descoberta",
    distanceKm: 2.4,
    weightKg: 18,
    resident: "Seu Antônio",
  },
  {
    id: "m3",
    title: "Levar lona impermeabilizante e pregos",
    neighborhood: "Alto José do Pinho",
    distanceKm: 0.8,
    weightKg: 6,
    resident: "Dona Lúcia",
  },
];

export type RankUser = {
  rank: number;
  name: string;
  neighborhood: string;
  missions: number;
  tier?: string;
};

const names = [
  "Anjo Gabriel",
  "Anjo Miguel",
  "Anjo Rafael",
  "Serafim Clara",
  "Anjo Bento",
  "Anjo Helena",
  "Anjo Pedro",
  "Anjo Sofia",
  "Anjo João",
  "Anjo Beatriz",
  "Anjo Lucas",
  "Anjo Marta",
  "Anjo Davi",
  "Anjo Rafael S.",
  "Anjo Carla",
  "Anjo Ricardo",
  "Anjo Júlia",
  "Anjo Felipe",
  "Anjo Camila",
  "Anjo Bruno",
  "Anjo Larissa",
  "Anjo Tiago",
  "Anjo Vitória",
  "Anjo Henrique",
  "Anjo Manuela",
  "Anjo Igor",
  "Anjo Renata",
  "Anjo Caio",
  "Anjo Patrícia",
  "Anjo Diego",
  "Anjo Eduarda",
  "Anjo Mateus",
  "Anjo Letícia",
  "Anjo Otávio",
  "Anjo Yasmin",
  "Anjo André",
  "Anjo Sabrina",
  "Anjo Vinícius",
  "Anjo Aline",
  "Anjo Marcos",
  "Anjo Talita",
  "Anjo Rodrigo",
  "Anjo Bianca",
  "Anjo Samuel",
  "Anjo Fernanda",
  "Anjo Gustavo",
  "Anjo Daniela",
  "Anjo Murilo",
  "Anjo Priscila",
  "Anjo Roberto",
];

const bairros = [
  "Ibura",
  "Nova Descoberta",
  "Alto José do Pinho",
  "Casa Amarela",
  "Macaxeira",
  "Córrego do Jenipapo",
];

export const ranking: RankUser[] = names.map((name, i) => ({
  rank: i + 1,
  name,
  neighborhood: bairros[i % bairros.length],
  missions: Math.max(2, 84 - i * 2 + (i % 3)),
  tier:
    i === 0 ? "Arcanjo Lendário" : i === 1 ? "Serafim Protetor" : i === 2 ? "Querubim" : undefined,
}));

export const CURRENT_USER_RANK = 14;
