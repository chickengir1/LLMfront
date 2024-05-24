import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./Features.css";
import itemimg1 from "../../assets/dev1.webp";
import itemimg2 from "../../assets/researcher.webp";
import itemimg3 from "../../assets/game.webp";
import itemimg4 from "../../assets/date.webp";

const Features = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0.8,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0.8,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0.8,
  });
  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView1) {
      setIsVisible1(true);
    }
    if (inView2) {
      setIsVisible2(true);
    }
    if (inView3) {
      setIsVisible3(true);
    }
    if (inView4) {
      setIsVisible4(true);
    }
  }, [inView1, inView2, inView3, inView4]);

  return (
    <div className="features">
      <h1 className="title">Features</h1>
      <div className="container">
        <section className="box1">
          <div className="item1">
            <h1>개발자 서버</h1>
            <p>
              GitHub push/merge 알림에 자체적인 요약을 제공할 수
              있습니다 (Webhook). 추가적으로, Text 기반의 Diagram을 그리는
              언어와 자체 구현 렌더러를 통해 Diagram을 그려줄 수 있습니다.
            </p>
          </div>
          <div className="item2">
            <img
              ref={ref1}
              src={itemimg1}
              alt="img1"
              className={`img1 ${isVisible1 ? "visible" : ""}`}
            />
          </div>
        </section>
        {/* 박스 한개 끝 */}
        <section className="box2">
          <div className="item3">
            <h1>연구자 서버</h1>
            <p>
              ArXiv에 올라오는 최신 논문을 실시간으로 추적하고, 요약된 정보를
              제공하여 연구자들이 중요한 내용을 빠르게 파악할 수 있도록
              돕습니다. 논문 제목, 저자, 주요 내용 등을 요약하여 Discord 채널에
              자동으로 게시합니다.
            </p>
          </div>
          <div className="item4">
            <img
              ref={ref2}
              src={itemimg2}
              alt="img1"
              className={`img2 ${isVisible2 ? "visible" : ""}`}
            />
          </div>
        </section>
        {/* 박스 한개 끝 */}
        <section className="box1">
          <div className="item1">
            <h1>게임 커뮤니티 서버</h1>
            <p>
              특정 키워드에 반응하여 재치있는 답변을 제공할 수 있습니다. 예를
              들어, 게임 관련 소식을 묻거나, 커뮤니티 내에서 자주 사용되는 밈에
              대해 반응하는 등, 서버의 분위기를 더욱 재미있고 활기차게
              만들어줍니다.
            </p>
          </div>
          <div className="item2">
            <img
              ref={ref3}
              src={itemimg3}
              alt="img1"
              className={`img3 ${isVisible3 ? "visible" : ""}`}
            />
          </div>
        </section>
        {/* 박스 한개 끝 */}
        <section className="box2">
          <div className="item3">
            <h1>이벤트 관리</h1>
            <p>
              서버 내에서 이벤트를 계획하고 관리할 수 있습니다. 이벤트 알림을
              보내고, 참가 여부를 확인하며, 중요한 이벤트 일정을 자동으로
              공지하여 서버 구성원들이 쉽게 참여할 수 있도록 합니다. 이를 통해
              서버의 참여도를 높이고, 커뮤니티 활동을 더욱 활성화할 수 있습니다.
            </p>
          </div>
          <div className="item4">
            <img
              ref={ref4}
              src={itemimg4}
              alt="img1"
              className={`img4 ${isVisible4 ? "visible" : ""}`}
            />
          </div>
        </section>
        {/* 박스 한개 끝 */}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
        <path
          fill="#333"
          fillOpacity="1"
          d="M0,160L11.4,170.7C22.9,181,46,203,69,213.3C91.4,224,114,224,137,224C160,224,183,224,206,224C228.6,224,251,224,274,208C297.1,192,320,160,343,122.7C365.7,85,389,43,411,74.7C434.3,107,457,213,480,229.3C502.9,245,526,171,549,149.3C571.4,128,594,160,617,170.7C640,181,663,171,686,149.3C708.6,128,731,96,754,106.7C777.1,117,800,171,823,176C845.7,181,869,139,891,106.7C914.3,75,937,53,960,48C982.9,43,1006,53,1029,58.7C1051.4,64,1074,64,1097,85.3C1120,107,1143,149,1166,186.7C1188.6,224,1211,256,1234,250.7C1257.1,245,1280,203,1303,208C1325.7,213,1349,267,1371,272C1394.3,277,1417,235,1429,213.3L1440,192L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default Features;
