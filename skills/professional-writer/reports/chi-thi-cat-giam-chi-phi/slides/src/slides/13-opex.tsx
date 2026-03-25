import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

const cloudSavings = [
  { label: 'Right-sizing', pct: 40, range: '20–40%' },
  { label: 'Non-Prod tắt ngoài giờ', pct: 65, range: '60–65%' },
  { label: 'Reserved Instances', pct: 50, range: '30–50%' },
  { label: 'Xóa zombie resources', pct: 100, range: '100%' },
  { label: 'Cold Storage', pct: 90, range: '80–90%' },
];

const licenseRules = [
  { rule: '80% back-office → Basic / E1', color: '#4FC3F7' },
  { rule: '20% chuyên môn → Premium / E5', color: '#81C784' },
  { rule: 'Nghỉ việc / 30 ngày inactive → thu hồi tự động', color: '#FF5722' },
];

export function Slide13() {
  return (
    <SlideLayout slideNumber={13}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 32 }}
      >
        Cắt giảm OPEX
      </motion.h2>

      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        {/* Cloud FinOps */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 'var(--small-size)', color: '#4FC3F7', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Cloud FinOps
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {cloudSavings.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ fontSize: 'var(--label-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", minWidth: 140, textAlign: 'right' }}>
                  {c.label}
                </span>
                <div style={{ flex: 1, height: 20, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.04)' }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.1 }}
                    style={{ height: '100%', background: '#4FC3F7', opacity: 0.7 }}
                  />
                </div>
                <span style={{ fontSize: 'var(--label-size)', color: '#4FC3F7', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, minWidth: 60 }}>
                  {c.range}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* License 80/20 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ flex: 0.7, borderLeft: '3px solid #FFD54F', paddingLeft: 24 }}
        >
          <p style={{ fontSize: 'var(--small-size)', color: '#FFD54F', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            License 80/20
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {licenseRules.map((l) => (
              <p key={l.rule} style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5, borderLeft: `2px solid ${l.color}`, paddingLeft: 12 }}>
                {l.rule}
              </p>
            ))}
          </div>
          <p style={{ fontSize: 'var(--label-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", marginTop: 20 }}>
            Vendor AMC ép giảm ≥10-15%
          </p>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
