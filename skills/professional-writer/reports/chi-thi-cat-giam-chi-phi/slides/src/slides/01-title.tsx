import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';

export function Slide01() {
  return (
    <SlideLayout>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', gap: 32 }}>
        {/* Header */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(0.625rem, 1vw, 0.875rem)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Ủy Ban Chuyển Đổi Số và Công Nghệ — Tập Đoàn Sun Group
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontFamily: "'Archivo Black', sans-serif",
            lineHeight: 1.15,
            maxWidth: 800,
            color: 'var(--text-primary)',
          }}
        >
          Chỉ Thị: Tái cấu trúc và tối ưu hóa chi phí công nghệ & số hóa
        </motion.h1>

        {/* Accent Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 16,
            background: '#FF5722',
            padding: '20px 40px',
            alignSelf: 'flex-start',
          }}
        >
          <span
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontFamily: "'Archivo Black', sans-serif",
              color: '#fff',
              lineHeight: 1,
            }}
          >
            25%
          </span>
          <span
            style={{
              fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
              color: 'rgba(255,255,255,0.9)',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Mục tiêu giảm CAPEX & OPEX
          </span>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          style={{
            fontSize: 'clamp(0.5rem, 0.8vw, 0.75rem)',
            color: 'var(--text-muted)',
            fontFamily: "'Space Grotesk', sans-serif",
            marginTop: 'auto',
          }}
        >
          Số: .../CT-UBCĐSCN | Năm tài chính 2026
        </motion.p>
      </div>
    </SlideLayout>
  );
}
