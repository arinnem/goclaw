import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { FileText, Layers, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';

const methods: { icon: ReactNode; title: string; desc: string; color: string; detail: string }[] = [
  {
    icon: <FileText size={28} />,
    title: 'ZBB',
    desc: 'Zero-Based Budgeting',
    color: '#FF5722',
    detail: 'Mọi khoản chi chứng minh ROI. Không ROI = về 0.',
  },
  {
    icon: <Layers size={28} />,
    title: 'Run–Grow–Transform',
    desc: 'Phân loại ưu tiên',
    color: '#4FC3F7',
    detail: 'Run tối ưu, Grow chỉ MVP, Transform đóng băng.',
  },
  {
    icon: <Wrench size={28} />,
    title: '5R',
    desc: 'Hành động cụ thể',
    color: '#81C784',
    detail: 'Remove → Reduce → Rationalize → Renegotiate → Replace.',
  },
];

export function Slide05() {
  return (
    <SlideLayout slideNumber={5}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 48 }}
      >
        3 Phương pháp luận
      </motion.h2>

      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        {methods.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
            style={{
              flex: 1,
              borderLeft: `3px solid ${m.color}`,
              paddingLeft: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ color: m.color }}>{m.icon}</div>
            <h3 style={{ fontSize: 'var(--subheading-size)', fontFamily: "'Archivo Black', sans-serif", color: 'var(--text-primary)' }}>
              {m.title}
            </h3>
            <p style={{ fontSize: 'var(--small-size)', color: m.color, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
              {m.desc}
            </p>
            <p style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.6 }}>
              {m.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
