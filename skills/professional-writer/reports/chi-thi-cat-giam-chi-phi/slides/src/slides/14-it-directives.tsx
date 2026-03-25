import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { Server, Monitor, Key, Cloud, ShieldAlert, Handshake } from 'lucide-react';
import type { ReactNode } from 'react';

const directives: { icon: ReactNode; label: string; detail: string }[] = [
  { icon: <Server size={22} />, label: 'Infra Diet', detail: 'Giảm 15-20% hóa đơn Cloud tháng đầu tiên' },
  { icon: <Monitor size={22} />, label: 'Thiết bị', detail: 'Vòng đời 5 năm, tái sử dụng 100%' },
  { icon: <Key size={22} />, label: 'Bản quyền 80/20', detail: '80% nhân sự → Basic / E1' },
  { icon: <Cloud size={22} />, label: 'Cloud Commitment', detail: '100% Production → Reserved Instances' },
  { icon: <ShieldAlert size={22} />, label: 'SLA Downgrade', detail: 'SLA thời chiến cho nội bộ' },
  { icon: <Handshake size={22} />, label: 'Vendor Pareto', detail: 'Top 20% vendor → ép giảm ≥10% AMC' },
];

export function Slide14() {
  return (
    <SlideLayout slideNumber={14}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 12 }}
      >
        Chỉ thị giao Ban CNTT
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 'var(--small-size)', color: '#4FC3F7', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 32 }}
      >
        6 nhiệm vụ trọng tâm
      </motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, flex: 1 }}>
        {directives.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            style={{
              borderLeft: '2px solid rgba(79,195,247,0.3)',
              paddingLeft: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ color: '#4FC3F7' }}>{d.icon}</div>
            <span style={{ fontSize: 'var(--body-size)', fontFamily: "'Archivo Black', sans-serif", color: 'var(--text-primary)' }}>
              {d.label}
            </span>
            <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>
              {d.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </SlideLayout>
  );
}
