import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categoriesData = [
  {
    slug: 'tshirt',
    label: 'T-Shirts',
    emoji: '👕',
    desc: 'Urban cuts, bold prints। Everyday streetwear essentials।',
    count: 45,
    tags: ['Oversized', 'Graphic', 'Plain', 'Polo'],
    featured: true,
  },
  {
    slug: 'hoodie',
    label: 'Hoodies',
    emoji: '🧥',
    desc: 'Street-ready warmth। Heavy fleece, zip-up, pullover।',
    count: 28,
    tags: ['Pullover', 'Zip-Up', 'Heavy Fleece', 'Cropped'],
    featured: true,
  },
  {
    slug: 'jogger',
    label: 'Joggers',
    emoji: '👖',
    desc: 'Move in style। Cargo, slim fit, tapered cut।',
    count: 32,
    tags: ['Cargo', 'Slim Fit', 'Tapered', 'Wide Leg'],
    featured: false,
  },
  {
    slug: 'cap',
    label: 'Caps',
    emoji: '🧢',
    desc: 'Top it off। Snapback, fitted, dad hat।',
    count: 19,
    tags: ['Snapback', 'Fitted', 'Dad Hat', 'Embroidered'],
    featured: false,
  },
]

const CategoriesPage = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '88px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div style={{ marginBottom: '60px', animation: 'fadeUp 0.4s ease' }}>
            <span style={{ fontSize: '11px', color: '#AAFF00', fontWeight: '700', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              — Browse
            </span>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#F0F0F0', lineHeight: 1, marginTop: '6px', marginBottom: '16px' }}>
              ALL CATEGORIES
            </h1>
            <p style={{ color: '#555', fontSize: '14px', maxWidth: '480px', lineHeight: 1.7 }}>
              তোমার style অনুযায়ী category choose করো। প্রতিটা collection এ আছে premium quality streetwear।
            </p>
          </div>

          {/* Featured Categories — Big Cards */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{ fontSize: '11px', color: '#AAFF00', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              Popular
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '20px',
            }}>
              {categoriesData.filter(c => c.featured).map((cat, i) => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${cat.slug}`}
                  onMouseEnter={() => setHovered(cat.slug)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'block', textDecoration: 'none',
                    background: hovered === cat.slug ? '#141414' : '#111',
                    border: `1px solid ${hovered === cat.slug ? '#AAFF00' : '#1A1A1A'}`,
                    borderRadius: '12px', padding: '40px 32px',
                    transform: hovered === cat.slug ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hovered === cat.slug ? '0 16px 40px rgba(170,255,0,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                    animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Glow on hover */}
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '150px', height: '150px',
                    background: 'radial-gradient(circle, rgba(170,255,0,0.08) 0%, transparent 70%)',
                    opacity: hovered === cat.slug ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* Emoji */}
                  <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>{cat.emoji}</div>

                  {/* Label */}
                  <h2 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: '2.2rem', color: '#F0F0F0',
                    letterSpacing: '0.05em', marginBottom: '10px', lineHeight: 1,
                  }}>
                    {cat.label}
                  </h2>

                  {/* Desc */}
                  <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                    {cat.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                    {cat.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '11px', color: '#555',
                        border: '1px solid #2A2A2A',
                        padding: '3px 10px', borderRadius: '20px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#444', fontSize: '12px' }}>
                      {cat.count}+ products
                    </span>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: hovered === cat.slug ? '#AAFF00' : '#444',
                      fontSize: '12px', fontWeight: '700',
                      transition: 'color 0.3s ease',
                    }}>
                      Shop Now <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Other Categories — Smaller Cards */}
          <div>
            <span style={{ fontSize: '11px', color: '#AAFF00', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>
              More 
            </span>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              {categoriesData.filter(c => !c.featured).map((cat, i) => (
                <Link
                  key={cat.slug}
                  to={`/products?category=${cat.slug}`}
                  onMouseEnter={() => setHovered(cat.slug)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: 'block', textDecoration: 'none',
                    background: hovered === cat.slug ? '#141414' : '#111',
                    border: `1px solid ${hovered === cat.slug ? '#AAFF00' : '#1A1A1A'}`,
                    borderRadius: '10px', padding: '28px 24px',
                    transform: hovered === cat.slug ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hovered === cat.slug ? '0 12px 32px rgba(170,255,0,0.08)' : 'none',
                    transition: 'all 0.3s ease',
                    animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{cat.emoji}</div>
                  <h3 style={{
                    fontFamily: "'Bebas Neue', cursive",
                    fontSize: '1.8rem', color: '#F0F0F0',
                    letterSpacing: '0.05em', marginBottom: '8px', lineHeight: 1,
                  }}>
                    {cat.label}
                  </h3>
                  <p style={{ color: '#666', fontSize: '12px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {cat.desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#444', fontSize: '12px' }}>{cat.count}+ products</span>
                    <ArrowRight size={16} color={hovered === cat.slug ? '#AAFF00' : '#333'} style={{ transition: 'color 0.3s ease' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{
            marginTop: '60px', padding: '40px',
            background: '#111', border: '1px solid #1A1A1A',
            borderRadius: '12px', textAlign: 'center',
            animation: 'fadeUp 0.6s ease',
          }}>
            <h3 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '2rem', color: '#F0F0F0', marginBottom: '8px' }}>
              সব products দেখতে চাও?
            </h3>
            <p style={{ color: '#555', fontSize: '13px', marginBottom: '24px' }}>
              সব category একসাথে browse করো
            </p>
            <Link to="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 32px', background: '#AAFF00', color: '#0A0A0A',
              fontWeight: '800', fontSize: '13px', letterSpacing: '0.1em',
              textTransform: 'uppercase', borderRadius: '6px', textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#88CC00'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#AAFF00'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default CategoriesPage