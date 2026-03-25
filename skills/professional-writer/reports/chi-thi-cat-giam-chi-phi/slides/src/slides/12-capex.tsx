import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

const lifecycle = [
  { device: 'Laptop / PC', before: '3 năm', after: '5 năm' },
  { device: 'Server', before: '5 năm', after: '7 năm' },
  { device: 'Thiết bị mạng', before: '5 năm', after: '7 năm' },
];

const freezeRules = [
  'Tuyệt đối không mua máy mới — tái sử dụng 100% kho',
  'Nâng cấp SSD/RAM (tối đa 1,5-2 triệu)',
  'Hệ thống cũ chịu tải 12 tháng → hoãn vô thời hạn',
  'Dự án đang chạy → chỉ giữ module MVP',
];

export function Slide12() {
  return (
    <SlideLayout slideNumber={12}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 40 }}
      >
        Cắt giảm CAPEX
      </motion.h2>

      <div style={{ display: 'flex', gap: 48, flex: 1 }}>
        {/* Lifecycle table */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <p style={{ fontSize: 'var(--small-size)', color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Vòng đời thiết bị
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {lifecycle.map((l) => (
              <div key={l.device} style={{ display: 'grid', gridTemplateColumns: '140px 80px 20px 80px', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>{l.device}</span>
                <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", textDecoration: 'line-through' }}>{l.before}</span>
                <span style={{ color: 'var(--accent)', fontSize: 'var(--body-size)' }}>→</span>
                <span style={{ fontSize: 'var(--subheading-size)', color: 'var(--accent)', fontFamily: "'Archivo Black', sans-serif" }}>{l.after}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Freeze rules */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ flex: 1, borderLeft: '3px solid var(--accent)', paddingLeft: 24 }}
        >
          <p style={{ fontSize: 'var(--small-size)', color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Đóng băng dự án
          </p>
          <AnimatedList>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {freezeRules.map((r) => (
                <AnimatedItem key={r}>
                  <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>
                    — {r}
                  </p>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedList>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
