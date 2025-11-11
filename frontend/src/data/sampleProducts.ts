import { Product } from '@/contexts/CartContext';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Floral Maxi Dress',
    price: 1299,
    size: 'M',
    color: 'Floral Print',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop',
    description: 'Beautiful vintage-inspired maxi dress with floral print. Perfect for summer occasions.',
    category: 'casual',
    stock: 5
  },
  {
    id: '2',
    name: 'Classic Black Evening Gown',
    price: 2499,
    size: 'L',
    color: 'Black',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop',
    description: 'Elegant black evening gown, perfect for formal events and parties.',
    category: 'formal',
    stock: 3
  },
  {
    id: '3',
    name: 'Boho Chic Sundress',
    price: 899,
    size: 'S',
    color: 'White',
    image: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=800&auto=format&fit=crop',
    description: 'Light and breezy sundress with bohemian details. Ideal for casual outings.',
    category: 'casual',
    stock: 8
  },
  {
    id: '4',
    name: 'Sequin Party Dress',
    price: 1899,
    size: 'M',
    color: 'Gold',
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&auto=format&fit=crop',
    description: 'Stunning sequin dress that sparkles under the lights. Perfect for celebrations.',
    category: 'party',
    stock: 4
  },
  {
    id: '5',
    name: 'Retro Polka Dot Dress',
    price: 1099,
    size: 'L',
    color: 'Navy Blue',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop',
    description: 'Charming retro-style dress with classic polka dots. Timeless and elegant.',
    category: 'casual',
    stock: 6
  },
  {
    id: '6',
    name: 'Silk Cocktail Dress',
    price: 2199,
    size: 'S',
    color: 'Burgundy',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop',
    description: 'Luxurious silk cocktail dress in rich burgundy. Perfect for upscale events.',
    category: 'formal',
    stock: 2
  }
];
