// src/hooks/useNotification.ts
import { useEffect } from "react";
import { onMessage, getToken } from "firebase/messaging";
import { messaging } from "../services/initFCM.ts";
import { registerServiceWorker } from "../utils/notification.ts";

const useNotification = () => {
  const sendToken = async () => {
    // firebase messaging과 연동
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });
    if (token) {
      // 서버로 토큰 전송 로직
      return token;
    } else {
      // 토큰 등록 ㄴㄴ
      console.error("토큰 등록 실패!!!!");
    }
  };

  const requestPermission = async () => {
    console.log("권한 요청");
    registerServiceWorker();

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("권한 허용됨");
        return sendToken();
      } else if (permission === "denied") {
        console.error("권한 허용 차단됨");
      } else {
        console.log("권한 허용 아직...!");
      }
    } catch (error) {
      console.error("푸시 토큰 가져오는 중에 에러 발생", error);
    }
  };

  useEffect(() => {
    // 앱 사용 중 알림 도착
    onMessage(messaging, payload => {
      console.log("알림 도착", payload);
    });
  }, []);

  return {
    requestPermission,
  };
};

export default useNotification;
