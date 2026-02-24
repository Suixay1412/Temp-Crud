
  import React from 'react'
import { useIntl } from 'react-intl'

const members = [
  { name: 'นิรภาดา ขัตติยะ',
    role: 'Frontend Developer',
    image: '/img/paeng.jpg' 
  },
  { name: 'รุสนีดา กูวิง',
    role: 'Backend Developer', 
    image: '/img/rus.jpeg' 
  },
  { name: 'อิทธิกร ทองสิมา',
    role: 'Database Designer', 
    image: '/img/ice.jpeg' 
  },
  { name: 'ปวริศวร์ วงแสนสุข',
    role: 'Project Manager', 
    image: '/img/ter.jpg' 
  }
]

const AboutPage = () => {
  const intl = useIntl()

  return (
    <div style={{ padding: '40px', width: '100%' }}>
      <h2 style={{ marginBottom: '30px' }}>
        {intl.formatMessage({ id: 'about' })}
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          width: '100%'
        }}
      >
        {members.map((member, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: '100%',
                maxWidth: '250px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '10px'
              }}
            />
            <p>{member.name}</p>
            <p style={{ color: '#666', fontSize: '14px' }}>
      {member.role}
      </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutPage