import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

const bars = [
  { label: 'Run', range: '15–20%', desc: 'Hệ thống lõi — tối ưu, ép vendor, tự động hóa', pct: 20, color: '#4FC3F7' },
  { label: 'Grow', range: '30–50%', desc: 'Dự án tăng trưởng — chỉ giữ MVP, payback ≤6 tháng', pct: 50, color: '#81C784' },
  { label: 'Transform', range: '100%', desc: 'R&D, re-platforming — đóng băng toàn bộ, ép về 0', pct: 100, color: '#FF5722' },
];

export function Slide07() {
  return (
    <SlideLayout slideNumber={7}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 48 }}
      >
        Run — Grow — Transform
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36, flex: 1, justifyContent: 'center' }}>
        {bars.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: 24 }}
          >
            <span
              style={{
                fontSize: 'var(--subheading-size)',
                fontFamily: "'Archivo Black', sans-serif",
                color: b.color,
                minWidth: 130,
                textAlign: 'right',
              }}
            >
              {b.label}
            </span>
            <div style={{ flex: 1, position: 'relative', height: 40 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.05)' }} />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.pct}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  background: b.color,
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16,
                }}
              >
                <span style={{ fontSize: 'var(--small-size)', fontFamily: "'Archivo Black', sans-serif", color: '#fff' }}>
                  {b.range}
                </span>
              </motion.div>
            </div>
            <span
              style={{
                fontSize: 'var(--small-size)',
                color: 'var(--text-secondary)',
                fontFamily: "'Space Grotesk', sans-serif",
                maxWidth: 320,
              }}
            >
              {b.desc}
            </span>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
