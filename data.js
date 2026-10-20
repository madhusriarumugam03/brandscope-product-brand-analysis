const brandSets = {
  Beauty: ['Dove', 'L’Oreal', 'Nivea', 'Mamaearth', 'Lakme'],
  Electronics: ['Apple', 'Samsung', 'Sony', 'JBL', 'OnePlus'],
  Fashion: ['Nike', 'Adidas', 'Puma', 'Myntra', 'Levi’s'],
  Home: ['Philips', 'Prestige', 'Havells', 'Bajaj', 'IKEA'],
  'Personal Care': ['Himalaya', 'Colgate', 'Nivea', 'Patanjali', 'Garnier'],
}

const productNames = {
  Beauty: ['Shampoo', 'Face Wash', 'Lipstick', 'Perfume', 'Moisturizer', 'Sunscreen', 'Face Serum', 'Body Lotion'],
  Electronics: ['Smartphone', 'Laptop', 'Headphones', 'Smartwatch', 'Tablet', 'Bluetooth Speaker', 'Camera', 'Power Bank'],
  Fashion: ['Shoes', 'Sneakers', 'T-Shirt', 'Jeans', 'Dress', 'Handbag', 'Backpack', 'Jacket'],
  Home: ['Mixer Grinder', 'Air Fryer', 'Vacuum Cleaner', 'Water Bottle', 'Bedsheet', 'Study Table'],
  'Personal Care': ['Toothpaste', 'Body Wash', 'Hair Oil', 'Conditioner', 'Face Cream', 'Deodorant'],
}

const productOverrides = {
  Shampoo: ['Dove', 'Head & Shoulders', 'Pantene', 'Tresemme', 'L’Oreal'],
  'Face Wash': ['Cetaphil', 'Neutrogena', 'Mamaearth', 'Nivea', 'Himalaya'],
  Lipstick: ['MAC', 'Maybelline', 'Lakme', 'Nykaa', 'Huda Beauty'],
  Perfume: ['Chanel', 'Dior', 'Gucci', 'Calvin Klein', 'Versace', 'Burberry', 'Armani'],
  Moisturizer: ['Cetaphil', 'CeraVe', 'Neutrogena', 'Clinique', 'The Body Shop'],
  Sunscreen: ['La Roche-Posay', 'Neutrogena', 'Minimalist', 'Derma Co', 'Lotus'],
  'Face Serum': ['The Ordinary', 'Minimalist', 'Plum', 'Kiehl’s', 'Dot & Key'],
  'Body Lotion': ['Vaseline', 'Nivea', 'Dove', 'Aveeno', 'The Body Shop'],
  Smartphone: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Google', 'Vivo', 'Oppo', 'Realme'],
  Laptop: ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI'],
  Headphones: ['Sony', 'Bose', 'JBL', 'Apple', 'boAt', 'Sennheiser', 'Audio-Technica'],
  Smartwatch: ['Apple', 'Samsung', 'Garmin', 'Fitbit', 'Amazfit', 'Noise', 'boAt', 'Fossil'],
  Tablet: ['Apple', 'Samsung', 'Lenovo', 'OnePlus', 'Xiaomi', 'Microsoft'],
  'Bluetooth Speaker': ['JBL', 'Bose', 'Sony', 'Marshall', 'boAt', 'Ultimate Ears'],
  Camera: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'GoPro'],
  'Power Bank': ['Anker', 'Mi', 'Ambrane', 'URBN', 'Belkin', 'Portronics'],
  Shoes: ['Nike', 'Adidas', 'Puma', 'Skechers', 'Reebok', 'New Balance', 'Asics'],
  Sneakers: ['Nike', 'Adidas', 'Puma', 'Converse', 'Vans', 'New Balance'],
  'T-Shirt': ['H&M', 'Uniqlo', 'Levi’s', 'Nike', 'Zara', 'Puma'],
  Jeans: ['Levi’s', 'Wrangler', 'Lee', 'Pepe Jeans', 'Flying Machine', 'Jack & Jones'],
  Dress: ['Zara', 'H&M', 'Mango', 'Forever 21', 'FabAlley', 'AND'],
  Handbag: ['Michael Kors', 'Coach', 'Caprese', 'Lavie', 'Charles & Keith', 'Hidesign'],
  Backpack: ['Wildcraft', 'American Tourister', 'Skybags', 'Nike', 'Puma', 'Samsonite'],
  Jacket: ['The North Face', 'Levi’s', 'Puma', 'Nike', 'Adidas', 'Columbia'],
  'Mixer Grinder': ['Philips', 'Preethi', 'Bajaj', 'Sujata', 'Bosch', 'Butterfly'],
  'Air Fryer': ['Philips', 'Instant', 'Pigeon', 'Agaro', 'Havells', 'Morphy Richards'],
  'Vacuum Cleaner': ['Dyson', 'Philips', 'Eureka Forbes', 'Karcher', 'Mi', 'AGARO'],
  'Water Bottle': ['Milton', 'Cello', 'Borosil', 'Hydro Flask', 'Tupperware', 'Nalgene'],
  Bedsheet: ['Spaces', 'Bombay Dyeing', 'Wakefit', 'Portico', 'D’Decor', 'Raymond Home'],
  'Study Table': ['IKEA', 'Wakefit', 'Pepperfry', 'Nilkamal', 'Durian', 'Urban Ladder'],
  Toothpaste: ['Colgate', 'Sensodyne', 'Pepsodent', 'Closeup', 'Dabur', 'Patanjali'],
  'Body Wash': ['Dove', 'Nivea', 'The Body Shop', 'Fiama', 'Lux', 'Palmolive'],
  'Hair Oil': ['Parachute', 'Indulekha', 'Dabur', 'Bajaj', 'Kesh King', 'Mamaearth'],
  Conditioner: ['Dove', 'Tresemme', 'Pantene', 'L’Oreal', 'OGX', 'Herbal Essences'],
  'Face Cream': ['Olay', 'Pond’s', 'Nivea', 'Lakme', 'Himalaya', 'Clinique'],
  Deodorant: ['Nivea', 'Fogg', 'Axe', 'Park Avenue', 'Rexona', 'Wild Stone'],
}

const productDetails = {
  Shampoo: { description: 'A cleansing hair-care product for regular wash-day routines.', benefits: ['Helps lift everyday oil and buildup from hair', 'Supports a refreshed scalp feel after washing', 'Designed for regular hair-care routines'] },
  'Face Wash': { description: 'A facial cleanser designed for a simple daily skin-care routine.', benefits: ['Helps remove everyday dirt and surface oil', 'Supports a clean, refreshed skin feel', 'Designed for use as part of a daily skin-care routine'] },
  Lipstick: { description: 'A color cosmetic designed to add a finished look to makeup routines.', benefits: ['Adds color and definition to the lips', 'Supports quick day-to-evening makeup looks', 'Available in finishes suited to different styling preferences'] },
  Perfume: { description: 'A personal fragrance designed to add a distinctive scent to daily wear.', benefits: ['Adds a personal scent for everyday or occasion wear', 'Supports individual fragrance preferences', 'Designed to complement a range of personal styles'] },
  Moisturizer: { description: 'A skin-care cream designed to support comfortable-feeling, hydrated skin.', benefits: ['Helps maintain a moisturized skin feel', 'Supports a comfortable daily skin-care routine', 'Designed for use after cleansing'] },
  Sunscreen: { description: 'A topical sun-care product designed for outdoor and daytime routines.', benefits: ['Helps protect exposed skin from UV exposure when used as directed', 'Supports a consistent daytime skin-care routine', 'Designed to be reapplied according to its label directions'] },
  'Face Serum': { description: 'A concentrated-feel skin-care product designed to layer into a facial routine.', benefits: ['Supports targeted layering in a skin-care routine', 'Helps leave skin feeling cared for and comfortable', 'Designed to be used alongside a moisturizer'] },
  'Body Lotion': { description: 'A leave-on body moisturizer designed for everyday skin-care routines.', benefits: ['Helps maintain a soft, moisturized skin feel', 'Supports easy application across larger areas', 'Designed for use after bathing or whenever skin feels dry'] },
  Smartphone: { description: 'A connected mobile device designed for communication, apps and everyday tasks.', benefits: ['Supports calling, messaging and mobile connectivity', 'Helps bring apps, media and everyday tools together', 'Designed for portable use throughout the day'] },
  Laptop: { description: 'A portable computer designed for work, study and personal computing.', benefits: ['Supports productivity and study workflows', 'Helps run everyday software and browsing tasks', 'Designed for computing across home, school or work settings'] },
  Headphones: { description: 'Personal audio equipment designed for listening at home or on the move.', benefits: ['Supports private music and media listening', 'Helps focus audio in shared environments', 'Designed for portable everyday use'] },
  Smartwatch: { description: 'A wrist-worn connected device designed for at-a-glance information and activity tracking.', benefits: ['Supports convenient notifications from a paired device', 'Helps track selected daily activity signals', 'Designed to keep useful information within quick reach'] },
  Tablet: { description: 'A portable touchscreen device designed for reading, media and lightweight computing.', benefits: ['Supports comfortable reading and media viewing', 'Helps handle browsing and everyday apps', 'Designed for a portable, larger-screen experience'] },
  'Bluetooth Speaker': { description: 'A wireless speaker designed to play audio from compatible connected devices.', benefits: ['Supports wireless playback from compatible devices', 'Helps share music and spoken audio in a room', 'Designed for flexible listening at home or away'] },
  Camera: { description: 'A digital camera designed to capture still images and, on supported models, video.', benefits: ['Supports capturing photos for personal or creative projects', 'Helps provide more camera controls than a basic snapshot workflow', 'Designed for documenting travel, events or everyday moments'] },
  'Power Bank': { description: 'A portable battery pack designed to recharge compatible devices away from an outlet.', benefits: ['Helps recharge compatible devices while travelling', 'Supports a portable backup power routine', 'Designed to pair with devices using its supported connections'] },
  Shoes: { description: 'Everyday footwear designed to support comfortable movement across daily activities.', benefits: ['Supports comfortable wear during everyday movement', 'Helps provide a practical finishing touch to outfits', 'Designed for use across casual and active settings'] },
  Sneakers: { description: 'Casual athletic-inspired footwear designed for everyday styling and movement.', benefits: ['Supports comfortable everyday wear', 'Helps pair easily with casual outfits', 'Designed for versatile styling on and off the move'] },
  'T-Shirt': { description: 'A casual wardrobe staple designed for everyday layering and relaxed outfits.', benefits: ['Supports easy everyday outfit building', 'Helps layer comfortably across changing conditions', 'Designed to pair with a wide range of casual pieces'] },
  Jeans: { description: 'Durable everyday trousers designed for versatile casual styling.', benefits: ['Supports repeat wear across casual settings', 'Helps anchor a range of everyday outfits', 'Designed to pair with both relaxed and smart-casual pieces'] },
  Dress: { description: 'A one-piece apparel option designed for versatile day-to-occasion styling.', benefits: ['Supports a complete outfit with a single piece', 'Helps simplify styling for different occasions', 'Designed to pair with varied footwear and accessories'] },
  Handbag: { description: 'A carry accessory designed to organize personal essentials while completing an outfit.', benefits: ['Helps keep everyday personal items together', 'Supports practical organization while on the move', 'Designed to complement different outfit choices'] },
  Backpack: { description: 'A hands-free carry bag designed for commuting, study and everyday essentials.', benefits: ['Helps carry daily essentials hands-free', 'Supports organized packing for commutes or study', 'Designed for practical use across everyday settings'] },
  Jacket: { description: 'An outer layer designed to add coverage and complete a range of everyday outfits.', benefits: ['Helps add an extra layer in changing conditions', 'Supports versatile layering over casual outfits', 'Designed for practical wear across outdoor settings'] },
  'Mixer Grinder': { description: 'A countertop kitchen appliance designed to blend, mix and grind ingredients.', benefits: ['Helps prepare ingredients for everyday cooking', 'Supports blending and grinding tasks with compatible attachments', 'Designed to bring multiple kitchen prep steps into one appliance'] },
  'Air Fryer': { description: 'A countertop cooking appliance designed for circulating hot air around food.', benefits: ['Helps prepare crisp-style dishes with circulating hot air', 'Supports convenient countertop cooking', 'Designed for a range of small-batch meal and snack preparations'] },
  'Vacuum Cleaner': { description: 'A floor-care appliance designed to collect dust and debris from suitable surfaces.', benefits: ['Helps collect everyday dust and debris', 'Supports routine cleaning across compatible surfaces', 'Designed to make floor-care tasks more convenient'] },
  'Water Bottle': { description: 'A reusable drink container designed for carrying beverages through the day.', benefits: ['Helps keep a drink within reach while out', 'Supports reusable hydration habits', 'Designed for carrying beverages to work, study or travel'] },
  Bedsheet: { description: 'A bedding essential designed to cover a mattress and refresh bedroom styling.', benefits: ['Helps protect and cover the mattress surface', 'Supports a coordinated bedroom look', 'Designed for routine bedding changes and care'] },
  'Study Table': { description: 'A work surface designed to support focused study, reading and home-office tasks.', benefits: ['Supports a dedicated place for study and work', 'Helps organize books and everyday desk essentials', 'Designed to fit into home learning or work spaces'] },
  Toothpaste: { description: 'A daily oral-care product designed for use with a toothbrush as directed.', benefits: ['Helps clean teeth as part of regular brushing', 'Supports a consistent daily oral-care routine', 'Designed for use according to the product label'] },
  'Body Wash': { description: 'A rinse-off cleanser designed for everyday bathing and shower routines.', benefits: ['Helps cleanse skin during bathing', 'Supports a refreshing shower routine', 'Designed for convenient use with water and a washcloth or hands'] },
  'Hair Oil': { description: 'A hair-care oil designed to be applied to hair or scalp as directed on its label.', benefits: ['Helps condition the feel of hair', 'Supports pre-wash or styling routines, depending on use', 'Designed to complement other hair-care steps'] },
  Conditioner: { description: 'A rinse-off hair-care product designed to follow shampoo in a wash routine.', benefits: ['Helps leave hair feeling smoother after washing', 'Supports easier detangling and combing', 'Designed to complement a shampoo routine'] },
  'Face Cream': { description: 'A facial cream designed to support comfortable-feeling skin in a daily routine.', benefits: ['Helps maintain a moisturized skin feel', 'Supports a simple daily facial-care routine', 'Designed to layer after cleansing'] },
  Deodorant: { description: 'A personal-care product designed to add fragrance and freshness to daily routines.', benefits: ['Helps maintain a fresh feel through the day', 'Supports personal fragrance preferences', 'Designed for convenient use as part of daily grooming'] },
}

const salesMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
const salesFactors = [0.88, 0.94, 0.91, 1.03, 0.98, 1.08, 1.02, 1.14]
export const growthFromSales = (values) => {
  const baseline = values.slice(0, 3).reduce((sum, value) => sum + value, 0) / 3
  const latest = values.slice(-3).reduce((sum, value) => sum + value, 0) / 3
  return Number((((latest - baseline) / baseline) * 100).toFixed(1))
}

const productImages = {
  Shampoo: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=720&q=85',
  'Face Wash': 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=720&q=85',
  Lipstick: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=720&q=85',
  Perfume: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=720&q=85',
  Moisturizer: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=720&q=85',
  Sunscreen: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=720&q=85',
  'Face Serum': 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=720&q=85',
  'Body Lotion': 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=720&q=85',
  Smartphone: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=720&q=85',
  Laptop: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=720&q=85',
  Headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=720&q=85',
  Smartwatch: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=720&q=85',
  Tablet: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=720&q=85',
  'Bluetooth Speaker': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=720&q=85',
  Camera: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=720&q=85',
  'Power Bank': 'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=720&q=85',
  Shoes: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=85',
  Sneakers: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=720&q=85',
  'T-Shirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=720&q=85',
  Jeans: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=720&q=85',
  Dress: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=720&q=85',
  Handbag: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=720&q=85',
  Backpack: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=720&q=85',
  Jacket: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=720&q=85',
  'Mixer Grinder': 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=720&q=85',
  'Air Fryer': 'https://i.pinimg.com/736x/28/2a/af/282aafc6ddc71d9dfb0a90960c40767a.jpg',
  'Vacuum Cleaner': 'https://i.pinimg.com/1200x/77/3f/bf/773fbf15a88b0869fd3810f47a04aaf2.jpg',
  'Water Bottle': 'https://i.pinimg.com/1200x/a1/e3/a2/a1e3a2523b2de2beb7441ebe96dc1123.jpg',
  'Bedsheet': 'https://i.pinimg.com/736x/17/3e/3c/173e3ca173bf11dfee4f6c6e18cd9ff2.jpg',
  'Study Table': 'https://i.pinimg.com/736x/bc/36/e0/bc36e0f55d619233f8ef383596650371.jpg',
  'Toothpaste': 'https://i.pinimg.com/736x/5c/13/70/5c13702a83b382873e3b670ed8837b86.jpg',
  'Body Wash': 'https://i.pinimg.com/1200x/de/2b/ba/de2bba728270eb54b4754125f33f3458.jpg',
  'Hair Oil': 'https://i.pinimg.com/736x/bd/e3/8d/bde38d0ec4a4312c069baadd0cf6dad7.jpg',
  Conditioner: 'https://i.pinimg.com/736x/7a/f6/e4/7af6e49b589db309c78ecbf60259b584.jpg',
  'Face Cream': 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=720&q=85',
  Deodorant: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=720&q=85',
}

const productSeeds = {
  Shampoo: 1, 'Face Wash': 2, Lipstick: 3, Perfume: 4, Moisturizer: 5, Sunscreen: 6, 'Face Serum': 7, 'Body Lotion': 8,
  Smartphone: 9, Laptop: 10, Headphones: 11, Smartwatch: 12, Tablet: 13, 'Bluetooth Speaker': 14, Camera: 15, 'Power Bank': 16,
  Shoes: 17, Sneakers: 18, 'T-Shirt': 19, Jeans: 20, Dress: 21, Handbag: 22, Backpack: 23, Jacket: 24,
  'Mixer Grinder': 25, 'Air Fryer': 26, 'Vacuum Cleaner': 27, 'Water Bottle': 28, Bedsheet: 29, 'Study Table': 30,
  Toothpaste: 31, 'Body Wash': 32, 'Hair Oil': 33, Conditioner: 34, 'Face Cream': 35, Deodorant: 36,
}

const searchAliases = {
  Shampoo: ['hair', 'hair care'],
  'Face Wash': ['skin', 'skincare', 'face'],
  Lipstick: ['makeup', 'beauty'],
  Perfume: ['fragrance', 'beauty'],
  Moisturizer: ['skin', 'skincare'],
  Sunscreen: ['skin', 'skincare', 'sun protection'],
  'Face Serum': ['skin', 'skincare', 'face'],
  'Body Lotion': ['skin', 'skincare', 'body care'],
  Smartphone: ['phone', 'mobile'],
  Smartwatch: ['wearable', 'watch'],
  Shoes: ['shoe', 'footwear'],
  Sneakers: ['shoe', 'footwear'],
  'Hair Oil': ['hair', 'hair care'],
  Conditioner: ['hair', 'hair care'],
  'Face Cream': ['skin', 'skincare', 'face'],
}

