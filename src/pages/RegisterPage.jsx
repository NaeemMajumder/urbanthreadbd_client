import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import logoDark from '../assets/logo-dark.png'

const RegisterPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', phone: '', password: '', confirmPassword: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const passwordStrength = () => {
    const p = form.password
    if (p.length === 0) return { level: 0, label: '', color: '' }
    if (p.length < 6) return { level: 1, label: 'Weak', color: '#FF4444' }
    if (p.length < 8) return { level: 2, label: 'Fair', color: '#FF8800' }
    return { level: 3, label: 'Strong', color: '#AAFF00' }
  }

  const strength = passwordStrength()

  const handleSubmit = async () => {
    if (!form.name.trim()) return toast.error('Name দাও')
    if (!form.phone.trim() || form.phone.length < 11) return toast.error('Valid phone number দাও')
    if (form.password.length < 6) return toast.error('Password কমপক্ষে ৬ characters হতে হবে')
    if (form.password !== form.confirmPassword) return toast.error('Password match করেনি')

    setLoading(true)
    try {
      // Backend ready হলে এই comment সরাও:
      // const res = await api.post('/auth/register', { name: form.name, phone: form.phone, password: form.password })
      // login(res.data.data.user, res.data.data.token)

      // Mock register
      const mockUser = { _id: '1', name: form.name, phone: form.phone, role: 'user' }
      login(mockUser, 'mock-token-123')
      toast.success('Registration successful!')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: '#0F0F0F', border: '1px solid #222',
    borderRadius: '8px', color: '#F0F0F0',
    fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    display: 'block', color: '#888', fontSize: '11px',
    fontWeight: '700', letterSpacing: '0.1em',
    textTransform: 'uppercase', marginBottom: '8px',
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        input:focus { border-color: #AAFF00 !important; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>

        {/* Background glow */}
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(170,255,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ width: '100%', maxWidth: '460px', animation: 'fadeUp 0.5s ease' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link to="/">
              <img src={logoDark} alt="UrbanThread BD" style={{ height: '32px', width: 'auto' }} />
            </Link>
          </div>

          {/* Title */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '2.5rem', color: '#F0F0F0', lineHeight: 1, marginBottom: '8px' }}>
              CREATE ACCOUNT
            </h1>
            <p style={{ color: '#555', fontSize: '14px' }}>UrbanThread BD তে join করো</p>
          </div>

          {/* Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Full Name</label>
            <input type="text" placeholder="Rahim Ahmed"
              value={form.name} onChange={e => updateForm('name', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Phone Number</label>
            <input type="tel" placeholder="+8801XXXXXXXXX"
              value={form.phone} onChange={e => updateForm('phone', e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="কমপক্ষে ৬ characters"
                value={form.password} onChange={e => updateForm('password', e.target.value)}
                style={{ ...inputStyle, paddingRight: '48px' }}
              />
              <button onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Strength */}
          {form.password.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    flex: 1, height: '3px', borderRadius: '2px',
                    background: i <= strength.level ? strength.color : '#1A1A1A',
                    transition: 'background 0.3s ease',
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '11px', color: strength.color }}>{strength.label}</span>
            </div>
          )}

          {/* Confirm Password */}
          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Password আবার দাও"
                value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)}
                style={{
                  ...inputStyle, paddingRight: '48px',
                  borderColor: form.confirmPassword && form.password !== form.confirmPassword ? '#FF4444' : undefined,
                }}
              />
              <button onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {form.confirmPassword && form.password === form.confirmPassword
                  ? <Check size={16} color="#AAFF00" />
                  : showConfirm ? <EyeOff size={16} /> : <Eye size={16} />
                }
              </button>
            </div>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p style={{ color: '#FF4444', fontSize: '11px', marginTop: '4px' }}>Password match করেনি</p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '15px',
              background: loading ? '#888' : '#AAFF00',
              color: '#0A0A0A', border: 'none',
              borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '800', fontSize: '14px',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.2s ease', marginBottom: '20px',
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#88CC00'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(170,255,0,0.3)' } }}
            onMouseLeave={e => { e.currentTarget.style.background = loading ? '#888' : '#AAFF00'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {loading ? 'Creating account...' : <> Create Account <ArrowRight size={16} /> </>}
          </button>

          {/* Login Link */}
          <p style={{ textAlign: 'center', color: '#555', fontSize: '14px', marginBottom: '16px' }}>
            Already account আছে?{' '}
            <Link to="/login" style={{ color: '#AAFF00', fontWeight: '700', textDecoration: 'none' }}>
              Login করো
            </Link>
          </p>

          <p style={{ textAlign: 'center' }}>
            <Link to="/" style={{ color: '#333', fontSize: '12px', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.color = '#888'}
              onMouseLeave={e => e.currentTarget.style.color = '#333'}
            >
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage