import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';
import { Shield, Skull, Swords, Database, Banknote } from 'lucide-react';
import type { ReactNode } from 'react';

const principles: { num: string; icon: ReactNode; title: string; desc: string; color: string }[] = [
  { num: '01', icon: <Shield size={22} />, title: 'Bảo vệ lõi vành đai', desc: 'An toàn thông tin = 0% cắt giảm', color: '#4FC3F7' },
  { num: '02', icon: <Skull size={22} />, title: 'Khai tử > Làm rẻ', desc: '≥40% tiết kiệm phải từ tắt hẳn hệ thống', color: '#FF5722' },
  { num: '03', icon: <Swords size={22} />, title: 'Chấp nhận đánh đổi', desc: 'SLA thời chiến cho dịch vụ nội bộ', color: '#FFD54F' },
  { num: '04', icon: <Database size={22} />, title: 'Chỉ nói bằng dữ liệu', desc: 'Không số liệu = Không ngân sách', color: '#81C784' },
  { num: '05', icon: <Banknote size={22} />, title: 'Dòng tiền là vua', desc: 'Đóng băng CAPEX >500M, chuyển OPEX', color: '#ce93d8' },
];

export function Slide09() {
  return (
    <SlideLayout slideNumber={9}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 40 }}
      >
        5 Nguyên tắc kim chỉ nam
      </motion.h2>

      <AnimatedList>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {principles.map((p) => (
            <AnimatedItem key={p.num}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <span
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    fontFamily: "'Archivo Black', sans-serif",
                    color: 'rgba(255,255,255,0.06)',
                    minWidth: 60,
                    textAlign: 'right',
                  }}
                >
                  {p.num}
                </span>
                <div style={{ color: p.color, flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <span
                    style={{
                      fontSize: 'var(--body-size)',
                      fontFamily: "'Archivo Black', sans-serif",
                      color: p.color,
                    }}
                  >
                    {p.title}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--body-size)',
                      color: 'var(--text-secondary)',
                      fontFamily: "'Space Grotesk', sans-serif",
                      marginLeft: 12,
                    }}
                  >
                    — {p.desc}
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedList>
    </SlideLayout>
  );
}
