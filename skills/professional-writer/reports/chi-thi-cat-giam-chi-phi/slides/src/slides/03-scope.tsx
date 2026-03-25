import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

const roles = [
  { name: 'UB CĐS&CN', desc: 'Ban hành, phê duyệt kịch bản, giám sát thực thi', color: '#FF5722' },
  { name: 'Ban CNTT', desc: 'Hạ tầng, thiết bị, đám mây, bản quyền, vận hành', color: '#4FC3F7' },
  { name: 'Khối DEC', desc: 'MarTech, kênh số, sản phẩm số, trải nghiệm khách hàng', color: '#81C784' },
  { name: 'Khối Nghiệp vụ', desc: 'Ký cam kết SLA thời chiến, xác nhận ảnh hưởng', color: '#9e9e9e' },
];

export function Slide03() {
  return (
    <SlideLayout slideNumber={3}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 'var(--heading-size)',
          fontFamily: "'Archivo Black', sans-serif",
          marginBottom: 48,
        }}
      >
        Phạm vi & Trách nhiệm
      </motion.h2>

      <AnimatedList>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {roles.map((r) => (
            <AnimatedItem key={r.name}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  borderLeft: `3px solid ${r.color}`,
                  paddingLeft: 24,
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--subheading-size)',
                    fontFamily: "'Archivo Black', sans-serif",
                    color: r.color,
                    minWidth: 180,
                    flexShrink: 0,
                  }}
                >
                  {r.name}
                </span>
                <span
                  style={{
                    fontSize: 'var(--body-size)',
                    color: 'var(--text-secondary)',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {r.desc}
                </span>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedList>
    </SlideLayout>
  );
}
