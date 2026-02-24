import { Typography, Box, Divider } from '@mui/material'
import Page from '../../containers/Page/Page'
import React from 'react'
import { useIntl } from 'react-intl'

import Grid from '@mui/material/Unstable_Grid2'
import Scrollbar from 'components/Scrollbar'

const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Box sx={{ height: 'calc(100vh - 150px)', overflow: 'hidden', bgcolor: '#fcfcfc' }}>
        <Scrollbar>
          <Grid container spacing={4} sx={{ p: 4 }}>
            
            {/* หัวข้อหน้าหลัก - ใช้สีโทนเข้มและเพิ่มน้ำหนักตัวอักษร */}
            <Grid xs={12}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom
                sx={{ color: '#1A2027', fontWeight: 800 }} 
              >
                {intl.formatMessage({ id: 'home' })}
              </Typography>
              
              <Divider sx={{ mb: 2, borderColor: '#primary.main', borderBottomWidth: 2, width: '100px' }} />
            </Grid>

            {/* ฝั่งซ้าย: รายละเอียดโปรเจกต์หลัก */}
            <Grid xs={12} md={8}>
              <Box>
                {/* จุดที่ 1: ชื่อโปรเจกต์ - ใช้สี Primary ของระบบ */}
                <Typography 
                  variant="h5" 
                  color="primary" 
                  gutterBottom 
                  sx={{ fontWeight: 700, letterSpacing: 0.5 }}
                >
                  LogicGate Web Learning Kit
                </Typography>
                
                {/* จุดที่ 2: คำอธิบายยาวๆ - ปรับสีเทาเข้มให้อ่านง่ายขึ้น */}
                <Typography variant="body1" paragraph sx={{ color: '#454F5B', lineHeight: 1.8 }}>
                  ชุดเรียนรู้การทำงานของลอจิกเกต (LogicGate Web Learning Kit)
                </Typography>

                {/* จุดที่ 3: วัตถุประสงค์ - เน้นหัวข้อด้วยสีโทนน้ำเงินเข้ม */}
                <Typography 
                  variant="h6" 
                  gutterBottom sx={{ mt: 4, fontWeight: 700, color: '#212B36' }}
                >
                  วัตถุประสงค์ (Objectives)
                </Typography>

                <Typography 
                  variant="body1"
                  sx={{ color: '#637381', lineHeight: 1.8, textAlign: 'justify' }}
                >
                  เพื่อวิเคราะห์ปัญหาและความเป็นมาในการเรียนรู้เรื่องลอจิกเกต 
                  โดยมุ่งเน้นให้ผู้เรียนเกิดความเข้าใจในความหมายและสัญลักษณ์พื้นฐานได้อย่างถูกต้อง 
                  พร้อมทั้งพัฒนาทักษะการต่อวงจรดิจิทัลให้สามารถใช้งานได้จริงตามเงื่อนไขที่กำหนด 
                  นอกจากนี้ยังมุ่งลดความซับซ้อนของเนื้อหาที่มีความเป็นนามธรรม 
                  เพื่อสร้างเจตคติที่ดีและลดความท้อแท้ในการเรียนรายวิชาดิจิทัลเบื้องต้น 
                  ซึ่งจะส่งผลให้ผู้เรียนมีผลสัมฤทธิ์ทางการเรียนหลังเรียนสูงกว่าก่อนเรียนอย่างมีประสิทธิภาพ
                </Typography>
              </Box>
            </Grid>

            {/* ฝั่งขวา: ข้อมูลสรุป (Sidebar) - ปรับโทนสีพื้นหลังให้ดูหรูขึ้น */}
            <Grid xs={12} md={4}>
              <Box 
                sx={{ 
                  p: 3, 
                  bgcolor: '#F4F6F8', // เปลี่ยนสีพื้นหลังเป็นเทาอ่อนนุ่มๆ
                  borderRadius: 3, // มนขึ้นเล็กน้อย
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.03)',
                  border: '1px solid',
                  borderColor: '#E5E8EB'
                }}
              >
                {/* จุดที่ 4: สรุปข้อมูลสั้นๆ */}
                <Typography 
                  variant="subtitle1" 
                  sx={{ fontWeight: 800, color: '#212B36' }} 
                  gutterBottom
                >
                  ข้อมูลสรุป (Quick Info)
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase' }} 
                    display="block"
                  >
                    Technology Stack:
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{ color: '#454F5B', mt: 0.5 }}
                    gutterBottom
                  >
                    Software ที่ใช้สำหรับเป็นสื่อการสอนออนไลน์ และ Hardware บอร์ด ESP32
                  </Typography>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="caption" 
                    sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase' }} 
                    display="block"
                  >
                    Project Status:
                  </Typography>

                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#2E7D32', // ใช้สีเขียวเข้มเพื่อความชัดเจน
                      fontWeight: 600,
                      bgcolor: '#E8F5E9', // พื้นหลังสีเขียวจางๆ
                      display: 'inline-block',
                      px: 1,
                      borderRadius: 1,
                      mt: 0.5
                    }}
                  >
                    ขณะนี้กำลังดำเนินการ
                  </Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Scrollbar>
      </Box>
    </Page>
  )
}

export default HomePage