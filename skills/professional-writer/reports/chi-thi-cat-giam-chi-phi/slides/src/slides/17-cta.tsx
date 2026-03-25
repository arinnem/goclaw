import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

const metrics = [
  { value: '≥25%', label: 'Tổng trọng số cắt giảm', color: '#FF5722' },
  { value: '14', label: 'ngày hoàn thành Quick Wins', color: '#FFD54F', suffix: 'ngày' },
  { value: 'Mỗi\ntuần', label: 'War Room 90 ngày đầu', color: '#4FC3F7' },
  { value: 'Hàng\nngày', label: 'Dashboard burn-rate', color: '#81C784' },
];

const warnings = [
  { text: 'Saved YTD < 50% cuối tháng 2 → họp bất thường', color: '#FFD54F' },
  { text: 'Cloud tăng >10% → CIO giải trình 24h', color: '#FF5722' },
  { text: '2 tuần không tiến triển → UB can thiệp', color: '#ef5350' },
];

export function Slide17() {
  return (
    <SlideLayout>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 40 }}
      >
        Hành động ngay
      </motion.h2>

      {/* 4 metric cards */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            style={{
              flex: 1,
              borderLeft: `3px solid ${m.color}`,
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontFamily: "'Archivo Black', sans-serif",
                color: m.color,
                whiteSpace: 'pre-line',
                lineHeight: 1.1,
              }}
            >
              {m.value}
            </span>
            <span style={{ fontSize: 'var(--label-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Warning box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        style={{
          border: '1px solid rgba(255,87,34,0.2)',
          background: 'rgba(255,87,34,0.05)',
          padding: '20px 28px',
        }}
      >
        <p style={{ fontSize: 'var(--label-size)', color: '#FF5722', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Ngưỡng cảnh báo
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {warnings.map((w) => (
            <p key={w.text} style={{ fontSize: 'var(--small-size)', color: w.color, fontFamily: "'Space Grotesk', sans-serif" }}>
              ⚠ {w.text}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span style={{ fontSize: 'var(--label-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}>
          UB CĐS&CN — Tập Đoàn Sun Group
        </span>
        <span style={{ fontSize: 'var(--label-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif" }}>
          Năm tài chính 2026
        </span>
      </motion.div>
    </SlideLayout>
  );
}
