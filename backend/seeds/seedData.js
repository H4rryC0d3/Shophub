const dotenv = require('dotenv');
const path = require('path');

// ✅ force-load .env
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

/* ================= PRODUCTS ================= */
const products = [
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality noise-cancelling wireless headphones with 30-hour battery life and premium sound quality',
    price: 2500,
    originalPrice: 3500,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    stock: 50,
    rating: 4.5,
    numReviews: 120,
    isNew: true,
    isFeatured: true,
    discount: 29
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracker with heart rate monitor, GPS tracking, and water resistance',
    price: 5500,
    originalPrice: 7500,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    stock: 30,
    rating: 4.8,
    numReviews: 85,
    isFeatured: true,
    discount: 27
  },
  {
    name: 'Professional Running Shoes',
    description: 'Comfortable running shoes with excellent cushioning and breathable material',
    price: 3500,
    originalPrice: 5000,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
    stock: 100,
    rating: 4.6,
    numReviews: 210,
    isNew: true,
    isFeatured: true
  },
  {
    name: 'Travel Backpack',
    description: 'Durable and stylish backpack perfect for travel with multiple compartments',
    price: 1200,
    category: 'other',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    stock: 75,
    rating: 4.3,
    numReviews: 95,
    isFeatured: true
  },
  {
    name: 'Automatic Coffee Maker',
    description: 'Programmable coffee maker with 12-cup capacity and keep-warm function',
    price: 2800,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800',
    stock: 40,
    rating: 4.7,
    numReviews: 150,
    isFeatured: true
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with 360° sound and 12-hour battery',
    price: 1800,
    originalPrice: 2500,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800',
    stock: 8,
    rating: 4.4,
    numReviews: 78,
    discount: 28
  },
  {
    name: 'Premium Yoga Mat',
    description: 'Non-slip yoga mat with extra cushioning and carrying strap',
    price: 800,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800',
    stock: 120,
    rating: 4.5,
    numReviews: 140,
    isNew: true
  },
  {
    name: 'LED Reading Lamp',
    description: 'Adjustable LED reading lamp with touch control and USB charging',
    price: 900,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    stock: 60,
    rating: 4.2,
    numReviews: 65
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors',
    price: 400,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
    stock: 200,
    rating: 4.1,
    numReviews: 45,
    isNew: true
  },
  {
    name: 'Casual Denim Jeans',
    description: 'Classic fit denim jeans with comfortable stretch fabric',
    price: 1500,
    originalPrice: 2200,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800',
    stock: 150,
    rating: 4.4,
    numReviews: 92,
    discount: 32
  },
  {
    name: 'Modern Table Lamp',
    description: 'Stylish table lamp with adjustable brightness and modern design',
    price: 1200,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    stock: 35,
    rating: 4.6,
    numReviews: 78
  },
  {
    name: 'Basketball',
    description: 'Official size basketball with superior grip and durability',
    price: 650,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    stock: 90,
    rating: 4.3,
    numReviews: 115,
    isNew: true,
    isFeatured: true
  },
  {
    name: 'Classic Novel Collection',
    description: 'Set of 5 classic novels in hardcover edition',
    price: 1500,
    category: 'books',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    stock: 50,
    rating: 4.9,
    numReviews: 203
  },
  {
    name: 'Educational Building Blocks',
    description: 'Colorful building blocks set for creative play and learning',
    price: 950,
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800',
    stock: 80,
    rating: 4.7,
    numReviews: 156,
    isNew: true
  },
  {
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting',
    price: 2200,
    originalPrice: 3000,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    stock: 45,
    rating: 4.5,
    numReviews: 132,
    discount: 27
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 600,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    stock: 200,
    rating: 4.6,
    numReviews: 89
  },
  {
    name: 'Noise Cancelling Earbuds',
    description: 'True wireless earbuds with active noise cancellation and fast charging',
    price: 3500,
    originalPrice: 4800,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a41552231693?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1585386959984-a41552231693?w=800',
    stock: 60,
    rating: 4.4,
    numReviews: 110,
    discount: 27
  },
  {
    name: '4K Action Camera',
    description: 'Waterproof action camera with 4K recording and image stabilization',
    price: 8500,
    originalPrice: 12000,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1519183071298-a2962eadcdb2?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1519183071298-a2962eadcdb2?w=800',
    stock: 35,
    rating: 4.6,
    numReviews: 88,
    isFeatured: true
  },
  {
    name: 'Gaming Keyboard',
    description: 'Mechanical gaming keyboard with RGB backlighting',
    price: 3200,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    stock: 70,
    rating: 4.7,
    numReviews: 145
  },
  {
    name: 'Smart LED TV 43"',
    description: 'Full HD smart TV with built-in streaming apps',
    price: 25000,
    originalPrice: 32000,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800',
    stock: 25,
    rating: 4.5,
    numReviews: 190,
    discount: 22
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled devices',
    price: 800,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800',
    stock: 120,
    rating: 4.3,
    numReviews: 76
  },
  {
    name: 'Fitness Resistance Bands',
    description: 'Set of 5 resistance bands for full-body workouts',
    price: 550,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800',
    stock: 150,
    rating: 4.6,
    numReviews: 134
  },
  {
    name: 'Smart Home Security Camera',
    description: 'WiFi-enabled indoor security camera with night vision',
    price: 2500,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800',
    stock: 55,
    rating: 4.4,
    numReviews: 98
  },
  {
    name: 'Electric Kettle',
    description: 'Stainless steel electric kettle with auto shut-off',
    price: 1200,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800',
    stock: 65,
    rating: 4.5,
    numReviews: 82
  },
  {
    name: 'Office Ergonomic Chair',
    description: 'Comfortable ergonomic chair with lumbar support',
    price: 8500,
    originalPrice: 12000,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800',
    stock: 30,
    rating: 4.7,
    numReviews: 121
  },
  {
    name: 'Laptop Backpack',
    description: 'Water-resistant backpack fits up to 15.6-inch laptops',
    price: 1500,
    category: 'other',
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800',
    stock: 90,
    rating: 4.5,
    numReviews: 105
  },
  {
    name: 'Smart LED Bulb',
    description: 'WiFi smart bulb with app and voice control',
    price: 450,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31b?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31b?w=800',
    stock: 200,
    rating: 4.2,
    numReviews: 64
  },
  {
    name: 'Portable Power Bank',
    description: '10000mAh fast-charging power bank',
    price: 1200,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800',
    stock: 140,
    rating: 4.6,
    numReviews: 178
  },
  {
    name: 'Men Sports Jacket',
    description: 'Lightweight sports jacket suitable for all seasons',
    price: 2200,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
    stock: 85,
    rating: 4.3,
    numReviews: 59
  },
  {
    name: 'Women Running Leggings',
    description: 'Stretchable and breathable running leggings',
    price: 1200,
    category: 'clothing',
    images: [
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800',
    stock: 110,
    rating: 4.5,
    numReviews: 97
  },
  {
    name: 'Desk Organizer',
    description: 'Multi-compartment desk organizer for office supplies',
    price: 600,
    category: 'home',
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
    stock: 95,
    rating: 4.1,
    numReviews: 48
  },
  {
    name: 'Wireless Presenter',
    description: 'Presentation remote with laser pointer',
    price: 900,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800',
    stock: 70,
    rating: 4.4,
    numReviews: 66
  },
  {
    name: 'Smart Alarm Clock',
    description: 'Digital alarm clock with Bluetooth speaker',
    price: 1500,
    category: 'electronics',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    stock: 40,
    rating: 4.3,
    numReviews: 71
  },
  {
    name: 'Foam Roller',
    description: 'High-density foam roller for muscle recovery',
    price: 700,
    category: 'sports',
    images: [
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800',
    stock: 130,
    rating: 4.6,
    numReviews: 101
  },
  {
    name: 'Kids Remote Control Car',
    description: 'Rechargeable RC car with high-speed performance',
    price: 1200,
    category: 'toys',
    images: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800',
    stock: 75,
    rating: 4.5,
    numReviews: 112
  },
  {
    name: 'Hardcover Notebook',
    description: 'Premium ruled notebook for writing and journaling',
    price: 350,
    category: 'books',
    images: [
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800'
    ],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
    stock: 180,
    rating: 4.7,
    numReviews: 89
  }
];

// MongoDB Connection
const seed = async () => {
  try {
    console.log('🌱 Connecting to MongoDB...');
    await connectDB();

    console.log('🗑 Clearing products...');
    await Product.deleteMany();

    console.log('📦 Inserting products...');
    await Product.insertMany(products);

    console.log('✅ SEEDING COMPLETED SUCCESSFULLY');
    process.exit();
  } catch (err) {
    console.error('❌ ERROR:', err.message);
    process.exit(1);
  }
};

seed();
