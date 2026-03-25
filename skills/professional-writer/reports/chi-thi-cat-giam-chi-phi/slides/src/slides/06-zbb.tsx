import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';
import { Check, X } from 'lucide-react';

const criteria = [
  { rule: 'Có ROI + Run/Grow', result: true },
  { rule: 'Không ROI', result: false, note: 'Về 0' },
  { rule: 'Transform', result: false, note: 'Tự động từ chối' },
  { rule: 'An toàn thông tin', result: true, note: 'Chấp thuận tự động' },
];

const steps = ['Xóa trắng', 'Phân loại R-G-T', 'Bảo vệ trước UB', 'Phê duyệt / Từ chối'];

export function Slide06() {
  return (
    <SlideLayout slideNumber={6}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 12 }}
      >
        Ngân sách từ con số 0
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 'var(--small-size)', color: 'var(--accent)', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 32 }}
      >
        Zero-Based Budgeting (ZBB)
      </motion.p>

      {/* Decision matrix */}
      <AnimatedList>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {criteria.map((c) => (
            <AnimatedItem key={c.rule}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: c.result ? 'rgba(102,187,106,0.15)' : 'rgba(255,87,34,0.15)',
                    flexShrink: 0,
                  }}
                >
                  {c.result ? <Check size={18} color="#66BB6A" /> : <X size={18} color="#FF5722" />}
                </div>
                <span style={{ fontSize: 'var(--body-size)', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", minWidth: 200 }}>
                  {c.rule}
                </span>
                {c.note && (
                  <span style={{ fontSize: 'var(--small-size)', color: c.result ? '#66BB6A' : '#FF5722', fontFamily: "'Space Grotesk', sans-serif" }}>
                    → {c.note}
                  </span>
                )}
              </div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedList>

      {/* Process flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}
      >
        {steps.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                padding: '10px 20px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <span style={{ fontSize: 'var(--label-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", display: 'block' }}>
                B{i + 1}
              </span>
              <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--body-size)' }}>→</span>
            )}
          </div>
        ))}
      </motion.div>
    </SlideLayout>
  );
}
