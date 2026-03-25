import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

const otpTiers = [
  { tier: 'Smart OTP', cost: '0đ', color: '#66BB6A', width: '20%' },
  { tier: 'Zalo ZNS', cost: '200đ', color: '#FFD54F', width: '50%' },
  { tier: 'SMS', cost: '800đ', color: '#FF5722', width: '100%' },
];

const actions = [
  'SMS Brandname quảng cáo → cắt về 0, chuyển App Push',
  'MarTech: Hợp nhất (R3) + Purge inactive',
  'Zombie features: MAU < 15% → tắt. Dồn vào Checkout + Self-Service',
  'GenAI: Cắt 100% Agency SEO/banner. ~20 USD/người',
];

export function Slide15() {
  return (
    <SlideLayout slideNumber={15}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 12 }}
      >
        Chỉ thị giao Khối DEC
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 'var(--small-size)', color: '#81C784', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 32 }}
      >
        Channel Shift & Digital Optimization
      </motion.p>

      <div style={{ display: 'flex', gap: 48, flex: 1 }}>
        {/* OTP Waterfall */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <p style={{ fontSize: 'var(--small-size)', color: '#81C784', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            OTP Waterfall Routing
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {otpTiers.map((t, i) => (
              <motion.div
                key={t.tier}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.12 }}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
              >
                <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", minWidth: 80, textAlign: 'right' }}>
                  {t.tier}
                </span>
                <div style={{ flex: 1, height: 28, position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.04)' }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: t.width }}
                    transition={{ duration: 0.7, delay: 0.6 + i * 0.12 }}
                    style={{ height: '100%', background: t.color, opacity: 0.75, display: 'flex', alignItems: 'center', paddingLeft: 12 }}
                  >
                    <span style={{ fontSize: 'var(--label-size)', color: '#1a1a1a', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                      {t.cost}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
          <p style={{ fontSize: 'var(--label-size)', color: 'var(--text-muted)', marginTop: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
            Tiết kiệm 70–80% chi phí viễn thông
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ flex: 1, borderLeft: '3px solid #81C784', paddingLeft: 24 }}
        >
          <p style={{ fontSize: 'var(--small-size)', color: '#81C784', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Hành động chính
          </p>
          <AnimatedList>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {actions.map((a) => (
                <AnimatedItem key={a}>
                  <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>
                    — {a}
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
