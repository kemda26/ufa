import React from 'react';

const footerStyle = {
    backgroundColor: '#005e94',
    fontSize: '12px',
    color: 'white',
    borderTop: '1px solid #005e94',
    textAlign: 'center',
    padding: '10px',
    paddingTop: '6px',
    position: 'relative',
    left: '0',
    bottom: '0',
    height: '46px',
}

const txt = {
    padding: '5px',
}


export default function Footer() {
    return (
            <div style={footerStyle}>
                <div style={txt}>
                    Khoa Công Nghệ Thông Tin - Trường Đại học Công Nghệ - ĐHQGHN
                </div>
                <div style={txt}>
                    Phòng 301 – Nhà E3 144 – Xuân Thủy, Cầu Giấy, Hà Nội. Điện thoại: (024)37547064. Fax: (024)37547460. Email: fit@vnu.edu.vn.
                </div>
            </div>
    );
}
