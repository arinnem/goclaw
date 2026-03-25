import { motion } from 'framer-motion';
import { SlideLayout } from '../components/SlideLayout';
import { AnimatedList, AnimatedItem } from '../components/AnimatedText';

const requiredData = [
  { type: 'Gia hạn hạ tầng', data: 'Log 30 ngày' },
  { type: 'Bản quyền', data: 'Tỷ lệ active' },
  { type: 'Dự án mới', data: 'Payback ≤6 tháng' },
  { type: 'Giữ lại tính năng', data: 'MAU' },
];

const rejected = ['"Khách hàng sẽ phàn nàn"', '"Hệ thống rất quan trọng"', '"Nhân viên chậm 2 giây"'];

export function Slide11() {
  return (
    <SlideLayout slideNumber={11}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: 'var(--heading-size)', fontFamily: "'Archivo Black', sans-serif", marginBottom: 40 }}
      >
        Nguyên tắc 4 & 5 — Chi tiết
      </motion.h2>

      <div style={{ display: 'flex', gap: 48, flex: 1 }}>
        {/* Left: P4 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ flex: 1, borderLeft: '3px solid #81C784', paddingLeft: 24 }}
        >
          <h3 style={{ fontSize: 'var(--body-size)', fontFamily: "'Archivo Black', sans-serif", color: '#81C784', marginBottom: 20 }}>
            P4 · Dữ liệu bắt buộc
          </h3>
          <AnimatedList>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {requiredData.map((d) => (
                <AnimatedItem key={d.type}>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 'var(--small-size)', color: '#81C784', fontFamily: "'Space Grotesk', sans-serif", minWidth: 140, fontWeight: 600 }}>
                      {d.type}
                    </span>
                    <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                      → {d.data}
                    </span>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </AnimatedList>

          <p style={{ fontSize: 'var(--label-size)', color: '#FF5722', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, marginBottom: 8 }}>
            TỪ CHỐI NGAY:
          </p>
          {rejected.map((r) => (
            <p key={r} style={{ fontSize: 'var(--small-size)', color: 'var(--text-muted)', fontFamily: "'Space Grotesk', sans-serif", fontStyle: 'italic' }}>
              ✗ {r}
            </p>
          ))}
        </motion.div>

        {/* Right: P5 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ flex: 1, borderLeft: '3px solid #ce93d8', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          <h3 style={{ fontSize: 'var(--body-size)', fontFamily: "'Archivo Black', sans-serif", color: '#ce93d8', marginBottom: 4 }}>
            P5 · Dòng tiền là vua
          </h3>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: "'Archivo Black', sans-serif", color: '#FF5722' }}>
              500M
            </span>
            <span style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              VNĐ
            </span>
          </div>

          <p style={{ fontSize: 'var(--body-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
            Đóng băng mọi CAPEX trên ngưỡng
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              → Chuyển Cloud / SaaS
            </p>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              → OPEX/tháng ≤ 1/36 CAPEX
            </p>
            <p style={{ fontSize: 'var(--small-size)', color: 'var(--text-secondary)', fontFamily: "'Space Grotesk', sans-serif" }}>
              → Thiết kế lại sang cloud
            </p>
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
}
