import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

export function Slide02() {
  return (
    <SlideLayout slideNumber={2}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          fontSize: 'var(--heading-size)',
          fontFamily: "'Archivo Black', sans-serif",
          marginBottom: 48,
        }}
      >
        Tại sao phải tái cấu trúc?
      </motion.h2>

      <div style={{ display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
        {/* Left: 5-10% */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <div style={{ borderLeft: '3px solid var(--text-muted)', paddingLeft: 24 }}>
            <span
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontFamily: "'Archivo Black', sans-serif",
                color: 'var(--text-muted)',
              }}
            >
              5–10%
            </span>
            <p
              style={{
                fontSize: 'var(--subheading-size)',
                color: 'var(--text-secondary)',
                marginTop: 12,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Tối ưu nhỏ lẻ
            </p>
            <AnimatedList>
              {['Đàm phán vendor', 'Cắt license dư', 'Right-sizing'].map((t) => (
                <AnimatedItem key={t}>
                  <p style={{ fontSize: 'var(--body-size)', color: 'var(--text-muted)', marginTop: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
                    — {t}
                  </p>
                </AnimatedItem>
              ))}
            </AnimatedList>
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', alignSelf: 'stretch' }} />

        {/* Right: 25% */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ flex: 1 }}
        >
          <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 24 }}>
            <span
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontFamily: "'Archivo Black', sans-serif",
                color: 'var(--accent)',
              }}
            >
              25%
            </span>
            <p
              style={{
                fontSize: 'var(--subheading-size)',
                color: 'var(--text-primary)',
                marginTop: 12,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Tái cấu trúc toàn diện
            </p>
            <AnimatedList>
              {['Thay đổi mô hình vận hành', 'Khai tử hệ thống không trọng yếu', 'Chấp nhận hạ SLA nội bộ'].map(
                (t) => (
                  <AnimatedItem key={t}>
                    <p style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', marginTop: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
                      — {t}
                    </p>
                  </AnimatedItem>
                )
              )}
            </AnimatedList>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontSize: 'var(--small-size)',
          color: 'var(--accent)',
          marginTop: 24,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
        }}
      >
        Căn cứ: Chỉ đạo Ban Điều hành Tập đoàn — bắt buộc, không thỏa hiệp
      </motion.p>
    </SlideLayout>
  );
}
