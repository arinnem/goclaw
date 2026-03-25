import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { Trash2, ArrowDown, GitMerge, HandCoins, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';

const steps: { icon: ReactNode; label: string; trigger: string; savings: string; color: string }[] = [
  { icon: <Trash2 size={22} />, label: 'R1 Remove', trigger: 'MAU < 15% (90 ngày)', savings: '100%', color: '#ef5350' },
  { icon: <ArrowDown size={22} />, label: 'R2 Reduce', trigger: 'CPU/RAM < 30%', savings: '30–65%', color: '#FF7043' },
  { icon: <GitMerge size={22} />, label: 'R3 Rationalize', trigger: 'Trùng lặp > 60%', savings: 'Loại tools dư', color: '#FFD54F' },
  { icon: <HandCoins size={22} />, label: 'R4 Renegotiate', trigger: 'Top 20% vendor', savings: '≥10%', color: '#81C784' },
  { icon: <RefreshCw size={22} />, label: 'R5 Replace', trigger: 'Hòa vốn ≤6 tháng', savings: 'Open-source', color: '#4FC3F7' },
];

export function Slide08() {
  return (
    <SlideLayout slideNumber={8}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 48 }}
      >
        Mô hình 5R
      </motion.h2>

      <div style={{ display: 'flex', gap: 12, flex: 1, alignItems: 'center' }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                flex: 1,
              }}
            >
              <div style={{ color: s.color }}>{s.icon}</div>
              <span
                style={{
                  fontSize: 'var(--small-size)',
                  fontFamily: "'Archivo Black', sans-serif",
                  color: s.color,
                  textAlign: 'center',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  fontSize: 'var(--label-size)',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  textAlign: 'center',
                }}
              >
                {s.trigger}
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                style={{
                  padding: '6px 16px',
                  border: `1px solid ${s.color}`,
                  background: `${s.color}15`,
                }}
              >
                <span style={{ fontSize: 'var(--label-size)', color: s.color, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                  {s.savings}
                </span>
              </motion.div>
            </motion.div>
            {i < steps.length - 1 && (
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--body-size)', flexShrink: 0 }}>→</span>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
