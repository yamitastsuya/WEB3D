import React from "react";
import { useTimer } from "react-timer-hook";


const expiryDate = new Date(2025, 9, 26, 8, 0, 0);

const Countdown = () => {
    const {
        seconds,
        minutes,
        hours,
        days,

    } = useTimer({ expiryTimestamp: expiryDate, autoStart: true });

    const isEnd = days + hours + minutes + seconds <= 0;

    return (
        <section style={{
            textAlign: "center",
            padding: "32px 0",
            background: "#f6f8fc"
        }}>
            <h2 style={{
                color: "#02367e",
                fontWeight: 600,
                lineHeight: 1.18,
                fontSize: "1.45rem",
                marginBottom: "8px"
            }}>
                Đếm ngược đến Lễ Kỷ Niệm 30 Năm Thành Lập
                <br />
                <span style={{
                    display: "inline-block",
                    fontWeight: 400,
                    fontSize: "1.08em",
                    color: "#1b2440",
                    marginTop: 0,
                    lineHeight: 1.12
                }}>
          Trường Đại Học Hùng Vương TP.HCM
        </span>
            </h2>
            {!isEnd ? (
                <div style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#e96b25",
                    letterSpacing: "1px",
                    margin: "18px 0"
                }}>
                    {days} ngày {hours} giờ {minutes} phút {seconds} giây
                </div>
            ) : (
                <div style={{
                    fontSize: "2rem",
                    color: "#16a34a",
                    fontWeight: "bold",
                    margin: "18px 0"
                }}>
                    Sự kiện đã bắt đầu! Hãy cùng tham gia!
                </div>
            )}
        </section>
    );
};

export default Countdown;
