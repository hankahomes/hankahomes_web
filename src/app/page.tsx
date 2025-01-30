"use client";

import { Avatar, Card, Col, Row } from 'antd';
import Image from "next/image";
import Header from "@components/Header";
import CustomForm from "@/components/CustomForm";
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import "@styles/home.css";

const { Meta } = Card;

export default function Home() {
  const isMobileView = useMediaQuery({
    maxWidth: 650,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileView);
  }, [isMobileView]);

  useEffect(() => {
    const updateParallaxPosition = () => {
      const backgrounds = document.querySelectorAll('.parallax');
      backgrounds.forEach(bg => {
        const rect = bg.getBoundingClientRect();
        const yPos = (-rect.top / 4) + 20; // Adjust the parallax speed here
        (bg as HTMLElement).style.backgroundPosition = `center ${yPos}px`;
      });
    };

    const handleScroll = () => {
      requestAnimationFrame(updateParallaxPosition);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const renderMobile = () => {
    return (
      <div className="self-intro-container-mobile">
        <Row gutter={[0, 30]}>
          <Col span={24}>
            <Card
              hoverable
            >
              <Meta
                avatar={<Image
                  src="/intro1.jpg"
                  alt="1"
                  width={100}
                  height={100}
                />}
                title={
                  <div>
                    <p>曹　亜蘭</p>
                    <p>(石原　静和)</p>
                  </div>
                }
                description={
                  <div>
                    <p>代表取締役 </p>
                    <p>宅地建物取引士</p>
                    <p>明治大学MBA</p>
                    <p>ファイナンス・不動産專攻</p>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card
              hoverable
            >
              <Meta
                avatar={<Image
                  src="/intro2.jpg"
                  alt="1"
                  width={100}
                  height={100}
                />}
                title="中川　聖明"
                description={
                  <div>
                    <p>執行役員、管理部長</p>
                    <p>宅地建物取引士</p>
                    <p>中小企業診断士</p>
                    <p>特定社会保険労務士</p>
                    <p>明治大学MBA</p>
                    <p>マネジメント専攻</p>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  const renderDesktop = () => {
    return (
      <div className="self-intro-container">
        <Row gutter={120}>
          <Col span={12}>
            <Card
              hoverable
              style={{maxWidth: "380px"}}
              cover={<Image
                src="/intro1.jpg"
                alt="1"
                width={600}
                height={800}
                sizes="(max-width: 768px) 100vw, 33vw"
              />}
            >
              <Meta
               title={
                <div>
                  <p>曹　亜蘭</p>
                  <p>{"(石原　静和)"}</p>
                </div>
              } 
              description={
                <div>
                  <p style={{ marginTop: "20px" }}>代表取締役 </p>
                  <p>宅地建物取引士</p>
                  <p>明治大学MBA</p>
                  <p>ファイナンス・不動産專攻</p>
                </div>
              }
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              style={{ maxWidth: "380px" }}
              className="reverse-card"
              cover={<Image
                src="/intro2.jpg"
                alt="1"
                width={600}
                height={800}
                sizes="(max-width: 768px) 100vw, 33vw"
              />}
            >
              <Meta
                title="中川　聖明"
                description={
                  <div>
                    <p>執行役員、管理部長</p>
                    <p>宅地建物取引士</p>
                    <p>中小企業診断士</p>
                    <p>特定社会保険労務士</p>
                    <p>明治大学MBA</p>
                    <p>マネジメント専攻</p>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <>
      <Header />
      <main>
        <div className="parallax background1" style={{ backgroundImage: "url('/background1.webp')" }}>
          <div className="overlay">
            <div className="intro">
              <h1>不動産の売買、仲介、賃貸、斡旋、管理</h1>
              <p>及び不動産コンサルティング業</p>
            </div>
          </div>
        </div>
        <div>
          {isMobile ? renderMobile() : renderDesktop()}
        </div>
        <div className="parallax background2" style={{ backgroundImage: "url('/background2.webp')" }}>
          <div className="overlay">
            <span className="bg2-title">
              {"HANKA HOME'S"}
            </span>
          </div>
        </div>
        <div className="footer-container">
          <p>（公社）東京都宅地建物取引業会員</p>
          <p>全日本不動産政治連盟</p>
          <p>東京都知事（1）110629</p>

          <p style={{ marginTop: "25px" }}>住宅宿泊管理業者</p>
          <p>国土交通大臣(01) F03616</p>

          <p style={{ marginTop: "25px" }}>メインバンク</p>
          <p>三菱UFJ銀行 新宿新都心支店</p>

          <p style={{ marginTop: "25px" }}>顧問弁護士 : 金 浩俊</p>
          <p>登録番号: 56412 登録年: 2016年</p>
          <p>所属護士会: 第二東京</p>
          <p>得意業務: 不動産取引一般、借地・借家、建築紛争·欠陥住宅、マンション法に関する紛争等</p>
        </div>
        <div className="footer-container form-container">
          <CustomForm />
        </div>
      </main>
    </>
  );
}
