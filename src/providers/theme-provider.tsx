'use client'
import React from 'react'
import { ConfigProvider } from 'antd';

function ThemeProvider({ children }: { children: React.ReactNode}) {
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#0F1035',
            borderRadius: 2,
          },
          components: {
            Button: {
              controlHeight: 40,
              boxShadow: 'none',
              colorPrimaryActive: '#0F1035',
              controlOutline: 'none',
              colorBorder: '#0F1035',
            },
            Input :{
              controlHeight: 42,
              boxShadow: 'none',
              activeShadow: 'none',
            },
            Select: {
              controlHeight: 42,
              boxShadow: 'none',
              controlOutline: 'none',
            },
            InputNumber :{
              controlHeight: 42,
              boxShadow: 'none',
              activeShadow: 'none',
            },
          }
        }}
      >
        {children}
      </ConfigProvider>
    </div>
  )
}

export default ThemeProvider
