import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, ChevronDown, LayoutDashboard, Menu, Search, Sparkles, TrendingUp, X } from 'lucide-react'
import { averageMetric, bestBrand, categorySales, findProduct, formatSales, growthFromSales, productsData, searchProducts } from './data'

const routes = [
  { path: '/', label: 'Categories', icon: Search },
  { path: '/comparison', label: 'Brand Comparison', icon: BarChart3 },
  { path: '/why-this-brand', label: 'Why This Brand?', icon: CheckCircle2 },
  { path: '/insights', label: 'Marketing Insights', icon: Sparkles },
  { path: '/dashboard', label: 'Performance Dashboard', icon: LayoutDashboard },
]

const getRoute = () => window.location.pathname
const getProductFromUrl = () => new URLSearchParams(window.location.search).get('product') || ''
const categoryLabels = { Beauty: 'Beauty', Electronics: 'Electronics', Fashion: 'Fashion', Home: 'Home & Kitchen', 'Personal Care': 'Personal Care' }
const categoryDescriptions = {
  Beauty: 'Compare everyday beauty products, demand signals and brand momentum.',
  Electronics: 'Explore technology categories through sales, interest and growth signals.',
  Fashion: 'Understand the brands shaping style, demand and product performance.',
  Home: 'Find the strongest household products and the brands behind them.',
  'Personal Care': 'Track daily care products through a practical marketing lens.',
}
const categoryImage = (category) => productsData.find((product) => product.category === category)?.image

