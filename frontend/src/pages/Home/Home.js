import { Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material'
import Page from '../../containers/Page/Page'
import React from 'react'
import { useIntl } from 'react-intl'
import Grid from '@mui/material/Unstable_Grid2'
import Scrollbar from 'components/Scrollbar'

const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle="LogicGate Web Learning Kit">
      <Box sx={{ height: 'calc(100vh - 150px)', overflow: 'hidden', bgcolor: '#fcfcfc' }}>
        <Scrollbar>
          <Grid container spacing={4} sx={{ p: 4 }}>

            {/* ===== Title ===== */}
            <Grid xs={12}>
              <Typography 
                variant="h3"
                component="h1"
                sx={{ fontWeight: 800, color: '#1A2027' }}
                gutterBottom
              >
                LogicGate Web Learning Kit
              </Typography>

              <Typography variant="subtitle1" sx={{ color: '#637381' }}>
                ชุดเรียนรู้การทำงานของลอจิกเกต ผ่านระบบ Web Application 
                ที่บูรณาการภาคทฤษฎีและภาคปฏิบัติร่วมกับบอร์ด ESP32
              </Typography>

              <Divider sx={{ mt: 2, mb: 4, width: 120, borderBottomWidth: 3 }} />
            </Grid>

            {/* ===== Left Content ===== */}
            <Grid xs={12} md={8}>
              <Box>

                {/* Background */}
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  ที่มาและความสำคัญของโครงงาน
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.9, color: '#454F5B', textAlign: 'justify' }}>
                  เนื้อหาเรื่องลอจิกเกตในรายวิชาดิจิทัลเบื้องต้นเป็นเนื้อหาที่มีลักษณะเป็นนามธรรม 
                  ใช้สัญลักษณ์ทางตรรกะและการคำนวณจำนวนมาก ส่งผลให้ผู้เรียนจำนวนหนึ่ง 
                  ไม่สามารถเชื่อมโยงความเข้าใจจากทฤษฎีไปสู่การปฏิบัติจริงได้ 
                  อีกทั้งการจัดการเรียนการสอนรูปแบบเดิมยังไม่รองรับความแตกต่างระหว่างผู้เรียน
                  ทำให้ผลสัมฤทธิ์ทางการเรียนอยู่ในระดับต่ำ
                </Typography>

                {/* Objectives */}
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 5, mb: 2 }}>
                  วัตถุประสงค์ของโครงงาน
                </Typography>

                <List dense>
                  <ListItem>
                    <ListItemText primary="1. ศึกษาปัญหาการเรียนรู้เรื่องลอจิกเกตในรายวิชาดิจิทัลเบื้องต้น" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="2. พัฒนาเว็บไซต์สื่อการสอนที่รวมภาคทฤษฎีและภาคปฏิบัติ" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="3. เปรียบเทียบผลสัมฤทธิ์ก่อนและหลังการใช้ระบบ" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="4. ส่งเสริมการเรียนรู้ตามจังหวะและความสามารถของผู้เรียน" />
                  </ListItem>
                </List>

                {/* System Concept */}
                <Typography variant="h5" sx={{ fontWeight: 700, mt: 5, mb: 2 }}>
                  แนวคิดของระบบ
                </Typography>

                <Typography variant="body1" sx={{ lineHeight: 1.9, color: '#454F5B', textAlign: 'justify' }}>
                  ระบบถูกออกแบบให้เป็น Web Application ที่ช่วยอธิบายหลักการทำงานของ Logic Gate 
                  พร้อมระบบจำลองการต่อวงจรแบบลากวาง (Drag & Drop) 
                  ผู้เรียนสามารถทดลองออกแบบวงจรด้วยตนเอง 
                  และเชื่อมโยงความเข้าใจไปยังการใช้งานจริงผ่านบอร์ด ESP32 
                  เพื่อให้การเรียนรู้เกิดความเข้าใจเชิงรูปธรรมมากยิ่งขึ้น
                </Typography>

              </Box>
            </Grid>

            {/* ===== Right Sidebar ===== */}
            <Grid xs={12} md={4}>
              <Box 
                sx={{
                  p: 3,
                  bgcolor: '#F4F6F8',
                  borderRadius: 3,
                  border: '1px solid #E5E8EB'
                }}
              >

                <Typography variant="h6" sx={{ fontWeight: 800 }} gutterBottom>
                  Technology Stack
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>
                  Frontend
                </Typography>
                <Typography variant="body2">
                  React + TypeScript, React Router, Zustand, 
                  React Flow (จำลองวงจร), Recharts (กราฟ), 
                  SweetAlert2, React-Toastify
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>
                  Backend
                </Typography>
                <Typography variant="body2">
                  Go (Golang), Prisma ORM, PostgreSQL, JWT Authentication
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 2 }}>
                  Hardware
                </Typography>
                <Typography variant="body2">
                  ESP32 สำหรับทดลองการทำงานของ Logic Gate ภาคปฏิบัติ
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Project Status
                </Typography>

                <Typography 
                  variant="body2"
                  sx={{
                    mt: 1,
                    bgcolor: '#E8F5E9',
                    color: '#2E7D32',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'inline-block',
                    fontWeight: 600
                  }}
                >
                  อยู่ระหว่างการพัฒนา (Development Phase)
                </Typography>

              </Box>
            </Grid>

          </Grid>
        </Scrollbar>
      </Box>
    </Page>
  )
}

export default HomePage