const makeBrands = (productName, category) => {
  const seed = productSeeds[productName]
  const names = productOverrides[productName] || brandSets[category]
  return names.map((brandName, index) => {
    const sales = 26000 + ((seed * 7919 + (5 - index) * 11300) % 69000)
    const rawShare = 10 + ((seed * 7 + (5 - index) * 5) % 22)
    const customerInterest = 67 + ((seed * 11 + (5 - index) * 6) % 28)
    const rating = Number((4 + ((seed + index * 3) % 9) / 10).toFixed(1))
    const salesHistory = salesMonths.map((month, monthIndex) => ({
      month,
      sales: Math.max(1000, Math.round(sales * salesFactors[monthIndex] + (((seed * 13 + monthIndex * 97 + index * 53) % 1800) - 900))),
    }))
    const historyValues = salesHistory.map((point) => point.sales)
    return { brandName, name: brandName, sales: historyValues.at(-1), salesHistory, rawShare, customerInterest, rating, growth: growthFromSales(historyValues) }
  })
}

const calculatePerformanceScore = (brand, categoryBrands) => {
  const maxSales = Math.max(...categoryBrands.map((item) => item.sales), 1)
  const score = (brand.sales / maxSales) * 35
    + brand.marketShare * 0.25
    + brand.customerInterest * 0.2
    + (brand.rating / 5) * 10
    + Math.min(brand.growth / 30, 1) * 10
  return Math.round(Math.max(0, Math.min(100, score)))
}