function App() {
  const [path, setPath] = useState(getRoute())
  const [selectedId, setSelectedId] = useState(getProductFromUrl())
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => { setPath(getRoute()); setSelectedId(getProductFromUrl()) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const product = findProduct(selectedId)
  const analysisProduct = product || productsData[0]
  const go = (nextPath, nextProduct = selectedId) => {
    const query = nextProduct ? `?product=${encodeURIComponent(nextProduct)}` : ''
    const url = `${nextPath}${query}`
    window.history.pushState({}, '', url)
    setPath(nextPath)
    setSelectedId(nextProduct)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className={path === '/why-this-brand' ? 'app-shell why-brand-route' : 'app-shell'}>
    <header className="navbar">
      <button className="brand" onClick={() => go('/')} aria-label="Go to Product Search"><span className="brand-mark">BS</span><span><strong>BrandScope</strong><small>Marketing intelligence</small></span></button>
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>{routes.map(({ path: routePath, label, icon: Icon }) => <button key={routePath} className={path === routePath ? 'nav-link active' : 'nav-link'} onClick={() => go(routePath)}><Icon size={16} />{label}</button>)}</nav>
      <div className="sample-pill">SAMPLE DATA</div>
    </header>
    <main className="page-container">
      {path === '/' && <HomePage product={product} onNavigate={go} />}
      {path.startsWith('/category/') && <CategoryPage category={decodeURIComponent(path.split('/')[2] || 'Fashion')} onNavigate={go} />}
      {path === '/product' && product && <ProductPage product={product} onNavigate={go} />}
      {path === '/comparison' && <ComparisonPage product={analysisProduct} onNavigate={go} />}
      {path === '/why-this-brand' && <WhyPage product={analysisProduct} onNavigate={go} />}
      {path === '/insights' && <InsightsPage product={analysisProduct} onNavigate={go} />}
      {path === '/dashboard' && <DashboardPage product={analysisProduct} onNavigate={go} />}
    </main>
    <footer><span>BrandScope</span><span>Product sales & brand performance analysis</span><span>Demo marketing dataset · 2026</span></footer>
  </div>
}

function PageHeader({ eyebrow, title, copy, product, onNavigate, backPath = '/' }) {
  const currentPath = window.location.pathname
  const moduleLabels = {
    '/product': 'MODULE 02 / PRODUCT ANALYSIS',
    '/comparison': 'MODULE 03 / BRAND COMPARISON',
    '/why-this-brand': 'MODULE 04 / WHY THIS BRAND',
    '/insights': 'PRODUCT MARKETING INTELLIGENCE',
  }
  const pageEyebrow = currentPath.startsWith('/category/') ? 'MODULE 01 / CATEGORY SELECTION' : moduleLabels[currentPath] || eyebrow
  return <><div className="page-header"><div><p className="eyebrow">{pageEyebrow}</p><h1>{title}</h1><p className="lead">{copy}</p></div><div className="page-header-actions">{product && <ProductSelect product={product} onNavigate={onNavigate} />}<button className="back-button" onClick={() => onNavigate(backPath, product?.id)}><ArrowLeft size={14} /> Back</button></div></div>{product && currentPath === '/product' && <ProductAnalysisOverview product={product} />}{product && currentPath === '/why-this-brand' && <TopPerformingBrand product={product} />}</>
}

function ProductSelect({ product, onNavigate }) {
  return <label className="product-select"><span>Viewing product</span><select value={product.id} onChange={(event) => onNavigate(window.location.pathname, event.target.value)}>{productsData.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown size={15} /></label>
}

function ProductAnalysisOverview({ product }) {
  const rating = averageMetric(product, 'rating')
  const score = averageMetric(product, 'performanceScore')
  const share = averageMetric(product, 'marketShare')
  const interest = averageMetric(product, 'customerInterest')
  const growth = product.growth
  const salesLeader = [...product.brands].sort((first, second) => second.sales - first.sales)[0]
  const interestLeader = [...product.brands].sort((first, second) => second.customerInterest - first.customerInterest)[0]
  const ratingLeader = [...product.brands].sort((first, second) => second.rating - first.rating)[0]
  const trendPoints = product.salesTrend
  const highMonth = trendPoints.reduce((highest, point) => point.sales > highest.sales ? point : highest, trendPoints[0])
  const lowMonth = trendPoints.reduce((lowest, point) => point.sales < lowest.sales ? point : lowest, trendPoints[0])
  const change = `${growth > 0 ? '+' : ''}${growth}%`
  const values = trendPoints.map((point) => point.sales)
  const width = 760
  const height = 210
  const padding = { top: 14, right: 12, bottom: 18, left: 12 }
  const min = Math.min(...values) * 0.94
  const max = Math.max(...values) * 1.04
  const points = values.map((value, index) => ({
    x: padding.left + index * ((width - padding.left - padding.right) / (values.length - 1)),
    y: padding.top + (1 - (value - min) / (max - min)) * (height - padding.top - padding.bottom),
  }))
  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${points[0].x},${height - padding.bottom} ${line} ${points[points.length - 1].x},${height - padding.bottom}`

  return <section className="analysis-overview panel">
    <div className="analysis-overview-copy">
      <p className="eyebrow">PRODUCT PROFILE</p>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <span className="category-tag">{categoryLabels[product.category]}</span>
    </div>
    <div className="analysis-metrics-grid">
      <Metric label="Sales (latest month)" value={formatSales(categorySales(product))} />
      <Metric label="Market share (brand avg.)" value={`${share.toFixed(1)}%`} />
      <Metric label="Customer interest (avg.)" value={`${interest.toFixed(1)}%`} />
      <Metric label="Average rating" value={`${rating.toFixed(1)}/5`} />
      <Metric label="Growth (sales trend)" value={change} />
      <Metric label="Performance score (avg.)" value={`${score.toFixed(0)}/100`} />
    </div>
    <div className="analysis-trend">
      <div className="trend-chart-wrap">
        <div className="analysis-section-heading"><div><p className="eyebrow">MONTHLY SALES</p><h3>Sales trend</h3></div><span>Jan – Aug 2026</span></div>
        <svg className="sales-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${product.name} monthly sales trend, ${change} from the first three-month average to the latest three-month average`}>
          {[0, 1, 2, 3].map((step) => <line key={step} x1={padding.left} x2={width - padding.right} y1={padding.top + step * ((height - padding.top - padding.bottom) / 3)} y2={padding.top + step * ((height - padding.top - padding.bottom) / 3)} className="chart-grid-line" />)}
          <polygon points={area} className="sales-area" />
          <polyline points={line} className="sales-line" />
          {points.map((point, index) => <circle key={trendPoints[index].month} cx={point.x} cy={point.y} r="4" className="sales-point"><title>{trendPoints[index].month}: {formatSales(trendPoints[index].sales)}</title></circle>)}
        </svg>
        <div className="trend-months">{trendPoints.map((point) => <span key={point.month}>{point.month}</span>)}</div>
      </div>
      <aside className="trend-analysis">
        <p className="eyebrow">TREND ANALYSIS</p>
        <h3>Sales {growth >= 0 ? 'increased' : 'decreased'} {change}</h3>
        <p>Change compares the first three-month average with the latest three-month average.</p>
        <dl><div><dt>High month</dt><dd>{highMonth.month} · {formatSales(highMonth.sales)}</dd></div><div><dt>Low month</dt><dd>{lowMonth.month} · {formatSales(lowMonth.sales)}</dd></div></dl>
        <p className="possible-factors">The series shows observed movement only. Campaign activity, availability, pricing and seasonality are possible associated factors, not established causes.</p>
      </aside>
      {window.location.pathname === '/insights' && <div className="trend-marketing-insight"><p className="eyebrow">MARKETING INSIGHT / TREND + BRAND SIGNALS</p><p>For {product.name}, monthly sales are {growth >= 0 ? 'up' : 'down'} {Math.abs(growth)}%. {salesLeader.name} leads current sales with {salesLeader.marketShare}% market share and a {salesLeader.performanceScore}/100 performance score; {interestLeader.name} has the highest customer interest at {interestLeader.customerInterest}%, while {ratingLeader.name} leads ratings at {ratingLeader.rating}/5. These indicators describe the sample data; campaign activity, price and availability are possible associated factors, not confirmed causes.</p></div>}
    </div>
  </section>
}

function BrandSalesTrend({ brand, productName }) {
  const values = brand.salesHistory.map((point) => point.sales)
  const width = 760
  const height = 210
  const padding = { top: 14, right: 12, bottom: 18, left: 12 }
  const min = Math.min(...values) * 0.94
  const max = Math.max(...values) * 1.04
  const points = values.map((value, index) => ({
    x: padding.left + index * ((width - padding.left - padding.right) / (values.length - 1)),
    y: padding.top + (1 - (value - min) / (max - min)) * (height - padding.top - padding.bottom),
  }))
  const line = points.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${points[0].x},${height - padding.bottom} ${line} ${points[points.length - 1].x},${height - padding.bottom}`
  const change = `${brand.growth > 0 ? '+' : ''}${brand.growth}%`

  return <section className="brand-sales-trend panel">
    <div className="analysis-section-heading"><div><p className="eyebrow">MONTHLY SALES / {brand.name}</p><h3>{productName} sales trend</h3></div><span>Jan – Aug 2026</span></div>
    <svg className="sales-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${brand.name} ${productName} monthly sales, ${change} based on the first and last three-month averages`}>
      {[0, 1, 2, 3].map((step) => <line key={step} x1={padding.left} x2={width - padding.right} y1={padding.top + step * ((height - padding.top - padding.bottom) / 3)} y2={padding.top + step * ((height - padding.top - padding.bottom) / 3)} className="chart-grid-line" />)}
      <polygon points={area} className="sales-area" />
      <polyline points={line} className="sales-line" />
      {points.map((point, index) => <circle key={brand.salesHistory[index].month} cx={point.x} cy={point.y} r="4" className="sales-point"><title>{brand.salesHistory[index].month}: {formatSales(brand.salesHistory[index].sales)}</title></circle>)}
    </svg>
    <div className="trend-months">{brand.salesHistory.map((point) => <span key={point.month}>{point.month}</span>)}</div>
    <p className="brand-trend-growth">Growth: <strong>{change}</strong> from the first three-month average to the latest three-month average.</p>
  </section>
}

function TopPerformingBrand({ product }) {
  const winner = bestBrand(product)
  const metricRanks = ['sales', 'growth', 'marketShare', 'customerInterest', 'rating', 'performanceScore'].map((key) => ({
    key,
    rank: [...product.brands].sort((first, second) => second[key] - first[key]).findIndex((brand) => brand.name === winner.name) + 1,
  }))
  const displayMetric = (brand, key) => {
    if (key === 'sales') return formatSales(brand.sales)
    if (key === 'growth') return `${brand.growth > 0 ? '+' : ''}${brand.growth}%`
    if (key === 'marketShare') return `${brand.marketShare}%`
    if (key === 'customerInterest') return `${brand.customerInterest}%`
    if (key === 'rating') return `${brand.rating}/5`
    return `${brand.performanceScore}/100`
  }
  const metricLabels = { sales: 'sales', growth: 'growth', marketShare: 'market share', customerInterest: 'customer interest', rating: 'average rating', performanceScore: 'performance score' }

  return <section className="why-brand-module">
    <section className="product-profile panel">
      <div className="why-product-image"><img src={product.image} alt={product.name} /></div>
      <div className="why-product-copy"><p className="eyebrow">PRODUCT PROFILE / {categoryLabels[product.category]}</p><h2>{product.name}</h2><p>{product.description}</p><h3>Product benefits</h3><ul className="benefit-list">{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></div>
    </section>
    <section className="panel table-panel why-comparison-panel">
      <div className="panel-title"><div><p className="eyebrow">BRAND COMPARISON</p><h2>{product.name} brand performance</h2></div><span className="legend-dot">Sorted by performance score</span></div>
      <div className="table-scroll"><table><thead><tr><th>Brand</th><th>Sales</th><th>Growth</th><th>Market share</th><th>Customer interest</th><th>Average rating</th><th>Performance score</th></tr></thead><tbody>{product.brands.map((brand) => <tr key={brand.name} className={brand.name === winner.name ? 'top-performing-row' : ''}><td><strong>{brand.name}</strong>{brand.name === winner.name && <span className="table-winner-label">Top Performing Brand</span>}</td><td>{formatSales(brand.sales)}</td><td className={brand.growth >= 0 ? 'positive' : 'negative'}>{displayMetric(brand, 'growth')}</td><td>{displayMetric(brand, 'marketShare')}</td><td>{displayMetric(brand, 'customerInterest')}</td><td>{displayMetric(brand, 'rating')}</td><td><b className="score-badge">{displayMetric(brand, 'performanceScore')}</b></td></tr>)}</tbody></table></div>
    </section>
    <section className="top-brand-panel panel">
      <div className="top-brand-heading"><div><p className="eyebrow">COMPARATIVE RESULT</p><h2>Top Performing Brand</h2></div><span className="winner-badge"><CheckCircle2 size={16} />{winner.name}</span></div>
      <p className="top-brand-explanation">Based on the comparison of the available brand performance metrics, this brand is identified as the top-performing brand for this product in our analysis.</p>
      <h3>Why This Brand?</h3>
      <ul className="top-brand-reasons">{metricRanks.map(({ key, rank }) => <li key={key}><strong>{metricLabels[key]}:</strong> {displayMetric(winner, key)}; ranked {rank} of {product.brands.length} brands.</li>)}</ul>
    </section>
    <BrandSalesTrend brand={winner} productName={product.name} />
  </section>
}

function SearchControl({ product, onNavigate }) {
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState(null)
  useEffect(() => { setQuery(product?.name || ''); setMatches(null) }, [product?.id])
  const submit = (event) => {
    event.preventDefault()
    const normalizedQuery = query.trim().toLowerCase()
    const exactMatch = productsData.find((item) => item.name.toLowerCase() === normalizedQuery || item.id === normalizedQuery)
    if (exactMatch) onNavigate('/product', exactMatch.id)
    else setMatches(searchProducts(query))
  }
  return <>
    <form className="search-box" onSubmit={submit}><Search size={21} /><input value={query} onChange={(event) => { setQuery(event.target.value); setMatches(null) }} placeholder="Search for a product..." aria-label="Search products" /><button type="submit">Search</button></form>
    {matches && <section className="result-section" aria-live="polite">
      {matches.length ? <><div className="result-heading"><div><h2>Search results</h2><p>{matches.length} products found</p></div></div><div className="result-grid">{matches.map((item) => <ProductCard key={item.id} product={item} onNavigate={onNavigate} />)}</div></> : <div className="empty-search"><h2>No results found</h2><p>Try searching for another product.</p></div>}
    </section>}
  </>
}

function HomePage({ product, onNavigate }) {
  return <><section className="hero-search home-hero"><div className="hero-copy"><p className="eyebrow">BRANDSCOPE / MARKET EXPLORER</p><h1>Product Sales &amp; <em>Brand Performance Analysis</em></h1><p>Explore product-level signals to understand who is winning, what is driving demand, and where the next opportunity sits.</p></div><SearchControl product={product} onNavigate={onNavigate} /><div className="search-hints">Popular searches: {['Shampoo', 'Smartphone', 'Laptop', 'Shoes', 'Perfume'].map((item) => <button type="button" key={item} onClick={() => { const match = searchProducts(item)[0]; if (match) onNavigate('/product', match.id) }}>{item}</button>)}</div></section><section className="category-section"><div className="section-heading-row"><div><p className="eyebrow">EXPLORE PRODUCT CATEGORIES</p><h2>Start with a market you know</h2><p>Choose a category to see its complete product set and brand landscape.</p></div><span className="product-count">{productsData.length} products</span></div><div className="category-grid">{Object.keys(categoryLabels).map((category) => <CategoryCard key={category} category={category} onNavigate={onNavigate} />)}</div></section></>
}

function CategoryCard({ category, onNavigate }) {
  const count = productsData.filter((product) => product.category === category).length
  return <button className="category-card" onClick={() => onNavigate(`/category/${encodeURIComponent(category)}`)}><img src={categoryImage(category)} alt="" /><span className="category-card-copy"><small>{count} products</small><strong>{categoryLabels[category]}</strong><span>{categoryDescriptions[category]}</span></span><ArrowRight size={17} /></button>
}

function CategoryPage({ category, onNavigate }) {
  const products = productsData.filter((product) => product.category === category)
  const label = categoryLabels[category] || category
  return <><PageHeader eyebrow="PRODUCT CATEGORY" title={`${label} Products`} copy={`Explore product-level sales and brand performance insights across the ${label} category.`} onNavigate={onNavigate} /><div className="breadcrumb"><button onClick={() => onNavigate('/')}>Home</button><span>/</span><strong>{label}</strong></div><div className="category-search"><SearchControl onNavigate={onNavigate} /></div><div className="product-list-grid">{products.map((item) => <ProductCard key={item.id} product={item} onNavigate={onNavigate} />)}</div></>
}

function ProductCard({ product, onNavigate }) {
  return <button className="catalog-product-card" onClick={() => onNavigate('/product', product.id)}><img src={product.image} alt={product.name} /><span className="catalog-product-copy"><small>{categoryLabels[product.category]}</small><strong>{product.name}</strong><span>{product.description}</span><b>View Analysis <ArrowRight size={14} /></b></span></button>
}

function ProductPage({ product, onNavigate }) {
  const productSearch = <div className="product-detail-search"><SearchControl product={product} onNavigate={onNavigate} /></div>
  return <><PageHeader eyebrow="PRODUCT ANALYSIS" title={product.name} copy={`${categoryLabels[product.category]} / ${product.name}`} product={product} onNavigate={onNavigate} backPath={`/category/${encodeURIComponent(product.category)}`} /><div className="breadcrumb"><button onClick={() => onNavigate('/')}>Home</button><span>/</span><button onClick={() => onNavigate(`/category/${encodeURIComponent(product.category)}`)}>{categoryLabels[product.category]}</button><span>/</span><strong>{product.name}</strong></div><div className="product-detail"><div className="product-detail-image"><img src={product.image} alt={product.name} /></div><section className="product-detail-copy"><p className="eyebrow">{categoryLabels[product.category]} / {product.name}</p><h2>About This Product</h2><p>{product.name} is a commonly purchased {product.category.toLowerCase()} product. This page presents sample marketing data to compare brand sales, market share, customer interest, ratings and growth.</p><span className="dataset-note">Sample marketing dataset · 2026</span><div className="metric-strip product-metrics"><Metric label="Top performing brand" value={bestBrand(product).name} /><Metric label="Category sales" value={formatSales(categorySales(product))} /><Metric label="Market share" value={`${bestBrand(product).marketShare}%`} /><Metric label="Customer interest" value={`${bestBrand(product).customerInterest}%`} /><Metric label="Average rating" value={`${averageMetric(product, 'rating').toFixed(1)}/5`} /><Metric label="Growth" value={`+${Math.round(averageMetric(product, 'growth'))}%`} /><Metric label="Number of brands" value={product.brands.length} /><Metric label="Performance score" value={`${bestBrand(product).performanceScore}/100`} /></div><div className="button-row detail-actions"><button className="primary-button" onClick={() => onNavigate('/comparison', product.id)}>Compare Brands <ArrowRight size={15} /></button><button className="secondary-button" onClick={() => onNavigate('/why-this-brand', product.id)}>Why This Brand?</button><button className="secondary-button" onClick={() => onNavigate('/insights', product.id)}>Marketing Insights</button><button className="secondary-button" onClick={() => onNavigate('/dashboard', product.id)}>Performance Dashboard</button></div></section></div></>
}

function ComparisonPage({ product, onNavigate }) {
  const chartSections = [['Sales', 'sales', (brand) => formatSales(brand.sales)], ['Market share', 'marketShare', (brand) => `${brand.marketShare}%`], ['Growth', 'growth', (brand) => `+${brand.growth}%`]]
  return <><PageHeader eyebrow="MODULE 02 / COMPARISON" title="Brand Comparison" copy={`A complete view of every brand competing in ${product.name}.`} product={product} onNavigate={onNavigate} /><div className="metric-strip"><Metric label="Brands tracked" value={product.brands.length} /><Metric label="Category sales" value={formatSales(categorySales(product))} /><Metric label="Market leader" value={bestBrand(product).name} /><Metric label="Top score" value={`${bestBrand(product).performanceScore}/100`} /></div><section className="panel"><div className="panel-title"><div><p className="eyebrow">PERFORMANCE SCORE</p><h2>Every brand, side by side</h2></div><span className="legend-dot">Score out of 100</span></div><div className="comparison-chart">{product.brands.map((brand) => <div className="compare-bar" key={brand.name}><div className="bar-value">{brand.performanceScore}</div><div className="vertical-bar"><i style={{ height: `${brand.performanceScore}%` }} /></div><strong>{brand.name}</strong></div>)}</div></section><div className="comparison-mini-grid">{chartSections.map(([label, key, display]) => <section className="panel mini-chart-panel" key={key}><p className="eyebrow">{label.toUpperCase()}</p><h3>{product.name} {label}</h3>{product.brands.map((brand) => <div className="mini-chart-row" key={brand.name}><span>{brand.name}</span><div><i style={{ width: `${key === 'sales' ? (brand.sales / Math.max(...product.brands.map((item) => item.sales))) * 100 : key === 'marketShare' ? brand.marketShare : Math.min(brand.growth * 3, 100)}%` }} /></div><b>{display(brand)}</b></div>)}</section>)}</div><section className="panel table-panel"><div className="panel-title"><div><p className="eyebrow">DETAILED METRICS</p><h2>{product.name} brand data</h2></div></div><div className="table-scroll"><table><thead><tr><th>Brand</th><th>Sales</th><th>Market share</th><th>Interest</th><th>Rating</th><th>Growth</th><th>Score</th></tr></thead><tbody>{product.brands.map((brand) => <tr key={brand.name}><td><strong>{brand.name}</strong></td><td>{brand.sales.toLocaleString('en-IN')}</td><td>{brand.marketShare}%</td><td>{brand.customerInterest}%</td><td>{brand.rating}/5</td><td className="positive">+{brand.growth}%</td><td><b className="score-badge">{brand.performanceScore}</b></td></tr>)}</tbody></table></div></section></>
}

function WhyPage({ product, onNavigate }) {
  const winner = bestBrand(product)
  const factors = [['Sales performance', Math.round((winner.sales / Math.max(...product.brands.map((brand) => brand.sales))) * 100), `${formatSales(winner.sales)} units`], ['Market share', winner.marketShare, `${winner.marketShare}%`], ['Customer interest', winner.customerInterest, `${winner.customerInterest}%`], ['Product rating', winner.rating * 20, `${winner.rating}/5`], ['Growth rate', Math.min(winner.growth * 4, 100), `+${winner.growth}%`], ['Overall performance', winner.performanceScore, `${winner.performanceScore}/100`]]
  const categoryAverageScore = Math.round(averageMetric(product, 'performanceScore'))
  const strengths = [winner.marketShare >= averageMetric(product, 'marketShare') ? 'market share' : '', winner.customerInterest >= averageMetric(product, 'customerInterest') ? 'customer interest' : '', winner.growth >= averageMetric(product, 'growth') ? 'growth' : 'sales'].filter(Boolean).join(', ')
  return <><PageHeader eyebrow="MODULE 03 / BRAND ANALYSIS" title="Why This Brand?" copy={`Understand the signals behind ${winner.name}'s lead in the ${product.name.toLowerCase()} category.`} product={product} onNavigate={onNavigate} /><section className="why-layout"><div className="why-intro"><div className="winner-badge"><CheckCircle2 size={17} /> CURRENT CATEGORY LEADER</div><h2>Why {winner.name} is currently the top-performing brand</h2><p>Based on this sample marketing dataset, {winner.name} leads through {strengths}. This comparative score is for the project and is not a real-world market claim.</p><div className="button-row"><button className="primary-button" onClick={() => onNavigate('/comparison', product.id)}>Compare brands <ArrowRight size={15} /></button><button className="secondary-button" onClick={() => onNavigate('/insights', product.id)}>View insights</button></div></div><div className="factor-panel">{factors.map(([label, value, display]) => <div className="factor" key={label}><div><span>{label}</span><strong>{display}</strong></div><div className="factor-track"><i style={{ width: `${value}%` }} /></div></div>)}</div></section><section className="why-detail-grid"><div className="panel"><p className="eyebrow">PERFORMANCE STRENGTHS</p><h3>{winner.name} is {winner.performanceScore > categoryAverageScore ? `${winner.performanceScore - categoryAverageScore} points above` : 'near'} the category average.</h3><p>Its strongest signals are {strengths}.</p></div><div className="panel"><p className="eyebrow">IMPROVEMENT OPPORTUNITY</p><h3>{winner.name}'s focus area</h3><p>{winner.growth < averageMetric(product, 'growth') ? 'A stronger growth plan could protect its lead.' : 'Maintaining customer interest while scaling sales can widen its lead.'}</p></div><div className="panel"><p className="eyebrow">MARKETING RECOMMENDATION</p><h3>Use proof-led campaigns</h3><p>Use {winner.rating}/5 product satisfaction and {winner.marketShare}% share as campaign proof points, then track conversion against the category average.</p></div></section><div className="callout"><ArrowLeft size={19} /><span>Selected product: <strong>{product.name}</strong> · {winner.name} remains the calculated leader.</span></div></>
}

function InsightsPage({ product, onNavigate }) {
  const leader = [...product.brands].sort((a, b) => b.sales - a.sales)[0]
  const fast = [...product.brands].sort((a, b) => b.growth - a.growth)[0]
  const interest = [...product.brands].sort((a, b) => b.customerInterest - a.customerInterest)[0]
  const rated = [...product.brands].sort((a, b) => b.rating - a.rating)[0]
  const low = [...product.brands].sort((a, b) => a.performanceScore - b.performanceScore)[0]
  const conversionOpportunity = interest.customerInterest > leader.customerInterest && interest.sales < leader.sales
  return <><PageHeader eyebrow="MODULE 04 / MARKETING INTELLIGENCE" title="Marketing Insights" copy={`Actionable observations generated from the ${product.name.toLowerCase()} brand dataset.`} product={product} onNavigate={onNavigate} /><div className="insight-cards"><Insight label="Market leader" value={leader.name} detail={`${formatSales(leader.sales)} sales · ${leader.marketShare}% share`} tone="green" /><Insight label="Fastest growing" value={fast.name} detail={`+${fast.growth}% growth this period`} tone="gold" /><Insight label="Highest customer interest" value={interest.name} detail={`${interest.customerInterest}% interest index`} tone="blue" /><Insight label="Highest rated" value={rated.name} detail={`${rated.rating}/5 product rating`} tone="rose" /><Insight label="Low performing brand" value={low.name} detail={`${low.performanceScore}/100 performance score`} tone="slate" /></div><div className="insight-detail-grid"><section className="panel"><p className="eyebrow">SALES PERFORMANCE</p><h3>{leader.name} leads with {formatSales(leader.sales)} sales.</h3><p>Its {leader.marketShare}% market share indicates a strong position within the complete {product.name.toLowerCase()} category.</p></section><section className="panel"><p className="eyebrow">GROWTH OPPORTUNITY</p><h3>{fast.name} is growing at +{fast.growth}%.</h3><p>{fast.name === leader.name ? 'The leader is still expanding its position.' : 'This emerging challenger may need distribution and awareness investment to convert momentum into share.'}</p></section><section className="panel"><p className="eyebrow">CUSTOMER INTEREST VS SALES</p><h3>{conversionOpportunity ? `${interest.name} has a conversion opportunity.` : `${interest.name} is converting interest effectively.`}</h3><p>{conversionOpportunity ? 'High interest with lower sales suggests a possible conversion, pricing, or availability gap.' : 'Customer interest and sales are currently aligned in this sample.'}</p></section></div><section className="insight-story"><div className="story-mark"><Sparkles size={19} /></div><div><p className="eyebrow">MARKETING OBSERVATION</p><h2>Where the opportunity sits</h2><p>{leader.name} currently has the strongest sales performance in {product.name.toLowerCase()}, while {fast.name} shows the fastest growth. That combination suggests a category with a clear leader and a challenger gaining momentum. The lowest-scoring brand, {low.name}, may need a focused improvement plan around growth and customer value.</p><div className="opportunity-row"><div><span>Recommended marketing focus</span><strong>{conversionOpportunity ? `Conversion campaigns for ${interest.name}` : `Defend ${leader.name}'s category leadership`}</strong></div><button className="secondary-button" onClick={() => onNavigate('/dashboard', product.id)}>Review dashboard <ArrowRight size={15} /></button></div></div></section></>
}

function DashboardPage({ product, onNavigate }) {
  const allBrandEntries = productsData.flatMap((item) => item.brands.map((brand) => ({ ...brand, category: item.category })))
  const average = (key) => allBrandEntries.reduce((total, brand) => total + brand[key], 0) / allBrandEntries.length
  const brandGroups = new Map()
  allBrandEntries.forEach((brand) => {
    const aggregate = brandGroups.get(brand.name) || {
      name: brand.name,
      sales: 0,
      marketShare: 0,
      customerInterest: 0,
      rating: 0,
      performanceScore: 0,
      entries: 0,
      salesHistory: brand.salesHistory.map((point) => ({ month: point.month, sales: 0 })),
    }
    aggregate.sales += brand.sales
    aggregate.marketShare += brand.marketShare
    aggregate.customerInterest += brand.customerInterest
    aggregate.rating += brand.rating
    aggregate.performanceScore += brand.performanceScore
    aggregate.entries += 1
    brand.salesHistory.forEach((point, index) => { aggregate.salesHistory[index].sales += point.sales })
    brandGroups.set(brand.name, aggregate)
  })
  const portfolioBrands = [...brandGroups.values()].map((brand) => ({
    ...brand,
    marketShare: Number((brand.marketShare / brand.entries).toFixed(1)),
    customerInterest: Number((brand.customerInterest / brand.entries).toFixed(1)),
    rating: Number((brand.rating / brand.entries).toFixed(1)),
    performanceScore: Math.round(brand.performanceScore / brand.entries),
    growth: growthFromSales(brand.salesHistory.map((point) => point.sales)),
  }))
  const scoreLeaders = [...portfolioBrands].sort((first, second) => second.performanceScore - first.performanceScore).slice(0, 8)
  const salesLeaders = [...portfolioBrands].sort((first, second) => second.sales - first.sales).slice(0, 8)
  const growthLeaders = [...portfolioBrands].sort((first, second) => second.growth - first.growth).slice(0, 8)
  const portfolioTrend = productsData[0].salesTrend.map((point, index) => ({
    month: point.month,
    sales: productsData.reduce((total, item) => total + item.salesTrend[index].sales, 0),
  }))
  const portfolioGrowth = growthFromSales(portfolioTrend.map((point) => point.sales))
  const totalSales = productsData.reduce((total, item) => total + categorySales(item), 0)
  const topScoreBrand = scoreLeaders[0]
  const topSalesBrand = salesLeaders[0]
  const topGrowthBrand = growthLeaders[0]
  const categories = Object.keys(categoryLabels).map((category) => {
    const categoryProducts = productsData.filter((item) => item.category === category)
    const categoryBrands = categoryProducts.flatMap((item) => item.brands)
    return {
      name: categoryLabels[category],
      sales: categoryProducts.reduce((total, item) => total + categorySales(item), 0),
      growth: categoryProducts.reduce((total, item) => total + item.growth, 0) / categoryProducts.length,
      marketShare: categoryBrands.reduce((total, brand) => total + brand.marketShare, 0) / categoryBrands.length,
      customerInterest: categoryBrands.reduce((total, brand) => total + brand.customerInterest, 0) / categoryBrands.length,
      rating: categoryBrands.reduce((total, brand) => total + brand.rating, 0) / categoryBrands.length,
    }
  })
  return <>
    <PageHeader eyebrow="MODULE 05 / PERFORMANCE OVERVIEW" title="Performance Dashboard" copy="A consolidated view of category health and brand performance across all 36 products." product={product} onNavigate={onNavigate} />
    <div className="dashboard-stats">
      <Metric label="Products tracked" value={productsData.length} />
      <Metric label="Overall sales" value={formatSales(totalSales)} />
      <Metric label="Average growth" value={`${average('growth').toFixed(1)}%`} />
      <Metric label="Average market share" value={`${average('marketShare').toFixed(1)}%`} />
      <Metric label="Average customer interest" value={`${average('customerInterest').toFixed(1)}%`} />
      <Metric label="Average rating" value={`${average('rating').toFixed(1)}/5`} />
    </div>
    <section className="dashboard-portfolio-trend panel">
      <div className="panel-title"><div><p className="eyebrow">PORTFOLIO SALES TREND</p><h2>Monthly sales across the catalog</h2></div><strong className={portfolioGrowth >= 0 ? 'positive' : 'negative'}>{portfolioGrowth > 0 ? '+' : ''}{portfolioGrowth}%</strong></div>
      <PortfolioSalesTrend points={portfolioTrend} />
      <div className="trend-months">{portfolioTrend.map((point) => <span key={point.month}>{point.month}</span>)}</div>
      <p className="trend-caption">Growth compares the first three-month average with the latest three-month average.</p>
    </section>
    <div className="dashboard-grid">
      <section className="panel"><div className="panel-title"><div><p className="eyebrow">BRAND PERFORMANCE</p><h2>Average score by brand</h2></div></div><div className="horizontal-chart">{scoreLeaders.map((brand) => <div className="horizontal-row" key={brand.name}><span>{brand.name}</span><div><i style={{ width: `${brand.performanceScore}%` }} /></div><b>{brand.performanceScore}</b></div>)}</div></section>
      <section className="panel"><div className="panel-title"><div><p className="eyebrow">CATEGORY HEALTH</p><h2>Sales by category</h2></div></div><div className="category-health-list">{categories.map((category) => <div className="category-health-row" key={category.name}><span>{category.name}</span><strong>{formatSales(category.sales)}</strong><small>{category.growth > 0 ? '+' : ''}{category.growth.toFixed(1)}% growth</small></div>)}</div></section>
    </div>
    <div className="dashboard-chart-grid">
      <DashboardChart title="Sales comparison" brands={salesLeaders} valueKey="sales" display={(brand) => formatSales(brand.sales)} />
      <DashboardChart title="Growth trend by brand" brands={growthLeaders} valueKey="growth" display={(brand) => `${brand.growth > 0 ? '+' : ''}${brand.growth}%`} />
    </div>
    <section className="dashboard-insights panel">
      <div className="panel-title"><div><p className="eyebrow">OVERALL INSIGHTS</p><h2>Patterns across the product portfolio</h2></div></div>
      <div className="dashboard-insight-grid">
        <article><span>Category sales movement</span><strong>{portfolioGrowth >= 0 ? 'Portfolio sales are trending up' : 'Portfolio sales are trending down'}</strong><p>The combined monthly series changed {portfolioGrowth > 0 ? '+' : ''}{portfolioGrowth}% between its first and latest three-month averages.</p></article>
        <article><span>Brand performance pattern</span><strong>{topScoreBrand.name} leads on average score</strong><p>Its average score is {topScoreBrand.performanceScore}/100 across {topScoreBrand.entries} product comparisons; {topSalesBrand.name} records the highest combined sales.</p></article>
        <article><span>Growth observation</span><strong>{topGrowthBrand.name} has the strongest growth signal</strong><p>Its combined brand sales history indicates {topGrowthBrand.growth > 0 ? '+' : ''}{topGrowthBrand.growth}% growth. This is an observed pattern, not evidence of a specific cause.</p></article>
      </div>
      <div className="portfolio-category-metrics">{categories.map((category) => <div key={category.name}><strong>{category.name}</strong><span>{category.customerInterest.toFixed(1)}% interest · {category.rating.toFixed(1)}/5 rating · {category.marketShare.toFixed(1)}% avg. share</span></div>)}</div>
    </section>
  </>
}

function PortfolioSalesTrend({ points }) {
  const values = points.map((point) => point.sales)
  const width = 760
  const height = 180
  const padding = { top: 12, right: 12, bottom: 10, left: 12 }
  const min = Math.min(...values) * 0.94
  const max = Math.max(...values) * 1.04
  const coordinates = values.map((value, index) => ({
    x: padding.left + index * ((width - padding.left - padding.right) / (values.length - 1)),
    y: padding.top + (1 - (value - min) / (max - min)) * (height - padding.top - padding.bottom),
  }))
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(' ')
  const area = `${coordinates[0].x},${height - padding.bottom} ${line} ${coordinates[coordinates.length - 1].x},${height - padding.bottom}`
  return <svg className="sales-trend-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Monthly sales across all products">
    {[0, 1, 2, 3].map((step) => <line key={step} x1={padding.left} x2={width - padding.right} y1={padding.top + step * ((height - padding.top - padding.bottom) / 3)} y2={padding.top + step * ((height - padding.top - padding.bottom) / 3)} className="chart-grid-line" />)}
    <polygon points={area} className="sales-area" /><polyline points={line} className="sales-line" />
    {coordinates.map((point, index) => <circle key={points[index].month} cx={point.x} cy={point.y} r="4" className="sales-point"><title>{points[index].month}: {formatSales(points[index].sales)}</title></circle>)}
  </svg>
}

function DashboardChart({ title, brands, valueKey, display }) {
  const maxValue = Math.max(...brands.map((brand) => brand[valueKey]), 1)
  return <section className="panel dashboard-chart"><p className="eyebrow">{title.toUpperCase()}</p><h2>{title}</h2>{brands.map((brand) => <div className="dashboard-chart-row" key={brand.name}><span>{brand.name}</span><div><i style={{ width: `${(brand[valueKey] / maxValue) * 100}%` }} /></div><b>{display(brand)}</b></div>)}</section>
}

function Metric({ label, value }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div> }
function Insight({ label, value, detail, tone }) { return <div className={`insight-card ${tone}`}><span>{label}</span><h3>{value}</h3><p>{detail}</p></div> }

export default App
