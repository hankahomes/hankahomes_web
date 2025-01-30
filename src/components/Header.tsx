import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Modal } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import "@styles/header.css";

const Header: React.FC = () => {
  const isMobileView = useMediaQuery({
    maxWidth: 650,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileView);
  }, [isMobileView]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const showModal = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderMobile = () => {
    return (
      <div className="contact-info-mobile">
        <div>
          <p><a href="/" className="company-name-mobile">株式会社半夏HOME’S</a></p>
          <p><a href="https://maps.app.goo.gl/aXVv6ovmWga9hzyt7" target="_blank" rel="noopener noreferrer">〒160-0023 東京都新宿区西新宿６丁目１２番７号ストーク新宿１階</a></p>
          <p><a href="tel:03-5909-7106"><PhoneOutlined />{" : 03-5909-7106 水曜日を除く (10:00~18:30)"}</a></p>
          <p><a href="mailto:rep@hankahomes.com"><MailOutlined /> : rep@hankahomes.com</a></p>
        </div>
        <div className="container-center" style={{ marginLeft: "10px" }}>
          <a href="#" onClick={showModal}>
            <Image
              src="/wechat_qr.jpg"
              alt="qr"
              width={90}
              height={90}
            />
            <div style={{textAlign: "center", color: "#5d5d5d"}}>Wechat</div>
          </a>
        </div>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <>
        <a href="/" className="logo-container">
          <Image src="/logo.png" alt="HankaHomes" width={100} height={50} />
          <span className="company-name">株式会社半夏HOME’S</span>
        </a>
        <div className="contact-info">
          <div>
            <p><a href="https://maps.app.goo.gl/aXVv6ovmWga9hzyt7" target="_blank" rel="noopener noreferrer">〒160-0023 東京都新宿区西新宿６丁目１２番７号ストーク新宿１階</a></p>
            <p><a href="tel:03-5909-7106"><PhoneOutlined />{" : 03-5909-7106 水曜日を除く (10:00~18:30)"}</a></p>
            <p><a href="mailto:rep@hankahomes.com"><MailOutlined /> : rep@hankahomes.com</a></p>
          </div>
          <div className="container-center" style={{ marginLeft: "10px" }}>
            <a href="#" onClick={showModal}>
              <Image
                src="/wechat_qr.jpg"
                alt="qr"
                width={70}
                height={70}
              />
              <div style={{textAlign: "center", color: "#5d5d5d"}}>Wechat</div>
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <header className="sticky-header">
      {isMobile ? renderMobile() : renderDesktop()}
      <Modal
       title="Wechat"
       open={isModalOpen}
       okText={"Save QR Code"}
       onCancel={handleCancel}
       cancelText={"Close"}
       width={250}
       footer={(_, { CancelBtn }) => (
         <>
           <CancelBtn />
         </>
       )}
      >
        <Image
          ref={imageRef}
          src="/wechat_qr.jpg"
          alt="qr"
          width={200}
          height={200}
        />
        {
          isMobile
           &&
          <div style={{textAlign: "center"}}>
            Long press to save QR code
          </div>
        }
      </Modal>
    </header>
  );
};

export default Header;
