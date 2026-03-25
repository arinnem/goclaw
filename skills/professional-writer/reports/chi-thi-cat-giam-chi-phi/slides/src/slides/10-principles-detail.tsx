import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

const columns = [
  {
    title: 'P1 · Bảo vệ lõi',
    color: '#4FC3F7',
    items: ['Tường lửa, SOC, Backup, Tuân thủ', '→ 0% cắt giảm', 'Lõi = tắt là kinh doanh dừng trong 24h'],
  },
  {
    title: 'P2 · Khai tử zombie',
    color: '#FF5722',
    items: ['MAU < 15% (90 ngày)', '< 50 GD/tháng', '< 5 ticket/tháng, Zero API', '≥40% tiết kiệm từ tắt hẳn'],
  },
  {
    title: 'P3 · SLA thời chiến',
    color: '#FFD54F',
    items: [
      'Nội bộ: 99,99% → 99,0%',
      'BI chậm hơn 30%',
      'Helpdesk: 1h → 4-8h',
      'Dev/Test tắt 19h-07h',
      'Khách hàng: giữ 99,95%',
    ],
  },
];

export function Slide10() {
  return (
    <SlideLayout slideNumber={10}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 40 }}
      >
        Nguyên tắc 1–2–3 — Chi tiết
      </motion.h2>

      <div style={{ display: 'flex', gap: 32, flex: 1 }}>
        {columns.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{
              flex: 1,
              borderLeft: `3px solid ${col.color}`,
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3
              style={{
                fontSize: 'var(--body-size)',
                fontFamily: "'Archivo Black', sans-serif",
                color: col.color,
              }}
            >
              {col.title}
            </h3>
            {col.items.map((item) => (
              <p
                key={item}
                style={{
                  fontSize: 'var(--small-size)',
                  color: 'var(--text-secondary)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </p>
            ))}
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
