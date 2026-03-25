import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

const phases = [
  {
    num: '01',
    title: 'Cầm máu',
    period: 'Tuần 1–2',
    color: '#ef5350',
    items: ['Thu hồi license', 'Tắt Non-Prod ngoài giờ', 'SMS cắt', 'Xóa zombie resources'],
    savings: '5–10%',
  },
  {
    num: '02',
    title: 'Tái cấu trúc',
    period: 'Tháng 1–2',
    color: '#FFD54F',
    items: ['Nộp 3 kịch bản', 'Phản biện UB', 'Chốt danh mục', 'Đàm phán vendor, khai tử zombie'],
    savings: '→ 25%',
  },
  {
    num: '03',
    title: 'Giám sát',
    period: 'Tháng 3+',
    color: '#66BB6A',
    items: ['Dashboard tài chính hàng ngày', 'KPI gắn Performance Review', 'Rà soát hàng quý'],
    savings: 'Duy trì',
  },
];

export function Slide16() {
  return (
    <SlideLayout slideNumber={16}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 20 }}
      >
        Lộ trình 30 · 60 · 90 ngày
      </motion.h2>

      {/* Timeline gradient bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #ef5350, #FFD54F, #66BB6A)',
          marginBottom: 32,
          transformOrigin: 'left',
        }}
      />

      <div style={{ display: 'flex', gap: 32, flex: 1 }}>
        {phases.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            style={{
              flex: 1,
              borderTop: `3px solid ${p.color}`,
              paddingTop: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontFamily: "'Archivo Black', sans-serif", color: p.color }}>
                {p.num}
              </span>
              <span style={{ fontSize: 'var(--body-size)', fontFamily: "'Archivo Black', sans-serif", color: 'var(--text-primary)' }}>
                {p.title}
              </span>
            </div>
            <span style={{ fontSize: 'var(--small-size)', color: p.color, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {p.period}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {p.items.map((item) => (
                <p key={item} style={{ fontSize: 'var(--label-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>
                  — {item}
                </p>
              ))}
            </div>
            <span style={{ fontSize: 'var(--subheading-size)', fontFamily: "'Archivo Black', sans-serif", color: p.color, marginTop: 'auto' }}>
              {p.savings}
            </span>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