export const productsData = Object.entries(productNames).flatMap(([category, names]) => names.map((name) => {
  const brands = makeBrands(name, category)
  const shareTotal = brands.reduce((total, brand) => total + brand.rawShare, 0)
  const normalizedBrands = brands.map((brand) => ({
    ...brand,
    marketShare: Number(((brand.rawShare / shareTotal) * 100).toFixed(1)),
  })).map((brand, index, allBrands) => ({
    ...brand,
    marketShare: index === allBrands.length - 1
      ? Number((100 - allBrands.slice(0, -1).reduce((total, item) => total + item.marketShare, 0)).toFixed(1))
      : brand.marketShare,
  })).map((brand, index, allBrands) => {
    const { rawShare, ...cleanBrand } = brand
    return { ...cleanBrand, performanceScore: calculatePerformanceScore(brand, allBrands) }
  })
  const salesTrend = salesMonths.map((month, index) => ({
    month,
    sales: brands.reduce((total, brand) => total + brand.salesHistory[index].sales, 0),
  }))
  return {
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  category,
  name,
  ...productDetails[name],
  image: productImages[name],
  searchAliases: searchAliases[name] || [],
  brands: normalizedBrands.sort((first, second) => second.performanceScore - first.performanceScore),
  salesTrend,
  growth: growthFromSales(salesTrend.map((point) => point.sales)),
  }
}))

export const searchProducts = (value) => {
  const query = String(value || '').trim().toLowerCase()
  if (!query) return []
  const aliasMatches = productsData.filter((product) => product.searchAliases.some((alias) => alias === query))
  if (aliasMatches.length) return aliasMatches
  return productsData.filter((product) => `${product.name} ${product.category} ${product.id} ${product.searchAliases.join(' ')}`.toLowerCase().includes(query))
}

export const findProduct = (value) => {
  const normalizedValue = String(value || '').trim().toLowerCase()
  return productsData.find((product) => product.id === normalizedValue) || productsData.find((product) => product.name.toLowerCase() === normalizedValue)
}
export const bestBrand = (product) => [...product.brands].sort((a, b) => b.performanceScore - a.performanceScore)[0]
export const formatSales = (value) => `${(value / 1000).toFixed(1)}k`
export const categorySales = (product) => product.brands.reduce((total, brand) => total + brand.sales, 0)
export const averageMetric = (product, key) => product.brands.length
  ? product.brands.reduce((total, brand) => total + brand[key], 0) / product.brands.length
  : 0
