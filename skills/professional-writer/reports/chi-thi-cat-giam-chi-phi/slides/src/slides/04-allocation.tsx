import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

const scenarios = [
  { name: 'Cân bằng', it: '25%', dec: '25%' },
  { name: 'DEC nặng', it: '20%', dec: '32,5%' },
  { name: 'CNTT chống rủi ro', it: '18%', dec: '35,5%' },
  { name: 'CNTT nặng', it: '30%', dec: '17,5%' },
];

export function Slide04() {
  return (
    <SlideLayout slideNumber={4}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 32 }}
      >
        Phân bổ mục tiêu linh hoạt
      </motion.h2>

      {/* Formula */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          border: '1px solid rgba(255,87,34,0.3)',
          background: 'rgba(255,87,34,0.08)',
          padding: '16px 32px',
          marginBottom: 32,
          alignSelf: 'flex-start',
        }}
      >
        <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
          (<span style={{ color: '#4FC3F7' }}>% CNTT</span> × Tỷ trọng) + (<span style={{ color: '#81C784' }}>% DEC</span> × Tỷ trọng) ≥{' '}
          <span style={{ color: '#FF5722' }}>25%</span>
        </span>
      </motion.div>

      {/* Scenarios */}
      <AnimatedList>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Header */}
          <AnimatedItem>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 100px', gap: 16, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kịch bản</span>
              <span style={{ fontSize: 'var(--small-size)', color: '#4FC3F7', fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>CNTT</span>
              <span style={{ fontSize: 'var(--small-size)', color: '#81C784', fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>DEC</span>
            </div>
          </AnimatedItem>
          {scenarios.map((s) => (
            <AnimatedItem key={s.name}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 100px 100px', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>{s.name}</span>
                <span style={{ fontSize: 'var(--subheading-size)', color: '#4FC3F7', fontFamily: "'Archivo Black', sans-serif" }}>{s.it}</span>
                <span style={{ fontSize: 'var(--subheading-size)', color: '#81C784', fontFamily: "'Archivo Black', sans-serif" }}>{s.dec}</span>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedList>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)', marginTop: 'auto', fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Biên dao động mỗi đơn vị: 18% – 32% · Cơ chế bù trừ chéo nếu 1 bên yếu
      </motion.p>
    </SlideLayout>
  );
}
